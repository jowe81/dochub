import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import axios from 'axios';

function Upload(){

  const navigate = useNavigate();

  const createDocumentWithTitle = (event) => {
    const title = event.target.value;
    if (title.trim()) {
      axios.post('/api/documents', {
        title: event.target.value,
      }).then(res => {
        const documentRecord = res.data;
        navigate(`/documents/${documentRecord.id}/edit`);
      });
    } else {
      //User entered only whitespace - clear input
      event.target.value='';
    }
  }

  return(
    <div>
      <div className=''>
        <Form className='DocumentForm'>
          <Form.Group className="mb-3">
            <Form.Label>Enter New Document Title</Form.Label>
            <Form.Control 
              type="text" 
              onBlur={createDocumentWithTitle} 
            />
          </Form.Group>
        </Form>
      </div>
	  </div>
	)
}

export default Upload;