import Login from "../components/Login"
import Signup from "../components/Signup"
import { Button } from 'react-bootstrap'
import { useState } from "react"

const Landing = () => {
  const [form, setForm] = useState(null)
  const style = {
    main: {
      color: 'blanchedalmond',
      textAlign: 'center'
    },
    section: {
      margin: '1rem'
    }
  }
  return (
    <main style={style.main}>
      <h1 className='display-1 text-light bg-dark border border-success rounded mt-3'>Community Kitchen</h1>
      <section style={style.section}>Bypass commercial sellers and go directly to the source. People in your area have food to sell!</section>
      {!form && <><Button variant='success' onClick={() => setForm('login')}>Login</Button> or <Button variant='success' onClick={() => setForm('signup')}>Signup</Button></>}
      {form === 'login' && <Login setForm={setForm} />}
      {form === 'signup' && <Signup setForm={setForm} />}
    </main>
  )
}

export default Landing