import Navigation from "../../Navigation";
import ConstraintTypeList from "./ConstraintTypeList";
import './Settings.scss';

export default function Settings() {
  return (
    <>
      <Navigation />
      <div className="main-content">
        <ConstraintTypeList />
      </div>
    </>
  );
}