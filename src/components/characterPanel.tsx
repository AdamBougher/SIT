import React, { useState } from 'react';
import Stats from './stats';
import Character from './character';
import { Typography } from '@mui/material';
import '../assets/main.css';
import shieldImage from '../assets/shield.webp'; // Import the image

const CharacterPanel: React.FC<{ character: Character }> = ({ character }) => {
  const [currentSpeedType, setCurrentSpeedType] = useState<'walking' | 'swimming' | 'flying' | 'burrowing' | 'climbing'>('walking');

  const handleSpeedClick = () => {
    const speedTypes = ['walking', 'swimming', 'flying', 'burrowing', 'climbing'] as const;
    const currentIndex = speedTypes.indexOf(currentSpeedType);
    let nextIndex = (currentIndex + 1) % speedTypes.length;

    // Find the next speed type that is greater than 0
    while (character.speed[speedTypes[nextIndex]] <= 0 && nextIndex !== currentIndex) {
      nextIndex = (nextIndex + 1) % speedTypes.length;
    }

    setCurrentSpeedType(speedTypes[nextIndex]);
  };

  return (
    <div className="main-container">
      <div className="stats">
        <Stats name={'Strength'} value={character.abilities.strength.score} save={character.abilities.strength.profec} />
        <Stats name={'Dexterity'} value={character.abilities.dexterity.score} save={character.abilities.dexterity.profec} />
        <Stats name={'Constitution'} value={character.abilities.constitution.score} save={character.abilities.constitution.profec} />
        <Stats name={'Intelligence'} value={character.abilities.intelligence.score} save={character.abilities.intelligence.profec} />
        <Stats name={'Wisdom'} value={character.abilities.wisdom.score} save={character.abilities.wisdom.profec} />
        <Stats name={'Charisma'} value={character.abilities.charisma.score} save={character.abilities.charisma.profec} />
      </div>

      <section className="right">
        <div className="top-container">
          <div className="coreinfo">
            <div>
              <div className="shield-container">
                <img src={shieldImage} alt="Shield" className="shield-image" />
                <Typography variant="h4" className="ac-text">{character.ac}</Typography>
              </div>

              <div>
                <Typography variant="h6">Proficinency Bonus</Typography>
                <Typography variant="h4">+{Math.floor(character.level / 4) + 1}</Typography>
              </div>
            </div>

            <div>
              <Typography variant="h4">{character.hp.current}/{character.hp.max}</Typography>
              <Typography variant="h4">Hit points</Typography>
            </div>

            <div className="speed-container" onClick={handleSpeedClick} style={{ cursor: 'pointer' }}>
              <Typography variant="h4">
                {currentSpeedType === 'walking' ? 'Speed' : currentSpeedType.charAt(0).toUpperCase() + currentSpeedType.slice(1)}
              </Typography>
              <Typography variant="h4">{character.speed[currentSpeedType]}</Typography>
            </div>

            <div>
              <Typography variant="h4">Level</Typography>
              <Typography variant="h4">{character.level}</Typography>
            </div>
          </div>
        </div>

        <div className="CharacterPannel">
          <Typography variant="h2">{character.info}</Typography>
        </div>
      </section>
    </div>
  );
};

export default CharacterPanel;