import { useState } from "react"
import Cookie from "js-cookie"
import { Alert, Button, Container, Form } from 'react-bootstrap'

const Signup = ({ setForm }) => {
    const [signupCreds, setSignupCreds] = useState({ username: '', email: "", zipCode: '', password: "", confirm: '' })
    const [formMessage, setFormMessage] = useState({ type: "", msg: "" })

    const handleSignup = async (e) => {
        e.preventDefault()
        if (!signupCreds.username) return setFormMessage({ type: 'danger', msg: 'Please enter username' })
        if (!signupCreds.email) return setFormMessage({ type: 'danger', msg: 'Please enter email' })
        if (!signupCreds.zipCode) return setFormMessage({ type: 'danger', msg: 'Please enter zip code' })
        if (signupCreds.zipCode.length !== 5) return setFormMessage({ type: 'danger', msg: 'Zip code should be a standard 5 digit zip code' })
        if (!signupCreds.password) return setFormMessage({ type: 'danger', msg: 'Please enter password' })
        if (signupCreds.password.length < 8 || signupCreds.password.length > 20) return setFormMessage({ type: 'danger', msg: 'Password should be between 8 and 20 characters' })
        if (!signupCreds.confirm) return setFormMessage({ type: 'danger', msg: 'Please confirm password' })
        if (signupCreds.password !== signupCreds.confirm) return setFormMessage({ type: 'danger', msg: 'Passwords must match' })
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

    const style = {
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

                {formMessage.msg.length > 0 && (
                    <Alert variant={formMessage.type} style={{ marginTop: "2em" }}>
                        {formMessage.msg}
                    </Alert>
                )}

                <Button variant="success"
                    className='m-2'
                    type="submit">Submit</Button>
                or <Button
                    onClick={e => {
                        e.preventDefault()
                        setForm('login')
                    }}
                    variant='success'
                    className='m-2'>Login</Button>
            </Form>

        </Container>
    )
}

export default Signup