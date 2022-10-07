import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';

import axios from 'axios';

import { useOutletContext } from "react-router-dom";
import Navigation
 from '../../Navigation';
function Upload(){

  const navigate = useNavigate();
  const appData = useOutletContext();

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
    <>
      <Navigation appData={appData}/>
      <Container className='main-content'>
          <Form className=''>
            <Form.Group className="mb-3">
              <Form.Label>Enter New Document Title</Form.Label>
              <Form.Control 
                type="text" 
                onBlur={createDocumentWithTitle} 
              />
            </Form.Group>
          </Form>
      </Container>
    </>
	)
}

export default Upload;