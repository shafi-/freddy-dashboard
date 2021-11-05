import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from './Sidebar'

export default function AppLayout(props) {
  return (
    <Container fluid className='pt-4 h-100'>
      <Row>
        <Col sm='2' md='2'>
          <Sidebar />
        </Col>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  )
}
