import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useApplicationData from "./hooks/useApplicationData";
import './App.scss';
import { useEffect } from "react";

function App() {
  const appData = useApplicationData({});
  const navigate = useNavigate();

  //Default to /documents
  useEffect(() => navigate("/documents"), []);
  
  return (
    <div className="App">      
      <Outlet context={appData} />
    </div>
  );
}

export default App;
