import axios from "axios";
import { useState, useEffect } from 'react';
import { TextField } from "@mui/material";
import { Form } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

export default function ConstraintTypeList(constraintsTypes) {

  const [ constraintTypes, setConstraintTypes ] = useState([]);


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
    return axios
      .post(`/api/constraintTypes`, { name })
      .then(refreshConstraintTypes);
  }

  const handleClick = event => {
    const id = event.target.closest('.constraintTypeList-item').getAttribute('data-constraint-type-id');
    if (id) {
      deleteConstraintType(id);
    }
  }

  const handleKeyUp = e => {
    if (e.charCode === 13) {
      addConstraintType(e.target.value)
        .then(() => {
          console.log(e.target.value = '');
        });
    }
  }

  return (
    <>
        <Form.Group className="mb-3">
          <Form.Label>Type a constraint type name to add.</Form.Label>
          <Form.Control 
            type="text" 
            onKeyPress={handleKeyUp}
          />
        </Form.Group>       
      <div className="constraintTypeList">      
        {constraintTypes.length && constraintTypes.map(item => <div className="constraintTypeList-item cursor-pointer" onClick={handleClick} data-constraint-type-id={item.id} key={item.id}>
          {item.name}
          <div className="constraintTypeList-item-icon">
            <XCircle onClick={handleClick} />
          </div>
        </div>)}
      </div>    
    </>
  );
}