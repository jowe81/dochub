import LoginForm from "./LoginForm";
import { useOutletContext } from "react-router-dom";
import Navigation from "../../Navigation";

function Login() {
  const appData = useOutletContext();

  return (
    <>
      <Navigation appData={appData} />;
      <div>      
        <LoginForm />
      </div>
    </>
  );

}

export default Login;