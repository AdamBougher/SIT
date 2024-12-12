//componant to display D&D 5e stats

import React, { useState } from 'react';
import { Typography, Checkbox } from '@mui/material';
import { Box } from '@mui/system';
import { Label } from '@mui/icons-material';

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
            <Typography variant="h4">{name}</Typography>
            <div className="horizontal-container">

            <Typography variant="h4" onClick={handleClick} style={{ cursor: 'pointer', outline: 1 }}>
                {showValue ? value : "+" + modifier}
            </Typography>
            save: <Checkbox {...Label} disabled checked={save} />

            </div>
            
        </>
    );
}

export default stats;