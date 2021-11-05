import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.svg';

export default function Sidebar() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column border-2 border-end h-100">
      <Nav.Item as='div' className='w-100 mb-3'>
        <img src={logo} className='w-75' alt='logo' />
      </Nav.Item>
      <Nav.Item as='li' className='mb-3'>
        <NavLink to='/' className='text-decoration-none'>Dashboard</NavLink>
      </Nav.Item>
      <Nav.Item as='li' className='mb-3'>
        <NavLink to='/orders' className='text-decoration-none'>Orders</NavLink>
      </Nav.Item>
      <Nav.Item as='li'>
        <NavLink to='/logout' className='text-decoration-none'>Logout</NavLink>
      </Nav.Item>
    </Nav>
  )
}
