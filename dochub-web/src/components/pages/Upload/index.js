import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';

import './UploadForm.scss';

function Upload(){

  const [constraints, setConstraints] = useState({}); 
  const [document, setDocument] = useState({});

  //Collect ids from selected constraints for submission
  const getSelectedConstraintIds = constraintTypeName => {
    const elements = window.document.getElementsByClassName(`option-${constraintTypeName}`);
    const pnames = Object.getOwnPropertyNames(elements);
    const result = [];
    pnames.forEach(pname => {
      const constraintId = Number(elements[pname].firstElementChild.id.split('.')[1]);
      const checked = elements[pname].firstElementChild.checked;
      if (checked) {
        result.push(constraintId)
      }
    });
    return result;
  }

  const handleSubmit = () => {
    console.log(getSelectedConstraintIds('keywords'));
    const newDocument = {
      title: window.document.getElementById('form-document-title').value,
      constraints: [ 
        ...getSelectedConstraintIds('keywords'), 
        ...getSelectedConstraintIds('locations'),
        ...getSelectedConstraintIds('categories'),
      ]
    }
    axios.post('/api/documents', newDocument)
      .then(documentRecord => {
        const constraints = documentRecord.constraints ? [...documentRecord.constraints] : undefined; 
        setDocument({
          ...documentRecord,
          constraints,
        })
        console.log("Returned record", documentRecord);        
        getSelectedFile();
      })
    console.log("New record:", newDocument);
  }

  const getSelectedFile = () => {
    const fileElement = window.document.getElementById('form-file');
    console.log("sel file name", fileElement.value);
  }

	const handleFileSubmission = (event) => {
    //return false;
    const formData = new FormData();
    console.log(`Uploading file for document #${document.id}, ${document.title}`, event.target.files.length);
    console.log(`name is ${event.target.files[0]}, ${typeof event.target.files[0]}`)
		formData.append('file', event.target.files[0]);
    axios({
      method: "post",
      url: `/api/files?documentId=${document.id}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(res => {
      console.log(res);
    });
	};

  const handleTitle = (event) => {
    if (!document.id && event.target.value !== '') {
      //Haven't created a document yet
      console.log(`Posting`);
      axios.post('/api/documents', {
        title: event.target.value,
      }).then(res => {
        const documentRecord = res.data;
        console.log(`Post returned`, documentRecord);
        setDocument({ ...documentRecord });
        console.log(documentRecord.id);
      });
    }
    console.log(event.target.value);
  }

  const handleCheckboxClick = (event) => {
    console.log(event.target.checked, event.target.getAttribute('data-constraint-id'));
    const constraintId = event.target.getAttribute('data-constraint-id');
    const checked = event.target.checked;
    axios.post(`/api/documents/${document.id}/update-constraint/`, {
      constraintId,
      checked
    }).then(res => {
      console.log(res);
    });
  }

  const retrieveConstraints = (name) => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/constraints/byType?name=${name}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
    })
  }

  useEffect(() => {
    const promises = [];
    const constraintTypes = ['Keyword', 'Location', 'Category'];
    constraintTypes.forEach(typeName => promises.push(retrieveConstraints(typeName)));
    Promise.all(promises)
      .then(([keywords, locations, categories]) => {
        setConstraints({keywords, locations, categories});
      })
  }, []);

  const getConstraintsMarkup = (constraintTypeName) => {
    return constraints[constraintTypeName] && constraints[constraintTypeName].map( item => {
      return (
        <div key={`default-${item.id}`} className="mb-3">
          <Form.Check 
            type='checkbox'
            id={`option-${constraintTypeName}.${item.id}`}
            data-constraint-id={item.id}
            label={`${item.label}`}
            className={`option-${constraintTypeName}`}
            onClick={handleCheckboxClick}
          />
        </div>  
      );
    });
  };

  const restOfFormMarkup = (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Select category(ies):</Form.Label>
        {getConstraintsMarkup('categories')}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select location(s):</Form.Label>
        {getConstraintsMarkup('locations')}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select keyword(s):</Form.Label>
        {getConstraintsMarkup('keywords')}
      </Form.Group>
      <div>Files: </div>
      <Form.Group className="mb-3">
        <Form.Label>Select file to upload</Form.Label>
        <Form.Control 
          type="file"
          name="file"
          onChange={handleFileSubmission}
          id='form-file'
        />
      </Form.Group>
      <Button id="submit" onClick={handleSubmit}>Generate Document Record</Button>
    </div>
  );



	return(
    <div>
      <div className='NewDocumentForm'>
        <Form className='UploadForm'>

          <Form.Group className="mb-3">
            <Form.Label>Enter New Document Title</Form.Label>
            <Form.Control 
              type="text" 
              onBlur={handleTitle} 
              id='form-document-title'
            />
          </Form.Group>
          { document.title && restOfFormMarkup}
        </Form>
      </div>
	  </div>
	)
}

export default Upload;