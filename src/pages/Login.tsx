import React, { useState } from 'react'
import logo from '../logo.svg';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import * as authApi from '../utils/api/auth';
import authManger from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [usernameErrMsg, setUsernameErrMsg] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);

  const navigate = useNavigate();

  async function handleLoginFormSubmit(e) {
    e.preventDefault();

    setAlertMsg(null);

    if (!username) {
      setUsernameErrMsg('Username is required');
      return;
    } else {
      setUsernameErrMsg(null);
    }

    if (!password) {
      setPasswordErrMsg('Password is required');
      return;
    } else {
      setPasswordErrMsg(null);
    }

    const res = await authApi.login({ username, password });

    if (res.ok) {
      const { access_token, refresh_token } = res.data;
      authManger.saveAuthToken(access_token);
      authManger.saveRefreshToken(refresh_token);
      navigate('/');
    } else {
      console.log(res.err);
      setAlertMsg(res.err.message);
    }
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
                    required
                    isInvalid={!!usernameErrMsg}
                  />
                  <Form.Control.Feedback type="invalid">
                    {usernameErrMsg}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    isInvalid={!!passwordErrMsg}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordErrMsg}
                  </Form.Control.Feedback>
                </Form.Group>
                {alertMsg && <Alert variant='danger' className='mt-3'>{ alertMsg }</Alert>}
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
