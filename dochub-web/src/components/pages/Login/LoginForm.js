import { Form, Button } from 'react-bootstrap';
import './LoginForm.scss';

import { useOutletContext, useNavigate } from "react-router-dom";


function LoginForm() {
  const appData = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: document.getElementById("formBasicEmail").value,
      password: document.getElementById("formBasicPassword").value,
    }
    appData
      .login(credentials)
      .then(user => {
        appData.user = user;
        navigate("/documents");
      })
      .catch(err => {
        console.log("Error logging in");
      })
  }

  return (
    <div className='LoginForm'>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>
    </div>
  );
}

export default LoginForm;