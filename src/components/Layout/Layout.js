import React from 'react';
import Header from '../Header/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css'




export default function Layout(props) {
    return (
        <div>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className='sidebar'>
                                <ul>
                                    <li><NavLink to='/'>HOME</NavLink></li>
                                    <li><NavLink to='/category'>CATEGORY</NavLink></li>
                                    <li><NavLink to='/products'>PRODUCTS</NavLink></li>
                                    <li><NavLink to='/orders'>ORDERS</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={12} style={{paddingTop:'60px',left:'130px',position:'fixed'}}>{props.children}</Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }
        </div>
    )
}
