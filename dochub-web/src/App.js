import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import useApplicationData from "./hooks/useApplicationData";
import './App.scss';

function App() {
  const appData = useApplicationData({});
  return (
    <div className="App">
      <Navigation />
      <Outlet context={appData} />
    </div>
  );
}

export default App;
