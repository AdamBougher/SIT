import React, { useState, useEffect } from 'react';
import CharacterPanel from './characterPanel';
import createDb from '../db'; // Import the createDb function

const CharacterCreation: React.FC = () => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [hp, setHp] = useState(0);
  const [ac, setAc] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [character, setCharacter] = useState<any>(null);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    const initDb = async () => {
      const database = await createDb();
      setDb(database);
    };

    initDb();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCharacter = { id: Date.now().toString(), name, job, hp, ac, speed, Info: '', Abilities: [], Resistances: { Cold: '', Poison: '', Radiant: '' }, Conditions: null };
    setCharacter(newCharacter);

    if (db) {
      await db.characters.insert(newCharacter);
    }
  };

  return (
    <div>
      <h2>Create Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Job:</label>
          <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />
        </div>
        <div>
          <label>HP:</label>
          <input type="number" value={hp} onChange={(e) => setHp(Number(e.target.value))} />
        </div>
        <div>
          <label>AC:</label>
          <input type="number" value={ac} onChange={(e) => setAc(Number(e.target.value))} />
        </div>
        <div>
          <label>Speed:</label>
          <input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        </div>
        <button type="submit">Create Character</button>
      </form>
      {character && <CharacterPanel character={character} />}
    </div>
  );
};

export default CharacterCreation;