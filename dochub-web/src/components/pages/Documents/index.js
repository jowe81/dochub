
import axios from 'axios';
import { useState, useEffect } from 'react';
function Documents() {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    axios.get('/api/documents')
      .then(res => {
        setDocs(res.data);
      });
  }, []);

  const getDocs = docs.map(doc => <div>{doc.title} | {doc.author}</div>);

  return (
    <div>The Docs components
      {getDocs}
    </div>
  );

}

export default Documents;