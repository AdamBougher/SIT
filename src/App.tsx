
import './App.css';

import Navbar from './components/navigation/navigation';
import Stats from './components/stats';



function App() {
  return (
    <>
    <body className="App">
      <Navbar />
      <header className="App-header" />
      <div>
        <Stats name={'Strength'} value={10}  save={true} />
        <Stats name={'Dexterity'} value={10} save={false} />
        <Stats name={'Constitution'} value={10} save={false} />
        <Stats name={'Intelligence'} value={10} save={false} />
        <Stats name={'Wisdom'} value={10} save={false} />
        <Stats name={'Charisma'} value={10} save={false} />
      </div>
    </body>
    </>
  )
}

export default App
