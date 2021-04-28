import React from "react";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { EventRecord } from "../../../helpers/spreadsheet";
import { PATH_CHARACTER } from "../../../settings";
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
  const days = `${pad(date.getDay())}/${pad(date.getMonth() + 1)}`;

  return `Le ${days} à ${time}`;
}

function EventCard({ event, className = "" }: Props) {
  return (
    <div className={["EventCard", className].join(" ").trim()}>
      <h2 className="EventCard__title">{event.title}</h2>
      {event.date && (
        <div className="EventCard__date">{formatDate(event.date)}</div>
      )}
      <p>{event.description}</p>
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
    </div>
  );
}

export default EventCard;
