import React from 'react';
import { Message, Input, Container, Header, Button } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class Register extends React.Component {
  state = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: '',
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {

    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: ''
    })

    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({path, message}) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }


    console.log(response);
  };

  render() {
    const { username, email, password, usernameError, emailError, passwordError } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>

        <Input
          error={!!usernameError} //error is from semantic-ui
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input
          error={!!emailError}
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="Email"
          fluid
        />
        <Input
          error={!!passwordError}
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        {usernameError || emailError || passwordError ? (
          <Message 
            // errors
            header="There were some errors with your submission"
            list={errorList}
          />
        ) : null }
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}


  const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!) {
      register(username: $username, email: $email, password: $password) {
        ok
        errors {
          path 
          message
        }
      }
    }
  `;


// graphql is used as high order component 
// passes registerMutation as a prop - this.props.mutate()
export default graphql(registerMutation)(Register);