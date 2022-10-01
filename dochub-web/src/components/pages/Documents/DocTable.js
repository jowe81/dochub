import { getContrastRatio } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Collection, Key, GeoAlt, Person } from "react-bootstrap-icons";
import './Documents.scss';

export default function DocTable (props) {

  const { documents } = props;
  const navigate = useNavigate();
  const handleClick = (event) => {
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

  return (
    <Container>
        {documents && documents.map(doc => {

          const categories = getCategories(doc);
          const locations = getLocations(doc);
          const keywords = getKeywords(doc);
          
          return (
            <Row className="document" key={doc.id} onClick={handleClick} data-document-id={doc.id}>
              <Container>
                <Row>
                  <div className="document-title">{doc.title}</div> 
                </Row>
                <Row>
                  
                  
                </Row>
                <Row>
                  <div className="document-description">{doc.description}</div>
                </Row>
                {categories.length>0 && 
                <Row className="document-constraint">
                  <Col>
                    <span className="icon"><Collection /></span>
                    {categories}
                  </Col>
                </Row>            
                }
                {locations.length>0 && 
                <Row className="document-constraint">
                  <Col>
                    <span className="icon"><GeoAlt /></span>
                    {locations}
                  </Col>
                </Row>            
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