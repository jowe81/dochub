
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useOutletContext } from "react-router-dom";
import DocTable from './DocTable';
import Navigation from "../../Navigation";




function Documents() {
  const appData = useOutletContext();
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    axios.get('/api/documents')
      .then(res => {
        setDocs(res.data);
      });
  }, []);

  const updateFilter = (event) => {
    event.preventDefault();

    const filter = event.target.value;
    console.log(filter);
    axios.get(`/api/documents?searchFor=${filter}`, { searchFor: filter })
      .then(res => setDocs(res.data));
  }

  const onKeyUp = (event) => {
    if (event.charCode === 13) {
      updateFilter(event);
    }  
  }

  return (
    <>
      <Navigation appData={appData} />
      <div className="main-content">
        <div className="search-form">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Search for anything.</Form.Label>
              <Form.Control 
                type="text" 
                onKeyPress={onKeyUp}
              />
            </Form.Group>       
          </Form>
        </div>
        <DocTable documents={docs} />
      </div>
    </>
  );

}

export default Documents;