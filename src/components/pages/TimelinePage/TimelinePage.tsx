import React, { useMemo, useState } from "react";
import Select from "../../atoms/Select/Select";
import { useTimeline } from "../../context/TimelineContext/TimelineContext";
import TimelineEvent from "../../molecules/TimelineEvent/TimelineEvent";
import "./TimelinePage.css";

function TimelinePage() {
  const { events, characters } = useTimeline();
  const charactersOptions = useMemo(
    () => [
      ...(characters?.map((character) => ({
        value: character.id,
        label: character.name,
      })) || []),
      { value: "", label: "Tous les personnages" },
    ],
    [characters]
  );
  const [value, setValue] = useState("");
  const filteredEvents = useMemo(
    () =>
      !value || !events
        ? events
        : events.filter((event) =>
            event.characters.find((c) => c.id === value)
          ),
    [events, value]
  );

  return (
    <div className="TimelinePage">
      <div className="TimelinePage__actions">
        <Select options={charactersOptions} value={value} onChange={setValue} />
      </div>
      <div>
        {filteredEvents &&
          filteredEvents.map((event) => <TimelineEvent event={event} />)}
      </div>
    </div>
  );
}

export default TimelinePage;
