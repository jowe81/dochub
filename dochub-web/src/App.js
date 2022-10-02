import { Outlet } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import './App.scss';

function App() {
  const appData = useApplicationData({});
  return (
    <div className="App">      
      <Outlet context={appData} />
    </div>
  );
}

export default App;
