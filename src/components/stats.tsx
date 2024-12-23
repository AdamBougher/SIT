import React, { useState } from 'react';
import { Typography, Checkbox, Box, Tooltip } from '@mui/material';
import { pink } from '@mui/material/colors';
import '../assets/main.css'; // Ensure the correct path to your CSS file

interface StatProps {
  name: string;
  value: number;
  save: boolean;
  creationMode?: boolean;
}

const Stats: React.FC<StatProps> = ({ name, value, save, creationMode }) => {
  return (
    <Box>
      <Stat name={name} value={value} modifier={setMod(value)} save={save} creationMode={creationMode} />
    </Box>
  );
};

function setMod(score: number): number {
  return Math.floor((score - 10) / 2);
}

const Stat: React.FC<StatProps & { modifier: number }> = ({ name, value, modifier, save, creationMode }) => {
  const [showValue, setShowValue] = useState(true);

  const handleClick = () => {
    setShowValue(!showValue);
  };

  return (
    <section className="stat-container">
      <div className="stat-header">
        <Typography variant="h4">{name}</Typography>
        {(
          <Checkbox
            checked={save}
            color="info"
            sx={{ color: pink[500] }
          }
          />
        ) }
      </div>
      <div className="stat-center">
        <Tooltip title={showValue ? "Click to Show Modifier" : "Click to Show Score"}>
          <Typography variant="h4" onClick={handleClick} style={{ cursor: 'pointer', outline: 1 }}>
            {showValue ? value : (modifier > 0 ? "+" + modifier : modifier)}
          </Typography>
        </Tooltip>
      </div>
    </section>
  );
};

export default Stats;