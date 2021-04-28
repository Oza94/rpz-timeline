import React, { useEffect, useState } from "react";
import {
  CharacterRecord,
  EventRecord,
  fetchData,
} from "../../../helpers/spreadsheet";
import TimelineEvent from "../../molecules/TimelineEvent/TimelineEvent";

function TimelinePage() {
  const [characters, setCharacters] = useState<CharacterRecord[]>();
  const [events, setEvents] = useState<EventRecord[]>();

  useEffect(() => {
    async function doFetch() {
      const result = await fetchData();
      setCharacters(result.characters);
      setEvents(result.events);
    }
    doFetch();
  }, []);

  return (
    <div className="TimelinePage">
      <div>
        {events && events.map((event) => <TimelineEvent event={event} />)}
      </div>
    </div>
  );
}

export default TimelinePage;
