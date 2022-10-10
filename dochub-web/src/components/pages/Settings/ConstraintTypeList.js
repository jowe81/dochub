import { TextField } from "@mui/material";
import { XCircle } from 'react-bootstrap-icons';
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import ConstraintTypeSettings from "./ConstraintTypeSettings";
import Message from "../../Message";

export default function ConstraintTypeList() {

  const appData = useOutletContext();

  const constraintTypes = appData.constraintTypes;
  

  const [msg, setMsg] = useState('');

  const handleClick = event => {
    const id = event.target.closest('.constraintTypeList-item').getAttribute('data-constraint-type-id');
    if (id) {
      appData.deleteConstraintType(id);
    }
  }

  const handleKeyUp = (e) => {    
    if (e.key === "Enter") {      
      appData
        .addConstraintType(e.target.value)
        .then(res => {
          if (res.success === false) {
            setMsg(res.error_message);
            console.log(res.error_message);
          } else {
            //Added successfully, clear text field
            setMsg('');
            e.target.value='';
          }
        });
    }
  }

  return (
    <>
      <div className="section-subheader">Existing Contraint Types:</div>

      <div className="constraintTypeList">      
        {constraintTypes.length && constraintTypes.map(item => <div className="constraintTypeList-item cursor-pointer" onClick={handleClick} data-constraint-type-id={item.id} key={item.id}>
          {item.name}
          <div className="constraintTypeList-item-icon">
            <XCircle onClick={handleClick} />
          </div>
        </div>)}
      </div>    
      <div className="section-subheader">Type and hit enter to add a constraint type:</div>
      <TextField
        className="w-100"
        onKeyUp={function(e) { 
          handleKeyUp (e);          
        }}
      />
      <Message msg={msg} />
      <div className="form-section">
        {constraintTypes.map(item => <ConstraintTypeSettings key={item.id} constraintTypeId={item.id} />)}
      </div>
      
      

    </>
  );
}