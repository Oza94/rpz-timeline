import React from "react";
import { EventRecord } from "../../../helpers/spreadsheet";
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
