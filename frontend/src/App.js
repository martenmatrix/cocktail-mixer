import './App.css';
import SettingsMenu from './components/overlays/settings';
import { Header } from './components/defaults/topHeader';

import React, {useState} from 'react';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="App">
      <SettingsMenu show={showSettings} cbToClose={() => setShowSettings(false)}/>
      <Header cbShowSettings={() => setShowSettings(true)}/>
    </div>
  );
}

export default App;
