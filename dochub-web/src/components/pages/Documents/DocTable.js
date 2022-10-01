import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Collection, Key, GeoAlt, FileEarmark } from "react-bootstrap-icons";
import FileItem from "../../FileItem";
import './Documents.scss';

export default function DocTable (props) {

  const { documents } = props;
  const navigate = useNavigate();
  const handleClick = (event) => {
    console.log(event.originalTarget, event.target === event.originalTarget);
    const documentId = event.currentTarget.getAttribute("data-document-id");
    navigate(`/documents/${documentId}`);

  }

  const getConstraintListByType = (document, constraintTypeId) => {
    return document
      .Constraints
      .filter(constraint => constraint.constraintTypeId === constraintTypeId)
      .map(location => location.label)
      .join(', ');
  }

  const getKeywords = document => getConstraintListByType(document, 1);
  const getLocations = document => getConstraintListByType(document, 2);
  const getCategories = document => getConstraintListByType(document, 3);
  
  const getFiles = document => {
    return document.Files.map(file => file.originalName).join(', ');
  }

  const getFilesMarkup = document => {
    return document.Files.map(file => (
      <Row className="document-constraint cursor-pointer">
        <Col className="text-primary">
          <FileItem file={file} tiny={true} btns={{download: true}} />
        </Col>
      </Row>      
    ));    
  }
  
  return (
    <Container>
        {documents && documents.map(doc => {

          const categories = getCategories(doc);
          const locations = getLocations(doc);
          const keywords = getKeywords(doc);
          const files = getFilesMarkup(doc);

          return (
            <Row className="document border border-secondary rounded" key={doc.id} data-document-id={doc.id}>
              <Container className="">
                <Row className="document-constraint">
                  {categories.length>0 && 
                      <Col>
                        <span className="icon"><Collection /></span>
                        {categories}
                      </Col>
                  }
                  {locations.length>0 && 
                      <Col className="text-end">
                        <span className="icon"><GeoAlt /></span>
                        {locations}
                      </Col>
                  }
                </Row>
                <Row>
                  <div className="document-title text-primary">
                  <Link to={`/documents/${doc.id}`}>{doc.title}</Link>
                  </div> 
                </Row>

                <Row>
                  
                  
                </Row>
                <Row>
                  <div className="document-description">{doc.description}</div>
                </Row>
                {
                  files.length>0 && files
                }
                {keywords.length>0 && 
                  <Row className="document-constraint">
                    <Col>
                      <span className="icon"><Key /></span>
                      {keywords}
                    </Col>
                  </Row>      
                }      
              </Container>
            </Row>
          )
        })}
    </Container>
  );

}