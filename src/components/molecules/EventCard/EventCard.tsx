import React from "react";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { EventRecord } from "../../../helpers/spreadsheet";
import { PATH_CHARACTER } from "../../../settings";
import Card from "../../atoms/Card/Card";
import "./EventCard.css";

interface Props {
  event: EventRecord;
  className: string;
}

function pad(n: number) {
  return n < 10 ? `0${n}` : n;
}

function formatDate(date: Date) {
  const time = date.getMinutes()
    ? `${pad(date.getHours())}h${pad(date.getMinutes())}`
    : `${date.getHours()}h`;
  const days = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;

  return `Le ${days} à ${time}`;
}

function getTimecodeFromUrl(url: string) {
  return url.split("?t=")[1];
}

function EventCard({ event, className = "" }: Props) {
  return (
    <Card className={className}>
      <h2 className="EventCard__title">{event.title}</h2>
      {(event.date || event.vodTimecodeUrl) && (
        <div className="EventCard__meta">
          {event.date && formatDate(event.date)}
          {event.date && event.vodTimecodeUrl && <span> - </span>}
          {event.vodTimecodeUrl && (
            <a href={event.vodTimecodeUrl}>
              VOD (Timecode {getTimecodeFromUrl(event.vodTimecodeUrl)})
            </a>
          )}
        </div>
      )}
      <div
        className="EventCard__content"
        dangerouslySetInnerHTML={{ __html: event.description }}
      />
      <p>
        {event.characters.map((character, i) => (
          <>
            <Link to={generatePath(PATH_CHARACTER, { id: character.id })}>
              {character.name}
            </Link>
            {i < event.characters.length - 1 && <span>, </span>}
          </>
        ))}
      </p>
    </Card>
  );
}

export default EventCard;
