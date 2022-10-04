import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import './DocTable.scss';

export default function DocTable (props) {

  const { documents } = props;

  const navigate = useNavigate();  
  const appData = useOutletContext();

  const handleClick = (event) => {
    console.log(event.originalTarget, event.target === event.originalTarget);
    const documentId = event.currentTarget.getAttribute("data-document-id");
    navigate(`/documents/${documentId}`);
  }

  return (
    <Container className="DocTable">
        {documents && documents.map(doc => {
          return (
            <Row className="document" key={doc.id} data-document-id={doc.id} onClick={handleClick}>
              <Container className="">
                <Row>
                  <div className="document-title text-primary">
                    {doc.title}
                  </div> 
                </Row>
                <Row>
                  <div className="document-description">{doc.description}</div>
                </Row>
              </Container>
            </Row>
          )
        })}
    </Container>
  );

}