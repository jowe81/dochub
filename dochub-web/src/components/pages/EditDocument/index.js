import React, {useEffect, useState} from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FileItem from '../../FileItem';
import ConstraintListGroup from './ConstraintListGroup';
import './EditDocument.scss';
import axios from 'axios';
import Navigation from '../../Navigation';

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

  const retrieveAllConstraints = () => {
    return axios.get(`/api/constraints/`)
    .then(res => {
      setConstraints(res.data);
      refreshDocumentData();
    })
  }

  useEffect(() => {
    retrieveAllConstraints();
  }, []);


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
  
  const toggleConstraint = (event, selectedConstraint, constraintTypeId) => {
    //Find record if it exists
    let id;
    if (selectedConstraint?.id) {
      //Triggered by selecting in autocomplete or clicking a list item
      id = selectedConstraint.id;
    } else {
      //Triggered by typing and hitting return
      const value = event?.target?.value || selectedConstraint?.label;
      const constraintRecord = constraints.find(item => item.label === value);
      if (constraintRecord) {
        id = constraintRecord.id;
      } else if (value) {
        //Got a newly typed constraint that we need to add. Figure out constraintTypeId??
        axios.post(`/api/constraints`, {
          label: value,
          constraintTypeId,
        }).then(res => {
          retrieveAllConstraints();
        })
      }
    }
    if (id) {
      axios.post(`/api/documents/${document.id}/update-constraint/toggle`, {
        constraintId: id,
      }).then(refreshDocumentData);
    }
  }

	return( document && document.constraints &&
    <>
      <Navigation />
      <div className='main-content'>
        <Form className=''>
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
            <Form.Label>Category(ies):</Form.Label>
            <ConstraintListGroup 
              constraints = {constraints}
              toggleConstraint = {toggleConstraint}
              document = {document}
              constraintTypeId = {3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location(s):</Form.Label>
            <ConstraintListGroup 
              constraints = {constraints}
              toggleConstraint = {toggleConstraint}
              document = {document}
              constraintTypeId = {2}
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Keyword(s):</Form.Label>
            <ConstraintListGroup 
              constraints = {constraints}
              toggleConstraint = {toggleConstraint}
              document = {document}
              constraintTypeId = {1}
            />
          </Form.Group>
          <div>
            Files: 
            <div>
              {document.Files?.map(file => (<FileItem key={file.id} file={file} btns={{remove: true, download:true}}/>))}
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
    </>
	)
}

export default Upload;