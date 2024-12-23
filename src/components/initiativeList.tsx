import React, { useState, useEffect, MouseEvent } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Menu, MenuItem } from '@mui/material';
import createDb from '../db'; // Import the createDb function
import Character from './character';

interface InitiativeListProps {
  setSelectedCharacter: (character: Character) => void;
}

const InitiativeList: React.FC<InitiativeListProps> = ({ setSelectedCharacter }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [initiatives, setInitiatives] = useState<{ [key: string]: number }>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string | number | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCharacter, setSelectedCharacterState] = useState<Character | null>(null);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    const initDb = async () => {
      const database = await createDb();
      setDb(database);
      const charactersFromDb = await database.characters.find().exec();
      setCharacters(charactersFromDb.map((doc: any) => doc.toJSON()));
    };

    initDb();
  }, []);

  const handleEditClick = (id: string, field: string, value: string | number) => {
    setEditId(id);
    setEditField(field);
    setEditValue(value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleSaveClick = async (id: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === Number(id) ? { ...character, [editField!]: editValue } : character
      )
    );

    if (db) {
      const characterToUpdate = await db.characters.findOne({ selector: { id } }).exec();
      if (characterToUpdate) {
        await characterToUpdate.update({ $set: { [editField!]: editValue } });
      }
    }

    setEditId(null);
    setEditField(null);
    setEditValue(null);
  };

  const handleDeleteClick = async (id: string) => {
    setCharacters((prevCharacters) => prevCharacters.filter((character) => character.id !== Number(id)));

    if (db) {
      const characterToDelete = await db.characters.findOne({ selector: { id } }).exec();
      if (characterToDelete) {
        await characterToDelete.remove();
      }
    }
  };

  const handleRowClick = (character: Character) => {
    setSelectedCharacter(character);
    setSelectedCharacterState(character);
  };

  const handleRightClick = (event: MouseEvent<HTMLElement>, character: Character) => {
    event.preventDefault();
    setMenuAnchorEl(event.currentTarget);
    setSelectedCharacterState(character);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedCharacterState(null);
  };

  const handleDamage = async () => {
    if (selectedCharacter) {
      const amount = prompt('Enter damage amount:', '0');
      if (amount !== null) {
        const damage = parseInt(amount, 10);
        setCharacters((prevCharacters) =>
          prevCharacters.map((character) =>
            character.id === selectedCharacter.id ? { ...character, hp: { ...character.hp, current: character.hp.current - damage } } : character
          )
        );

        if (db) {
          const characterToUpdate = await db.characters.findOne({ selector: { id: selectedCharacter.id } }).exec();
          if (characterToUpdate) {
            await characterToUpdate.update({ $set: { hp: selectedCharacter.hp.current - damage } });
          }
        }
      }
    }
    handleMenuClose();
  };

  const handleHeal = async () => {
    if (selectedCharacter) {
      const amount = prompt('Enter heal amount:', '0');
      if (amount !== null) {
        const heal = parseInt(amount, 10);
        setCharacters((prevCharacters) =>
          prevCharacters.map((character) =>
            character.id === selectedCharacter.id ? { ...character, hp: { ...character.hp, current: character.hp.current + heal } } : character
          )
        );

        if (db) {
          const characterToUpdate = await db.characters.findOne({ selector: { id: selectedCharacter.id } }).exec();
          if (characterToUpdate) {
            await characterToUpdate.update({ $set: { hp: selectedCharacter.hp.current + heal } });
          }
        }
      }
    }
    handleMenuClose();
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Initiative</TableCell>
              <TableCell>AC</TableCell>
              <TableCell>HP</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((character) => (
              <TableRow key={character.id} onClick={() => handleRowClick(character)}>
                <TableCell>
                  {editId === character.id.toString() && editField === 'name' ? (
                    <TextField
                      value={editValue ?? character.name}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveClick(character.id.toString())}
                      autoFocus
                      sx={{ width: '150px' }} // Adjust the width as needed
                    />
                  ) : (
                    <span onClick={() => handleEditClick(character.id.toString(), 'name', character.name)}>
                      {character.name}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {editId === character.id.toString() && editField === 'initiative' ? (
                    <TextField
                      type="number"
                      value={editValue ?? initiatives}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveClick(character.id.toString())}
                      autoFocus
                      sx={{ width: '100px' }} // Adjust the width as needed
                    />
                  ) : (
                    <span onClick={() => handleEditClick(character.id.toString(), 'initiative', initiatives[character.id])}>
                      {initiatives[character.id]}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {editId === character.id.toString() && editField === 'ac' ? (
                    <TextField
                      type="number"
                      value={editValue ?? character.ac}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveClick(character.id.toString())}
                      autoFocus
                      sx={{ width: '100px' }} // Adjust the width as needed
                    />
                  ) : (
                    <span onClick={() => handleEditClick(character.id.toString(), 'ac', character.ac)}>
                      {character.ac}
                    </span>
                  )}
                </TableCell>
                <TableCell onContextMenu={(event) => handleRightClick(event, character)}>
                  {editId === character.id.toString() && editField === 'hp' ? (
                    <TextField
                      type="number"
                      value={editValue ?? character.hp}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveClick(character.id.toString())}
                      autoFocus
                      sx={{ width: '100px' }} // Adjust the width as needed
                    />
                  ) : (
                    <span onClick={() => handleEditClick(character.id.toString(), 'hp', character.hp.current)}>
                      {character.hp.current}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteClick(character.id.toString())}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDamage}>Damage</MenuItem>
        <MenuItem onClick={handleHeal}>Heal</MenuItem>
      </Menu>
    </div>
  );
};

export default InitiativeList;