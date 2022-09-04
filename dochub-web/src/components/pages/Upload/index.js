import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';
import { resolvePath } from 'react-router-dom';

import './UploadForm.scss';

function Upload(){

  const [constraints, setConstraints] = useState({}); 
  const [document, setDocument] = useState({});

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
        console.log("Returned record", documentRecord);        
      })
    console.log("New record:", newDocument);
  }

	const handleFileSubmission = (event) => {
    const formData = new FormData();
    console.log(`Uploading file for document #${document.id}, ${document.title}`, event.target.files.length);
		formData.append('file', event.target.files[0]);
    axios({
      method: "post",
      url: "/api/files",
      data: { ...formData, id: document.id },
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
            label={`${item.label}`}
            className={`option-${constraintTypeName}`}
          />
        </div>  
      );
    });
  };

  const keywordsMarkup = getConstraintsMarkup('keywords')
  console.log(keywordsMarkup);
	return(
    <div>
      <div className='NewDocumentForm'>
        <Form className='UploadForm'>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Document Title</Form.Label>
            <Form.Control 
              type="text" 
              value={document.title} 
              onBlur={handleTitle} 
              id='form-document-title'
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategories">
            <Form.Label>Select category(ies):</Form.Label>
            {getConstraintsMarkup('categories')}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocations">
            <Form.Label>Select location(s):</Form.Label>
            {getConstraintsMarkup('locations')}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formKeywords">
            <Form.Label>Select keyword(s):</Form.Label>
            {getConstraintsMarkup('keywords')}
          </Form.Group>
          <div>Files: </div>
          <Form.Group className="mb-3" controlId="formFiles">
            <Form.Label>Select file to upload</Form.Label>
            <Form.Control 
              type="file"
              name="file"
              onChange={handleFileSubmission}
            />
          </Form.Group>
          <Button id="submit" onClick={handleSubmit}>Generate Document Record</Button>
        </Form>
      </div>
	  </div>
	)
}

export default Upload;