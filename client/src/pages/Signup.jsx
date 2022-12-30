import { useState } from "react"
import Cookie from "js-cookie"
import { Alert, Button, Container, Form } from 'react-bootstrap'

const Signup = (props) => {
    const [signupCreds, setSignupCreds] = useState({ username: '', email: "", zipCode: '', password: "", confirm: '' })
    const [formMessage, setFormMessage] = useState({ type: "", msg: "" })

    const handleSignup = async (e) => {
        e.preventDefault()
        setFormMessage({ type: "", msg: "" })
        const res = await fetch("/api/user/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signupCreds)
        })
        if (!res.ok) {
            setFormMessage({
                type: 'danger',
                msg: 'Email already exists'
            })
            return
        }

        const authCheck = await fetch("/api/user/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: signupCreds.email, password: signupCreds.password })
        })
        const authResult = await authCheck.json()

        Cookie.set("auth-token", authResult.token)
        setFormMessage({ type: "success", msg: "Signup successful" })
        window.location.href = '/kitchen'
    }

    const style={
        form: {
            color: 'blanchedalmond',
            textAlign: 'center'
        }
    }

    return (
        <Container>
            <Form 
            style={style.form}
            onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={signupCreds.username}
                        onChange={(e) => setSignupCreds({ ...signupCreds, [e.target.name]: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={signupCreds.email}
                        onChange={(e) => setSignupCreds({ ...signupCreds, [e.target.name]: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="zipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="zipCode"
                        placeholder="Enter Zip Code"
                        value={signupCreds.zipCode}
                        onChange={(e) => setSignupCreds({ ...signupCreds, [e.target.name]: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signupCreds.password}
                        onChange={(e) => setSignupCreds({ ...signupCreds, [e.target.name]: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirm"
                        placeholder="Confirm password"
                        value={signupCreds.confirm}
                        onChange={(e) => setSignupCreds({ ...signupCreds, [e.target.name]: e.target.value })}
                    />
                </Form.Group>

                <Button variant="success"
                    className='m-2'
                    type="submit">Submit</Button>
                or <Button
                    onClick={e => {
                        e.preventDefault()
                        window.location.href = '/login'
                    }}
                    variant='success'
                    className='m-2'>Login</Button>
            </Form>

            {formMessage.msg.length > 0 && (
                <Alert variant={formMessage.type} style={{ marginTop: "2em" }}>
                    {formMessage.msg}
                </Alert>
            )}
        </Container>
    )
}

export default Signup