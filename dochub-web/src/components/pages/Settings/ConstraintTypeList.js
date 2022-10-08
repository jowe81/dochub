import axios from "axios";
import { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box } from "@mui/material";
import { XCircle } from 'react-bootstrap-icons';
import { useOutletContext } from "react-router-dom";

import ConstraintTypeSettings from "./ConstraintTypeSettings";

export default function ConstraintTypeList() {

  const appData = useOutletContext();

  const constraintTypes = appData.constraintTypes;
  console.log("cT", constraintTypes);
  const [ value, setValue ] = useState([]);
  

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
    }
  }

  return (
    <>
      <div className="constraintTypeList">      
        {constraintTypes.length && constraintTypes.map(item => <div className="constraintTypeList-item cursor-pointer" onClick={handleClick} data-constraint-type-id={item.id} key={item.id}>
          {item.name}
          <div className="constraintTypeList-item-icon">
            <XCircle onClick={handleClick} />
          </div>
        </div>)}
      </div>    
      <TextField
        className="form-input"
        label="Type and hit enter to add a constraint type"
        onKeyUp={function(e) { 
          handleKeyUp (e);          
        }}
      />
      <Autocomplete
        className='constraintTypes-autocomplete'
        clearOnEscape
        options={constraintTypes}
        renderInput={(params) => <TextField {...params} label="Type and enter to add, select to edit" />}
        onKeyUp={handleKeyUp}
        onChange={(event, value) => { 
          console.log("AC CHANGE", value)         ;
          setValue(value);
        }}
        value={value}
        getOptionLabel={(option) => option.name ?? ''}
        isOptionEqualToValue={(option, value) => true}
      />

      <div className="form-section">
        {constraintTypes.map(item => <ConstraintTypeSettings constraintTypeId={item.id} />)}
      </div>
      
      

    </>
  );
}