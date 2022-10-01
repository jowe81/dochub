
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Link, Outlet } from "react-router-dom";
import DocTable from './DocTable';

function Documents() {
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  useEffect(() => {
    axios.get('/api/documents')
      .then(res => {
        setDocs(res.data);
      });
  }, []);

  const getDocs = docs.map(document => (
    <Link
      style={{ display: "block", margin: "1rem 0" }}
      to={`/documents/${document.id}`}
      key={document.id}
    >
      {document.title}
    </Link>
  ));

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
    <div>
      <div>
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
      <Outlet />
    </div>
  );

}

export default Documents;