import React from "react";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { EventRecord } from "../../../helpers/spreadsheet";
import { PATH_CHARACTER } from "../../../settings";
import EventCard from "../EventCard/EventCard";
import "./TimelineEvent.css";

interface Props {
  event: EventRecord;
}

function TimelineEvent({ event }: Props) {
  return (
    <div className="TimelineEvent">
      <div className="TimelineEvent__card">
        <EventCard className="TimelineEvent__eventCard" event={event} />
      </div>
    </div>
  );
}

export default TimelineEvent;
