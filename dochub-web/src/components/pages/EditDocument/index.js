import React, {useEffect, useState} from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FileItem from '../../FileItem';

import axios from 'axios';

function Upload(){

  const [constraints, setConstraints] = useState({}); 
  const [document, setDocument] = useState({title:'', author:'', description:''});
  const params = useParams();

  //Updated state for nested object
  const _setDocument = documentRecord => {
    setDocument({
      ...documentRecord,
      constraints: [...documentRecord.Constraints || []],
      files: [...documentRecord.Files || []],
      user: {...documentRecord.User}
    });
  }

  const refreshDocumentData = () => {
    const id = params.documentId;
    if (id) {
      axios.get(`/api/documents/${id}`)
        .then(res => {
          const documentRecord = res.data;
          console.log(`Refreshed doc record: `, documentRecord);
          console.log(`constraints:`, documentRecord.Constraints);
          _setDocument(documentRecord);
        });
    }
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
    }).then(() => {
      event.target.value = null;
      refreshDocumentData();
    });
	};

  const handleUpdate = (event) => {
    const updates = {
      id:document.id,
    }
    const field = event.target.getAttribute('data-field-name');
    updates[field] = event.target.value;
    axios.put(`/api/documents/${document.id}`, updates)
    .then(res => {
      refreshDocumentData();
      console.log('Description updated');
    });
  };

  const handleChange = (event) => {
    const field = event.target.getAttribute('data-field-name');
    document[field]=event.target.value;
    _setDocument(document);
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
      refreshDocumentData();
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
    //Pull constraint types
    const promises = [];
    const constraintTypes = ['Keyword', 'Location', 'Category'];
    constraintTypes.forEach(typeName => promises.push(retrieveConstraints(typeName)));
    Promise.all(promises)
      .then(([keywords, locations, categories]) => {
        setConstraints({keywords, locations, categories});
        //Pull document record
        refreshDocumentData();
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
            checked={document.constraints?.find(constraintRecord => constraintRecord.id === item.id)}
            defaultChecked={false}
          />
        </div>  
      );
    });
  };

  const filesMarkup = document.Files?.map(file => (
    <FileItem key={file.id} file={file} btns={{remove: true, download:true}}/>
  ));




	return( document &&
    <div className=''>
      <Form className='DocumentForm'>
        <Form.Group className="mb-3">
          <Form.Label>Document Title</Form.Label>
          <Form.Control type="text" data-field-name="title" value={document.title} onChange={handleChange} onBlur={handleUpdate}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author:</Form.Label>
          <Form.Control type="text" data-field-name="author" value={document.author} onChange={handleChange} onBlur={handleUpdate}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Short description:</Form.Label>
          <Form.Control as="textarea" rows={3} data-field-name="description" value={document.description} onChange={handleChange} onBlur={handleUpdate}/>
        </Form.Group>
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
      </Form>
    </div>
	)
}

export default Upload;