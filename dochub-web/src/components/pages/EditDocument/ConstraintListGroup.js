import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ConstraintList from './ConstraintList';
import { useState } from "react";

export default function ConstraintListGroup(props) {
  const {constraints, toggleConstraint, document, constraintTypeId} = props; 


  const [value, setValue] = useState([]);

  //const options = constraints.filter(item => item.constraintTypeId === constraintTypeId);
  return (
    <>
      <Autocomplete
        placeholder='type or select'
        className='constraints-autocomplete'
        options={constraints.filter(item => item.constraintTypeId === constraintTypeId)}
        renderInput={(params) => <TextField {...params} label="" />}
        onKeyUp={e => { if (e.keyCode === 13) toggleConstraint(e, e.target.value, constraintTypeId); }}
        onChange={(event, value) => {
          toggleConstraint(event, value);
          setValue([]);
        }}
        value={value}
        getOptionLabel={(option) => option.label ?? ''}
        isOptionEqualToValue={(option, value) => option.label == value.label}
      />
      <ConstraintList 
        constraints={document.constraints.filter(item => item.constraintTypeId === constraintTypeId) } 
        buttons={{remove: true}} 
        toggleConstraint={toggleConstraint}
      />          
    </>
  )
}