import React, { Component } from 'react'
import '../styles/App.css'
import axios from 'axios'

class App extends Component {
  state = {
    users:[]
  }

  componentDidMount() {
    axios.get('/api/users').then(resp => {
      this.setState({
        users: resp.data
      })
    })
  }
  render () {
    return (
      <div>
        <ul>
        {this.state.users.map(user => (
        <li key={user.id} className="name">{user.name}</li>
        ))}
        </ul>
      </div>
    )
  }
}

export default App
