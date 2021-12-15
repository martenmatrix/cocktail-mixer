import './App.css';
import SettingsMenu from './components/overlays/settings';
import Header from './components/defaults/topHeader';
import Main from './components/defaults/middleMain';
import Footer from './components/defaults/bottomFooter';

import React, {useState} from 'react';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="App">
      <SettingsMenu show={showSettings} cbToClose={() => setShowSettings(false)}/>
      <Header cbShowSettings={() => setShowSettings(true)}/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
