import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  resetAttr,
  friendsReset
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends React.Component {
  componentWillMount() {
    this.props.resetAttr();
    this.props.friendsReset();
  }
  
  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  passwordChange(text) {
    this.props.passwordChanged(text);
  }

  emailChange(text) {
    this.props.emailChanged(text);
  }

  gotoRegister() {
    Actions.register();
  }

  renderButton(text, action, showSpinner) {
    if (this.props.loading) {
      return (showSpinner ? <Spinner size='large' /> : <Button>{text}</Button>);
    }

    return <Button onPress={action.bind(this)}>{text}</Button>;
  }

  render() {
    return (
      <Card>
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
          {this.renderButton('Login', this.onButtonPress, true)}
        </CardSection>

        <Text style={styles.orStyle}>
          Or
        </Text>

        <CardSection>
          {this.renderButton('Register', this.gotoRegister, false)}
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
  const { email, password, error, loading } = state.auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  resetAttr,
  friendsReset
})(LoginForm);
