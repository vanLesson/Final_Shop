import React from "react"
export class LoginForm extends React.Component {
    state = {
      login: "",
      password: "",
    }
    render() {
      const valid = true
      // (this.state.value1.length < this.props.min || this.state.value !== this.state.value1 || this.state.value.length < this.props.min)
  
      return (
        <>
          <div>
            <p>Login</p>
            <input
              type="text"
              placeholder="Login..."
              value={this.state.login}
              onChange={(e) => this.setState({ login: e.target.value })}
              style={{
                backgroundColor: !valid ? "#f0999f" : "",
              }}
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              style={{
                backgroundColor: !valid ? "#f0999f" : "",
              }}
            />
            <button
              onClick={() =>
                this.props.onLogin(this.state.login, this.state.password)
              }
              disabled={!valid}
            >
              OK
            </button>
          </div>
        </>
      )
    }
  }