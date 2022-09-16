
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";

function Documents() {
  const [docs, setDocs] = useState([]);
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

  return (
    <div>The Docs components
      {getDocs}
      <Outlet />
    </div>
  );

}

export default Documents;