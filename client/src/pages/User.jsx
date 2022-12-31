import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Modal, Form, Button } from "react-bootstrap/"
import { useAppContext } from '../utils/AppContext'
import { FaEdit } from 'react-icons/fa'
import { AiFillCloseSquare } from 'react-icons/ai'
import Cookie from 'js-cookie'

const User = (props) => {

  const { appState } = useAppContext()
  if (!Cookie.get('auth-token') || !appState.user) window.location.href = '/'
  
  const { id } = useParams()

  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState({ username: '', email: "", zipCode: '' })
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [postId, setPostId] = useState(null)

  const fetchUser = async () => {
    const lookupQuery = await fetch(`/api/user/${id}`)
    const parsedResponse = await lookupQuery.json()
    if (parsedResponse.result === "success") {
      setUser(parsedResponse.payload)
      const p = parsedResponse.payload
      setUpdate({ username: p.username, email: p.email, zipCode: p.zipCode, contact: p.contact })
    }
  }

  const handleUpdate = async () => {
    const res = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update)
    })
    if (!res.ok) alert('Unable to update info, please verify')
  }

  const deletePost = async () => {
    const res = await fetch(`/api/posts/${id}/${postId}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      setUser(await res.json())
      setShow2(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const style = {
    post: {
      border: '.25rem solid #c2c0c8',
      color: 'whitesmoke',
      backgroundColor: '#909641',
      borderRadius: '.5rem',
      padding: '1rem',
      marginTop: '.75rem',
      display: 'flex',
      justifyContent: 'space-around'
    },
    edit: {
      zIndex: 10,
      height: 'auto',
      width: '2rem'
    },
    name: {
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    h2: {
      marginTop: '2rem'
    },
    postDelete: {
      position: 'relative',
      color: 'red',
      height: 'auto',
      width: '2rem',
    }
  }

  return (
    <Container style={{ paddingTop: "1em", textAlign: 'center', color: 'blanchedalmond' }}>
      {!user ? (
        <p>We could not find the user you were seeking.</p>
      ) : (
        <>{
          id === appState.user._id ?
            <div>
              <div style={style.name}>
                <FaEdit
                  onClick={() => setShow(!show)}
                  style={style.edit} />
                <h1>{user.username}</h1>
                <span></span>
              </div>
              {user.posts.length > 0 ? 
              <h2 style={style.h2}>You are selling</h2> :
              <></>}
              {user.posts.map(p => <article
                key={p._id}
                style={style.post}
              >
                {p.item} for {p.price}.
                <AiFillCloseSquare
                  onClick={e => {
                    setPostId(p._id)
                    setShow2(true)
                  }}
                  style={style.postDelete} />
              </article>)}
            </div> :
            <div>
              <h1>{user.username}</h1>
              <h2>Contact:</h2>
              {user.contact === 'email' || user.contact === user.email ?
                <h3>{user.email}</h3> : <h3>{user.contact}</h3>}
            </div>
        }</>
      )
      }
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Username"
                value={update.username}
                onChange={(e) => setUpdate({ ...update, [e.target.name]: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={update.email}
                onChange={(e) => setUpdate({ ...update, [e.target.name]: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                placeholder="Enter Zip Code"
                value={update.zipCode}
                onChange={(e) => setUpdate({ ...update, [e.target.name]: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                placeholder="How should buyers connect?"
                value={update.contact}
                onChange={(e) => setUpdate({ ...update, [e.target.name]: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={() => setShow2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={deletePost}>Delete</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow2(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container >
  )
}

export default User