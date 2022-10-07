import { Container } from "react-bootstrap";
import Navigation from "../../Navigation";
import ConstraintTypeList from "./ConstraintTypeList";
import './Settings.scss';

export default function Settings() {
  return (
    <>
      <Navigation />
      <Container className="main-content">
        <span>Manage Constraint Types</span>
        <ConstraintTypeList />  
        
      </Container>
    </>
  );
}