import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { nameChanged, emailChanged, passwordChanged, registerUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class RegisterForm extends Component {
  onButtonPress() {
    const { name, email, password } = this.props;

    this.props.registerUser({ name, email, password });
  }

  nameChange(text) {
    this.props.nameChanged(text);
  }

  emailChange(text) {
    this.props.emailChanged(text);
  }

  passwordChange(text) {
    this.props.passwordChanged(text);
  }

  gotoLogin() {
    Actions.login();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Register
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Name'
            placeholder='name'
            onChangeText={this.nameChange.bind(this)}
            value={this.props.name}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Email'
            placeholder='email@provider.com'
            onChangeText={this.emailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label='Password'
            placeholder='password'
            onChangeText={this.passwordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <Text style={styles.orStyle}>
          Or
        </Text>

        <CardSection>
          <Button onPress={this.gotoLogin.bind(this)}>
            Login
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },

  orStyle: {
    fontSize: 20,
    alignSelf: 'center',
    paddingTop: 15,
    paddingBottom: 15
  }
});

const mapStateToProps = (state) => {
  const { name, email, password, error, loading } = state.auth;

  return { name, email, password, error, loading };
};

export default connect(mapStateToProps, {
  nameChanged,
  emailChanged,
  passwordChanged,
  registerUser
})(RegisterForm);
