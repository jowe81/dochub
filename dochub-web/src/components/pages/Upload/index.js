import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';

import './UploadForm.scss';

function Upload(){

  const [constraints, setConstraints] = useState({}); 
  const [document, setDocument] = useState({});

  //Updated state for nested object
  const _setDocument = documentRecord => {
    setDocument({
      ...documentRecord,
      constraints: [...documentRecord.Constraints],
      files: [...documentRecord.Files],
      user: {...documentRecord.User}
    });
  }

  const refreshDocumentData = () => {
    axios.get(`/api/documents/${document.id}`)
      .then(res => {
        const documentRecord = res.data;
        console.log(`Refreshed doc record: `, documentRecord);
        console.log(`constraints:`, documentRecord.Constraints);
        _setDocument(documentRecord);
      })
  }

	const handleFileSubmission = (event) => {
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
      event.target.value = null;
      refreshDocumentData();
    });
	};

  const removeFile = (event) => {
    const fileId = event.target.getAttribute('data-file-id');
    axios
      .delete(`/api/files/${fileId}`)
      .then(refreshDocumentData);
  }

  const handleTitle = (event) => {
    if (!document.id && event.target.value !== '') {
      //Haven't created a document yet
      axios.post('/api/documents', {
        title: event.target.value,
      }).then(res => {
        const documentRecord = res.data;
        setDocument({ ...documentRecord });
      });
    }
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

  const filesMarkup = document.Files?.map(file => (
    <div className="fileItem" key={file.id}>
      {file.originalName}
      <Button className="removeBtn" size="sm" variant="danger" onClick={removeFile} data-file-id={file.id}>remove</Button>
    </div>
  ));

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
      <div>
        Files: 
        <div>
          {filesMarkup}
        </div>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Select file to upload</Form.Label>
        <Form.Control 
          type="file"
          name="file"
          onChange={handleFileSubmission}
          id='form-file'
        />
      </Form.Group>
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
          { document.title && restOfFormMarkup }
        </Form>
      </div>
	  </div>
	)
}

export default Upload;