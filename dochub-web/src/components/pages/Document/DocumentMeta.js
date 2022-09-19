import './Document.scss';

export default function DocumentMeta ({document}) {

  const authorMarkup = document.author && (
    <div className="author"><span>Author: </span>{document.author}</div>
  );

  const descriptionMarkup = document.description && (
    <div className="description">{document.description}</div>
  )

  return (
    <>
      <div className="metaContainer">
        <h2>{document.title}</h2>
        <div className="detailsContainer">
          {authorMarkup}
          {descriptionMarkup}
          <div className="text-muted">Last modified: {new Date(document.updatedAt).toLocaleDateString()} - {document.files?.length || 0} files</div>
        </div>
      </div>
    </> 
  );
}