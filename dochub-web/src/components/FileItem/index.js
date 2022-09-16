import { Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import './FileItem.scss';

export default function FileItem(props) {
  const file = props.file;

  //From https://code-boxx.com/download-file-javascript-fetch/
  const downloadFile = (id) => {
    const url = `/api/files/${id}/download`;
    fetch(url)
    .then(res => res.blob())
    .then(data => {
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = file.originalName;
      a.click();
    });    
  }

  return (
    <div className="fileItem">
      {file.originalName}
      <Button className="removeBtn" onClick={() => downloadFile(file.id)} size="sm" variant="primary" data-file-id={file.id}>Download</Button>
    </div>
  );
}