import { set } from "object-path";
import remark from "remark";
import html from "remark-html";
import { SHEET_CHARACTERS, SHEET_EVENTS, SPREADSHEET_URL } from "../settings";

export interface SpreadsheetEntry {
  gs$cell: {
    inputValue: string;
    col: string;
    row: string;
  };
}

export interface SpreadsheetFeed {
  feed: {
    entry: SpreadsheetEntry[];
  };
}

export interface CharacterRecord {
  id: string;
  name: string;
  streamer: string;
  background: string;
  image: string;
  vodUrls: string[];
}

export interface EventRecord {
  date: Date;
  characters: CharacterRecord[];
  title: string;
  description: string;
  vodTimecodeUrl: string;
}

async function parseMarkdown(md: string) {
  return new Promise((resolve) =>
    remark()
      .use(html)
      .process(md, function (err, file) {
        if (err) {
          console.error(err);
          return resolve("");
        }
        resolve(String(file));
      })
  );
}

export async function getSheet(url: string) {
  const res = await fetch(url);
  const json = (await res.json()) as SpreadsheetFeed;

  const data = [] as Record<string, string>[];
  const headers = [] as any[];

  for (let i = 0; i < json.feed.entry.length; i++) {
    const entry = json.feed.entry[i];

    const col = parseInt(entry.gs$cell.col, 10) - 1;
    const row = parseInt(entry.gs$cell.row, 10) - 1;
    if (row === 0) {
      set(headers, `${col}.name`, entry.gs$cell.inputValue);
    } else {
      const header = headers[col];

      if (header) {
        set(data, `${row - 1}.${header.name}`, entry.gs$cell.inputValue);
      }
    }
  }

  return data;
}

export async function processCharactersSheet(input: Record<string, string>[]) {
  return (await Promise.all(
    input
      .filter((row) => !!row.personnage_id)
      .map(async (row) => ({
        id: row.personnage_id,
        name: row.personnage,
        streamer: row.streamer,
        background: await parseMarkdown(row.background),
        image: row.image,
        vodUrls: row.vods
          ?.split("\n")
          .map((url) => url.trim())
          .filter((url) => url.includes("twitch.tv")),
      }))
  )) as CharacterRecord[];
}

export async function processEventsSheet(
  input: Record<string, string>[],
  characters: CharacterRecord[]
) {
  const records = await Promise.all(
    input
      .filter((row) => !!row.id)
      .map(async (row) => ({
        date: new Date(Date.parse(row.date)),
        characters: row.personnages_ids
          .split("\n")
          .map((id) => characters.find((c) => c.id === id.trim()))
          .filter((c) => !!c),
        title: row.titre,
        description: await parseMarkdown(row.description),
        vodTimecodeUrl: row.vod_timecode,
      }))
  );

  records.sort((a, b) => b.date.getTime() - a.date.getTime()) as EventRecord[];

  return records;
}

export async function fetchData() {
  const [rawEvents, rawCharacters] = await Promise.all([
    getSheet(SPREADSHEET_URL.replace("{sheet}", SHEET_EVENTS)),
    getSheet(SPREADSHEET_URL.replace("{sheet}", SHEET_CHARACTERS)),
  ]);
  const characters = await processCharactersSheet(rawCharacters);
  const events = await processEventsSheet(rawEvents, characters);

  console.log(rawEvents, rawCharacters, characters, events);

  return { characters, events };
}
