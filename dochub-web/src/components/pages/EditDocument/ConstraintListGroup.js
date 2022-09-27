import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ConstraintList from './ConstraintList';

export default function ConstraintListGroup(props) {
  const {constraints, handleKeyUp, toggleConstraint, document, constraintTypeId} = props; 
  //const options = constraints.filter(item => item.constraintTypeId === constraintTypeId);
  return (
    <>
      <Autocomplete
        placeholder='type or select'
        className='constraints-autocomplete'
        options={constraints.filter(item => item.constraintTypeId === constraintTypeId)}
        renderInput={(params) => <TextField {...params} label="" />}
        onKeyUp={handleKeyUp}
        onChange={toggleConstraint}
      />
      <ConstraintList 
        constraints={document.constraints.filter(item => item.constraintTypeId === constraintTypeId) } 
        buttons={{remove: true}} 
        toggleConstraint={toggleConstraint}
      />          
    </>
  )
}