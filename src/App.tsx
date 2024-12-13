import React from 'react';
import './App.css';
import './assets/main.css';
import Navbar from './components/navigation/navigation';
import Stats from './components/stats';
import { Typography, Checkbox } from '@mui/material';

const App: React.FC = () => {
  return (
    <div className="main-container">

      <div className="stats">
        <Stats name={'Strength'} value={10} save={true} />
        <Stats name={'Dexterity'} value={10} save={false} />
        <Stats name={'Constitution'} value={10} save={false} />
        <Stats name={'Intelligence'} value={10} save={false} />
        <Stats name={'Wisdom'} value={10} save={false} />
        <Stats name={'Charisma'} value={10} save={false} />
      </div>
      
      <section className='right'>

        <div className="top-container">
        
          <div className="coreinfo">
            <Typography variant="h4">AC :15</Typography>
            <Typography variant="h4">HP : 35</Typography>
            <Typography variant="h4">Speed :30</Typography>
            <Typography variant="h4">Initiative : +5</Typography>
          </div>

          <div className="conditions">
            <Typography variant="h4">Conditions :</Typography>
          </div>

        </div>
    
        <div className="CharacterPannel">
          <Typography variant="h4">Character Pannel</Typography>
        </div>
      </section>
      
    </div>
  );
};

export default App;
