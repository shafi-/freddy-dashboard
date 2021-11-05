import React, { useState } from 'react'
import logo from '../logo.svg';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLoginFormSubmit(e) {
    e.preventDefault();
    console.log({ username, password });
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md='4' lg='4'>
          <Card className='border-2 mt-4 mt-md-5 p-4'>
            <Row className='mb-4'>
              <Col md='6' className='h-100'>
                <span className='align-middle'>Freddie's Artisanal Halloween Candy Shop</span>
              </Col>
              <Col md='6'>
                <img src={logo} className="w-100" alt="logo" />
              </Col>
            </Row>
            <Row>
              <Form onSubmit={handleLoginFormSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant='primary' type='submit' className='w-100 mt-5'>Login</Button>
              </Form>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
