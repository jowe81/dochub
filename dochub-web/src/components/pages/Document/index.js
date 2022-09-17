import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FileItem from "../../FileItem";

export default function Document() {

  const params = useParams();
  const [document, setDocument] = useState({});

  const getDocumentRecord = (documentId) => {
    return axios.get(`/api/documents/${documentId}`);
  }

  //Updated state for nested object
  const _setDocument = documentRecord => {
    setDocument({
      ...documentRecord,
      constraints: [...documentRecord.Constraints || []],
      files: [...documentRecord.Files || []],
      user: {...documentRecord.User}
    });
  }


  useEffect(() => {
    getDocumentRecord(params.documentId)
      .then((result) => {
        _setDocument(result.data);
      });
  }, [params.documentId]);

  return (
    <>
      <h2>{document.title}</h2>
      <div>
        <span>Updated: {document.updatedAt}</span>
      </div>
      <div>
        {document?.files?.map(file => <FileItem key={file.id} file={file} btns={{download: true}}/>)}
      </div>
    </>
  );

}