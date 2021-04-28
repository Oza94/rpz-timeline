import React, { useEffect } from "react";
import "./App.css";
import { fetchData } from "./helpers/spreadsheet";
import { useTimeline } from "./components/context/TimelineContext/TimelineContext";
import { Route, Switch } from "react-router";
import { PATH_TIMELINE } from "./settings";
import TimelinePage from "./components/pages/TimelinePage/TimelinePage";
import { Link } from "react-router-dom";

function App() {
  const { characters, setCharacters, events, setEvents } = useTimeline();

  useEffect(() => {
    async function doFetch() {
      const result = await fetchData();
      setCharacters(result.characters);
      setEvents(result.events);
    }
    doFetch();
  }, [setCharacters, setEvents]);

  if (!events || !characters) {
    return (
      <div className="App">
        <div className="App__loading">...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App__header">
        <h1 className="App__headerTitle">
          <Link to={PATH_TIMELINE}>RPZ Timeline</Link>
        </h1>
        <p>
          Modeste site pour répertorier les évennements du RPZ. Ce site n'est
          pas produit ou maintenu par la communauté de streameurs.
          <br />
          <a href="https://docs.google.com/spreadsheets/d/1HnrJnn4gbnbbsk7Zv4PEdT7R_HH57NfULhN8KxM49MU/edit?usp=sharing">
            Contribuer aux données
          </a>
        </p>
      </div>
      <Switch>
        <Route path={PATH_TIMELINE} exact component={TimelinePage} />
        <Route
          render={() => (
            <div>
              <h1 className="App__headerTitle">Non trouvée :(</h1>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
