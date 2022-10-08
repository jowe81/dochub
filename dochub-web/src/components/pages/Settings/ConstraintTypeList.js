import axios from "axios";
import { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box } from "@mui/material";
import { XCircle } from 'react-bootstrap-icons';
import { useOutletContext } from "react-router-dom";

import ConstraintTypeSettings from "./ConstraintTypeSettings";

export default function ConstraintTypeList(constraintsTypes) {

  const appData = useOutletContext();

  const constraintTypes = appData.constraintTypes;
  console.log("constraintTye", constraintTypes);
  const [ value, setValue ] = useState([]);
  console.log("value",value);


  const handleClick = event => {
    const id = event.target.closest('.constraintTypeList-item').getAttribute('data-constraint-type-id');
    if (id) {
      appData.deleteConstraintType(id);
    }
  }

  const handleKeyUp = (e) => {    
    if (e.keyCode === 13) {      
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
      <Autocomplete
        className='constraintTypes-autocomplete'
        clearOnEscape
        options={constraintTypes}
        renderInput={(params) => <TextField {...params} label="Type and enter to add, select to edit" />}
        onKeyUp={handleKeyUp}
        onChange={(event, value) => {          
          //toggleConstraintType(event, value);
          console.log("value prop", value);
          setValue(value);
        }}
        value={value}
        getOptionLabel={(option) => option.name ?? ''}
        isOptionEqualToValue={(option, value) => true}
      />

      <div className="form-section">
        {value && <ConstraintTypeSettings constraintType={value} />}
      </div>
      
      

    </>
  );
}