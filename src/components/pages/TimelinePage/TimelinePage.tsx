import React from "react";
import { useTimeline } from "../../context/TimelineContext/TimelineContext";
import TimelineEvent from "../../molecules/TimelineEvent/TimelineEvent";

function TimelinePage() {
  const { events } = useTimeline();

  return (
    <div className="TimelinePage">
      <div>
        {events && events.map((event) => <TimelineEvent event={event} />)}
      </div>
    </div>
  );
}

export default TimelinePage;
