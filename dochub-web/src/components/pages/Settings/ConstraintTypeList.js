import { TextField } from "@mui/material";
import { XCircle } from 'react-bootstrap-icons';
import { useOutletContext } from "react-router-dom";

import ConstraintTypeSettings from "./ConstraintTypeSettings";

export default function ConstraintTypeList() {

  const appData = useOutletContext();

  const constraintTypes = appData.constraintTypes;
  
  const handleClick = event => {
    const id = event.target.closest('.constraintTypeList-item').getAttribute('data-constraint-type-id');
    if (id) {
      appData.deleteConstraintType(id);
    }
  }

  const handleKeyUp = (e) => {    
    console.log("keyup", e.keyCode, e.key);
    if (e.key === "Enter") {      
      appData.addConstraintType(e.target.value);
      e.target.value='';
    }
  }

  return (
    <>
      <div> Existing Contraint Types:</div>
      <div className="constraintTypeList">      
        {constraintTypes.length && constraintTypes.map(item => <div className="constraintTypeList-item cursor-pointer" onClick={handleClick} data-constraint-type-id={item.id} key={item.id}>
          {item.name}
          <div className="constraintTypeList-item-icon">
            <XCircle onClick={handleClick} />
          </div>
        </div>)}
      </div>    
      <div>Type and hit enter to add a constraint type:</div>
      <TextField
        className="w-100"
        label="Type and hit enter to add a constraint type"
        onKeyUp={function(e) { 
          handleKeyUp (e);          
        }}
      />

      <div className="form-section">
        <div>Constraint Type Settings:</div>
        {constraintTypes.map(item => <ConstraintTypeSettings key={item.id} constraintTypeId={item.id} />)}
      </div>
      
      

    </>
  );
}