import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import Layout from '../components/Layout/Layout'
import Input from '../components/UI/Input'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../actions/user.actions'

export default function Signup() {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector(state=> state.user);
    const dispatch = useDispatch()

    const auth = useSelector(state=> state.auth);
    if(auth.authenticate){
        return <Redirect to={'/'} />
    }
    if(user.loading){
        return<p>Loading...!</p>
    }

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName,lastName,email,password
        }
        dispatch(signup(user))
    }


    return (
        <div>
            <Layout>
                <Container>
                {user.message}
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 4, offset: 3 }}>
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                    <Input
                                        Label="First Name"
                                        type="firstName"
                                        placeholder="first name"
                                        value={firstName}
                                        onChange={(e)=>setFirstName(e.target.value)} />
                                        </Col>
                                    <Col md={6}>
                                    <Input
                                        Label="Last Name"
                                        type="lastName"
                                        placeholder="lastname"
                                        value={lastName}
                                        onChange={(e)=>setLastName(e.target.value)} />
                                    </Col>
                                </Row>
                                <Input
                                        Label="Email"
                                        type="text"
                                        placeholder="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)} />
                                <Input
                                        Label="Password"
                                        type="text"
                                        placeholder="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)} />
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
