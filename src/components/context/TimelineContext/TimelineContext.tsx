import { createContext, ReactChild, useContext, useState } from "react";
import { CharacterRecord, EventRecord } from "../../../helpers/spreadsheet";

export interface TimelineState {
  characters?: CharacterRecord[];
  events?: EventRecord[];
  setCharacters: (characters: CharacterRecord[]) => void;
  setEvents: (events: EventRecord[]) => void;
}

export const TimelineContext = createContext<TimelineState>({
  setCharacters: () => {},
  setEvents: () => {},
});

interface Props {
  children: ReactChild;
}

export function TimelineProvider({ children }: Props) {
  const [characters, setCharacters] = useState<CharacterRecord[]>();
  const [events, setEvents] = useState<EventRecord[]>();

  return (
    <TimelineContext.Provider
      value={{ characters, events, setCharacters, setEvents }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
