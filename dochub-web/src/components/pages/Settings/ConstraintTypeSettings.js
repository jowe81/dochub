import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

export default function ConstraintTypeSettings(props) {
  console.log(props.constraintType);

  const [constraintType, setConstraintType] = useState(props.constraintType)
  //useEffect(() => setConstraintType(props.constraintType), []);

  const updateProperty = (propertyName, e) => {
    const newConstraintType = { ...constraintType };
    newConstraintType[propertyName] = e.target.checked;
    setConstraintType(newConstraintType);
  };

  return (
    <>
      <FormGroup>
        <span>Settings for {constraintType.name}</span>
        <FormControlLabel
          control={
            <Checkbox 
              checked={constraintType.userAssignable} 
              onChange={(e) => updateProperty('userAssignable', e)}
            />
          }
          label={(`Users can assign the ${constraintType.name} constraint to documents`)} />
        <FormControlLabel 
          control={
            <Checkbox 
              checked={constraintType.userCreatable}
              onChange={(e) => updateProperty('userCreatable', e)}
            />
          }
          label={(`Users can create new ${constraintType.name} constraints`)} 
        />
        <FormControlLabel 
          control={
            <Checkbox
              checked={constraintType.showInSearchResults}
              onChange={(e) => updateProperty('showInSearchResults', e)}
            />
          }
          label={(`Show ${constraintType.name} constraints in search results`)}
        />
      </FormGroup>
    </>
  );
}