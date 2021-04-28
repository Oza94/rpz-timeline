import React, { useMemo } from "react";
import { useParams } from "react-router";
import Card from "../../atoms/Card/Card";
import { useTimeline } from "../../context/TimelineContext/TimelineContext";
import "./CharacterPage.css";

function CharacterPage() {
  const { characters } = useTimeline();
  const { id } = useParams<{ id: string }>();
  const character = useMemo(
    () => characters?.find((character) => character.id === id),
    [id, characters]
  );

  if (!character) {
    return <div>...</div>;
  }

  return (
    <div className="CharacterPage">
      <Card>
        <div className="CharacterPage__header">
          {character.image && (
            <div className="CharacterPage__imageFrame">
              <img
                src={character.image}
                alt={character.name}
                className="CharacterPage__image"
              />
            </div>
          )}
          <div className="CharacterPage__meta">
            <h2 className="CharacterPage__name">{character.name}</h2>
            <p className="CharacterPage__streamer">{character.streamer}</p>
          </div>
        </div>
        <h3 className="CharacterPage__title">Lore</h3>
        <p>{character.background}</p>
      </Card>
    </div>
  );
}

export default CharacterPage;
