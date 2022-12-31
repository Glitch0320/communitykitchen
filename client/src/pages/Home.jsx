import { useState } from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../utils/AppContext'
import Cookie from 'js-cookie'
import { Button, Modal, Form } from 'react-bootstrap'

const Home = () => {

  const { appState } = useAppContext()
  if (!Cookie.get('auth-token') || !appState.user) window.location.href = '/'
  
  const [ user, setUser ] = useState(null)
  const [show, setShow] = useState(false)
  const [post, setPost] = useState({
    item: '',
    price: ''
  })
  const [posts, setPosts] = useState([])
  const [searchUserId, setSearchUserId] = useState(null)

  const getPosts = async () => {
    const res = await fetch(`/api/user/${appState.user._id}`)
    const { payload } = await res.json()
    setUser(payload)
    const pes = await fetch(`/api/posts/${payload.zipCode}`)
    const pos = await pes.json()
    setPosts(pos)
  }

  const createPost = async e => {
    e.preventDefault()
    if (!post.item) return alert('Please enter item')
    if (!post.price) return alert('Please enter item price')
    const res = await fetch(`/api/posts/${appState.user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appState.user._id,
        item: post.item,
        price: post.price,
        zipCode: user.zipCode
      })
    })

    if (res.ok) {
      const newPost = await res.json()
      setPosts([...posts, {...newPost, user }])
      setPost({
        item: '',
        price: ''
      })
      setShow(false)
    } else {
      setShow(false)
      alert('Sorry, we were unable to post your item.')
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (searchUserId) {
      window.location.href = `/user/${searchUserId}`
      setSearchUserId(null)
    }
  }, [searchUserId])

  const style = {
    main: {
      textAlign: 'center',
      color: 'blanchedalmond'
    },
    postButton: {
      position: 'fixed',
      bottom: '2rem',
      zIndex: 100,
      margin: 'auto',
      left: 0,
      right: 0,
      width: '10rem',
    },
    post: {
      border: '.25rem solid #c2c0c8',
      color: 'whitesmoke',
      backgroundColor: '#909641',
      borderRadius: '.5rem',
      padding: '1rem',
      marginTop: '.75rem'
    }
  }

  return (
    <main style={style.main}>
      {posts.length > 0 ? <>{posts.map(p => <article
        key={p._id}
        style={style.post}
        onClick={e => setSearchUserId(p.user._id)}
      >
        {p.user.username === user.username ? 'You have' : `${p.user.username} has`} {p.item} for {p.price}.
      </article>)}</> : <>There is no food for sale in your area at the moment.</>}
      <Button className='btn-success' style={style.postButton} onClick={() => setShow(true)}>Create Post</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createPost}>
            <Form.Group className="mb-3" controlId="item">
              <Form.Label>What are you selling?</Form.Label>
              <Form.Control
                type="text"
                name="item"
                placeholder="Potatoes..."
                maxLength={32}
                value={post.item}
                onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>How much are you selling it for?</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="$5 per lb..."
                value={post.price}
                maxLength={32}
                onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
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
    </main>
  )
}

export default Home