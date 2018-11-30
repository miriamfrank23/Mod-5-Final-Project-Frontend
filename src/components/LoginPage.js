import React, { Component } from 'react'

class LoginPage extends Component {

  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }
  }

  controlledForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state)
    })
  }

  createNewUser = (e) => {
    e.preventDefault()
    fetch(`http://localhost:4000/api/v1/users`, {
      method: 'POST',
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(parsed => {
      window.localStorage.setItem('jwt', parsed.jwt)
      console.log(window.localStorage)
      this.props.setCurrentUser(parsed.user)
    })
  }

  logUserIn = (e) => {
    e.preventDefault()
    fetch(`http://localhost:4000/api/v1/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(parsed => {
      window.localStorage.setItem('jwt', parsed.jwt)
      console.log(window.localStorage)
      this.props.setCurrentUser(parsed.user)
    })
  }

  render () {
    return (
      <div id='loginForm' onSubmit={this.logUserIn}>
      <form>
      <h2>
        Sign in here!
      </h2>
      <h3>
        Email:
      </h3>
      <input type="text" name="email" onChange={this.controlledForm}/>
      <h3>
        Password:
      </h3>
      <input type="password" name="password" onChange={this.controlledForm}/>
      <br/>
      <input type="submit" value="Sign in" />
      </form>

      <form onSubmit={this.createNewUser}>
      <h2>
        New here? Create an account!
      </h2>
      <h3>
        First name:
      </h3>
      <input type="text" name="first_name" onChange={this.controlledForm}/>
      <h3>
        Last name:
      </h3>
      <input type="text" name="last_name" onChange={this.controlledForm}/>
      <h3>
        Email:
      </h3>
      <input type="text" name="email" onChange={this.controlledForm}/>
      <h3>
        Password:
      </h3>
      <input type="password" name="password" onChange={this.controlledForm}/>
      <br/>
      <input type="submit" value="Sign up"/>
      </form>

      </div>
    )
  }


}

export default LoginPage