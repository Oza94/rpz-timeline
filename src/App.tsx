import React, { useEffect } from "react";
import "./App.css";
import { fetchData } from "./helpers/spreadsheet";
import { useTimeline } from "./components/context/TimelineContext/TimelineContext";
import { Route, Switch } from "react-router";
import { PATH_CHARACTER, PATH_TIMELINE } from "./settings";
import TimelinePage from "./components/pages/TimelinePage/TimelinePage";
import CharacterPage from "./components/pages/CharacterPage/CharacterPage";
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
      <header className="App__header">
        <div className="App__headerInner">
          <h1 className="App__headerTitle">
            <Link to={PATH_TIMELINE}>RPZ Timeline</Link>
          </h1>
          <p>
            Modeste site pour répertorier les évenements du{" "}
            <a href="https://zevent.fr/rpz/">RPZ</a>, le serveur GTA RP du
            Zevent. Ce site n'est pas produit ou maintenu par la communauté de
            streameurs.
            <br />
            <a href="https://docs.google.com/spreadsheets/d/1HnrJnn4gbnbbsk7Zv4PEdT7R_HH57NfULhN8KxM49MU/edit#gid=72183720">
              Contribuer aux données
            </a>
            <span> - </span>
            <a href="https://github.com/Oza94/rpz-timeline">
              Contribuer au code
            </a>
          </p>
        </div>
      </header>
      <main className="App__main">
        <Switch>
          <Route path={PATH_TIMELINE} exact component={TimelinePage} />
          <Route path={PATH_CHARACTER} exact component={CharacterPage} />
          <Route
            render={() => (
              <div>
                <h1 className="App__headerTitle">Non trouvée :(</h1>
              </div>
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
