import LoginForm from "./LoginForm";
import Navigation from "../../Navigation";

function Login() {

  return (
    <>
      <Navigation />
      <div className="main-content">
        <LoginForm />
      </div>
    </>
  );

}

export default Login;