import './FileItem.scss';

export default function FileItem(props) {
  const file = props.file;
  return (
    <div className="fileItem">{file.originalName}</div>
  );
}