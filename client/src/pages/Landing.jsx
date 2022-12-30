import { Button } from 'react-bootstrap'

const Landing = () => {
  const style = {
    main: {
      color: 'blanchedalmond',
      textAlign: 'center'
    },
    section: {
      margin: '1rem'
    },
    img: {
      width: '90%',
      height: 'auto',
      margin: '1.5rem 0'
    }
  }
  return (
    <main style={style.main}>
      <section style={style.section}>Bypass commercial sellers and go directly to the source. People in your area have food to sell!</section>
      <Button
        onClick={() => window.location.href = '/login'}
        className='btn-success'>Login</Button> or <Button
          onClick={() => window.location.href = '/signup'}
          className='btn-success'>Signup</Button>
      <img className="img-thumbnail" style={style.img} src='/images/local_food.jpg' alt='Several types of food on a table at a market' />
    </main>
  )
}

export default Landing