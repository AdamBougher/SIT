//componant to display D&D 5e stats

import React, { useState } from 'react';
import { Typography, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import { Label } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

interface statsProps {
    name: string;
    value: number;
    save:  boolean;
}

const stats: React.FC<statsProps> = ({name, value, save})  => {
  return (
    <>
        <Box>
            <Stat name={name} value={value} modifier={setMod(value)} save={save}/>
        </Box>
    </>
  );
}

function setMod(score: number): number {
  let modifier = (score - 10) / 2;
  modifier = Math.floor(modifier);
  return modifier;
}

interface statProps {
    name: string;
    value: number;
    modifier: number;
    save: boolean;
}


const Stat: React.FC<statProps> = ({ name, value, modifier, save})  => {
    const [showValue, setShowValue] = useState(true);

    const handleClick = () => {
      setShowValue(!showValue);
    };
        
    return (
      <>  
        <section className="stat-container">
          <div className="stat-header">
            <Typography variant="h4">{name}</Typography>
            <Checkbox {...Label} 
            disabled color='info' 
            sx={{
              color: pink[800],
              '&.Mui-checked': {
                color: pink[600],
              },
              '&.Mui-disabled': {
                color: pink[300],
              },
            }}
            checked={save} 
            />
          </div>
          <div className="stat-center">
            <Typography variant="h4" onClick={handleClick} style={{ cursor: 'pointer', outline: 1 }}>
              {showValue ? value : "+" + modifier}
            </Typography>
          </div>
        </section>
      </>
    );
}

export default stats;