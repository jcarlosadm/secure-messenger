import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input, Spinner } from './common';
import { friendEmailChanged, addFriend, friendReset } from '../actions';

class NewFriendForm extends React.Component {
  componentWillMount() {
    this.props.friendReset();
  }

  friendEmailChange(text) {
    this.props.friendEmailChanged(text);
  }

  addFriend() {
    this.props.addFriend({
      user: this.props.user,
      friendEmail: this.props.email
    });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return <Button onPress={this.addFriend.bind(this)}>Add Friend</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='email'
            placeholder='email@provider.com'
            onChangeText={this.friendEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
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
  }
});

const mapStateToProps = (state) => {
  const { email, error, loading } = state.newFriend;
  const { user } = state.auth;

  return { email, error, loading, user };
};

export default connect(mapStateToProps, {
  friendEmailChanged,
  addFriend,
  friendReset
})(NewFriendForm);
