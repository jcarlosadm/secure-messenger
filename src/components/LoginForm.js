import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends React.Component {
  emailChange(text) {
    this.props.emailChanged(text);
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
        </CardSection>

        <Text>
        </Text>

        <CardSection>
          <Button>
            Login
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { email } = state.auth;

  return { email };
};

export default connect(mapStateToProps, { emailChanged })(LoginForm);
