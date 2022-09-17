import './Document.scss';

export default function DocumentMeta ({document}) {
  return (
    <>
      <div className="metaContainer">
        <h2>{document.title}</h2>
        <span className="text-muted">Last modified: {new Date(document.updatedAt).toLocaleDateString()}</span>
      </div>
    </> 
  );
}