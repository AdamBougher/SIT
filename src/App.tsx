import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/navigation';
import createDb from './db'; // Adjust the import path as needed
import CharacterPanel from './components/characterPanel';
import InitiativeList from './components/initiativeList';
import CharacterCreation from './components/characterCreation'; // Import the new component
import Character from './components/character'; // Import the Character type
import './App.css';

const emptyCharacter: Character = {
  id: 0,
  name: '',
  ac: 0,
  hp: { max: 25, current: 25 },
  class: '',
  speed: { walking: 30, swimming: 0, flying: 0, burrowing: 0, climbing: 0 },
  info: ' this is some dummy text for showing this works. ',
  abilities: {
    strength: { score: 11, profec: false },
    dexterity: { score: 5, profec: true },
    constitution: { score: 17, profec: false },
    intelligence: { score: 1, profec: false },
    wisdom: { score: 13, profec: true },
    charisma: { score: 8, profec: false },
  },
  level: 11,
};

const App: React.FC = () => {
  const [db, setDb] = useState<any>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(emptyCharacter);

  useEffect(() => {
    const initDb = async () => {
      const database = await createDb();
      setDb(database);
    };

    initDb();
  }, []);

  if (!db) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={
            <>
              <section className="InitiativeList">
                <InitiativeList setSelectedCharacter={setSelectedCharacter} />
              </section>
              <section className="CharacterPannel">
                <CharacterPanel character={selectedCharacter} />
              </section>
            </>
          } />
          <Route path="/create-character" element={<CharacterCreation />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
