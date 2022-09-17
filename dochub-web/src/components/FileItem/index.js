import { useState } from 'react';
import { Button } from 'react-bootstrap'; 
import { Download, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import './FileItem.scss';

export default function FileItem({file, btns}) {

  const [render, setRender] = useState(file ? true : false);

  //From https://code-boxx.com/download-file-javascript-fetch/
  const downloadFile = () => {
    if (!(btns.download && file.id)) return;
    const url = `/api/files/${file.id}/download`;
    fetch(url)
    .then(res => res.blob())
    .then(data => {
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = file.originalName;
      a.click();
    });    
  }

  const removeFile = (event) => {
    event.stopPropagation();
    const fileId = event.target.closest('Button[data-file-id]').getAttribute('data-file-id'); 
    axios.delete(`/api/files/${fileId}`)
      .then(() => setRender(false))
      .catch(err => console.log(`Error: ${err.response.data}`));
  }

  //From Stackoverflow
  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }

  return (
    render && 
    <div className="fileItem" onClick={() => downloadFile(file.id)}>
      {file.originalName}
      {btns?.remove && <Button className="fileBtn" size="sm" variant="danger" onClick={removeFile} data-file-id={file.id}><Trash /></Button>}
      {btns?.download && <Button className="fileBtn" onClick={downloadFile} size="sm" variant="primary" data-file-id={file.id}><Download /></Button>}
      <div>
        <small>
          {file.extension.toUpperCase()} | {bytesToSize(file.size)} | Uploaded {new Date(file.createdAt).toLocaleDateString()} | ID:{file.id}
        </small>
      </div>
    </div>
  );
}