import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ConstraintList from './ConstraintList';
import { useState } from "react";

export default function ConstraintListGroup(props) {
  const {constraints, toggleConstraint, document, constraintTypeId} = props; 


  const [value, setValue] = useState("");

  //const options = constraints.filter(item => item.constraintTypeId === constraintTypeId);
  return (
    <>
      <Autocomplete
        className='constraints-autocomplete'
        clearOnEscape
        options={constraints.filter(item => item.constraintTypeId === constraintTypeId)}
        renderInput={(params) => <TextField {...params} label="" />}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            //On Return 
            setValue('');
            toggleConstraint(e, e.target.value, constraintTypeId);
          }
        }}
        onChange={(event, value) => {          
          toggleConstraint(event, value);
        }}
        value={value}
        getOptionLabel={(option) => option.label ?? ''}
        isOptionEqualToValue={(option, value) => true}
      />
      <ConstraintList 
        constraints={document.constraints.filter(item => item.constraintTypeId === constraintTypeId) } 
        buttons={{remove: true}} 
        toggleConstraint={toggleConstraint}
      />          
    </>
  )
}