import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import Button from "../../atoms/Button/Button";
import Card from "../../atoms/Card/Card";
import EmbedVOD from "../../atoms/EmbedVod/EmbedVod";
import { useTimeline } from "../../context/TimelineContext/TimelineContext";
import "./CharacterPage.css";

function CharacterPage() {
  const { characters } = useTimeline();
  const { id } = useParams<{ id: string }>();
  const character = useMemo(
    () => characters?.find((character) => character.id === id),
    [id, characters]
  );
  const [showVods, setShowVods] = useState(false);

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
        <div
          className="CharacterPage__content"
          dangerouslySetInnerHTML={{ __html: character.background }}
        />
        {(character.vodUrls?.length || 0) > 0 && (
          <>
            {" "}
            <h3 className="CharacterPage__title">Rediffusions (VoDs)</h3>
            {showVods ? (
              <div className="CharacterPage__vodGrid">
                {character.vodUrls.map((vodUrl) => (
                  <div className="CharacterPage__vod">
                    <EmbedVOD url={vodUrl} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="CharacterPage__showVods">
                <Button onClick={() => setShowVods(true)}>
                  Montrer les VoDs
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

export default CharacterPage;
