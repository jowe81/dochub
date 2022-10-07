import axios from "axios";
import { useState, useEffect } from 'react';
import { TextField, Autocomplete, Box } from "@mui/material";
import { XCircle } from 'react-bootstrap-icons';
import { Container } from "react-bootstrap";

export default function ConstraintTypeList(constraintsTypes) {

  const [ constraintTypes, setConstraintTypes ] = useState([]);
  const [ value, setValue ] = useState([]);

  const refreshConstraintTypes = () => {
    axios
      .get(`/api/constraintTypes`)
      .then(res => {
        setConstraintTypes([...res.data]);
      });
  }

  useEffect(refreshConstraintTypes, []);

  const deleteConstraintType = id => {
    axios
      .delete(`/api/constraintTypes/${id}`)
      .then(refreshConstraintTypes);
  }

  const addConstraintType = name => {
    const exists = constraintTypes.filter(item => item.name === name).length > 0;
    if (!exists) {
      return axios
      .post(`/api/constraintTypes`, { name })
      .then(refreshConstraintTypes);
    }
  }

  const handleClick = event => {
    const id = event.target.closest('.constraintTypeList-item').getAttribute('data-constraint-type-id');
    if (id) {
      deleteConstraintType(id);
    }
  }

  const handleKeyUp = (e) => {    
    if (e.keyCode === 13) {      
      addConstraintType(e.target.value);
    }
  }

  return (
    <>
      <p class="lead">Settings</p>
      <Container className="main-content">
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
          }}
          value={value}
          getOptionLabel={(option) => option.name ?? ''}
          isOptionEqualToValue={(option, value) => true}
        />
      </Container>
      
      

    </>
  );
}