import './App.css';
import SettingsMenu from './components/overlays/settings';
import { Header } from './components/defaults/topHeader';

function App() {
  return (
    <div className="App">
      <SettingsMenu />
      <Header />
    </div>
  );
}

export default App;
