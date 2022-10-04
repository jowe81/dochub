import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { Collection, Key, GeoAlt } from "react-bootstrap-icons";
import FileItem from "../../FileItem";
import './Document.scss';

export default function FullDocument (props) {
  console.log(props);
  const document = props.document;
  const navigate = useNavigate();  
  const appData = useOutletContext();

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

  const getFilesMarkup = document => {
    return document.Files.map(file => (
      <Row className="document-constraint cursor-pointer" key={file.id}>
        <Col className="text-primary">
          <FileItem file={file} tiny={true} btns={{download: true}} />
        </Col>
      </Row>      
    ));    
  }
  
  const categories = getCategories(document);
  const locations = getLocations(document);
  const keywords = getKeywords(document);
  const files = getFilesMarkup(document);
  
  return (
    <Container>
    {document && (
        <Row className="document border border-secondary rounded" key={document.id} data-document-id={document.id}>
          <Container className="">
            <Row>
              <div className="document-title text-primary">
              <Link to={`/documents/${document.id}`}>{document.title}</Link>
              </div> 
            </Row>

            <Row>
              
              
            </Row>
            <Row>
              <div className="document-description">{document.description}</div>
            </Row>
            {
              files.length>0 && files
            }
            <Row>
              <Col className="document-constraint">
                <span className="icon"><Collection /></span>
                <span className="constraint-title">Categories:</span>
                {categories || (<span className='text-muted'>none assigned</span>)}
              </Col>
            </Row>
            <Row>
              <Col className="document-constraint">
                <span className="icon"><GeoAlt /></span>
                <span className="constraint-title">Locations:</span>
                {locations || (<span className='text-muted'>none assigned</span>)}
              </Col>
            </Row>
            <Row>
              <Col className="document-constraint">
                <span className="icon"><Key /></span>
                <span className="constraint-title">Keywords:</span>
                {keywords || (<span className='text-muted'>none assigned</span>)}
              </Col>
            </Row>
            {appData.user?.id && 
              <Row className="" >
                <Col className=""><small><Link to={`/documents/${document.id}/edit`} >Edit this document</Link></small></Col>
              </Row>

            }    
          </Container>
        </Row>
      )}
    </Container>
  );

}