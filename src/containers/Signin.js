import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../components/Layout/Layout'
import { Form, Button } from 'react-bootstrap'
import Input from '../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from '../actions'

export default function Signin(props) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const auth = useSelector(state => state.auth);



    
    const dispatch = useDispatch();
    const userLogin =(e) => {
        e.preventDefault();
        const user = {
            email,password
        }
        dispatch(login(user))
    }

    if(auth.authenticate){
        return <Redirect to={`/`} />
    }


    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{marginTop:'50px'}}>
                        <Col md={{span:4, offset:3}}>
                            <Form onSubmit={userLogin}>
                                <Input 
                                    type="email"
                                    placeholder="email"
                                    label="Email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                />
                                <Input 
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    label="Password"
                                />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}
