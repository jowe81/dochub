import axios from "axios";

import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Logout() {

  const navigate = useNavigate();
  const appData = useOutletContext();

  useEffect(() => {
    appData
      .logout()
      .then(() => navigate('/login'));
  }, []);

  return(
    <>
    Logout...
    </>
  )
}