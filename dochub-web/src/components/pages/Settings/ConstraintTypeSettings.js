import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ConstraintTypeSettings({constraintTypeId}) {

  const appData = useOutletContext();
  const [constraintType, setConstraintType] = useState({ ...appData.getConstraintTypeById(constraintTypeId) });

  if (!constraintTypeId) return (<div>Select a constraint type to edit its settings.</div>);

  const updateProperty = (propertyName, e) => {   
    const newValue = e.target.checked ? true : false;
    const newConstraintType = { ...constraintType };
    newConstraintType[propertyName] = newValue;
    appData
      .updateConstraintType(newConstraintType)
      .then(res => {
        const newConstraintType = { ...constraintType };
        newConstraintType[propertyName] = newValue;
        setConstraintType(newConstraintType);
      });
  };

  return (constraintType &&
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