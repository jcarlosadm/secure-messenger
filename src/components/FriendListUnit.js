import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import {
  chooseFriend
} from '../actions';

class FriendListUnit extends React.Component {
  render() {
    const { name, email } = this.props.friend;

    return (
      <CardSection>
        <TouchableOpacity onPress={() => this.props.chooseFriend(this.props.friend)}>
          <Text style={styles.textStyle}>{name} ({email})</Text>
        </TouchableOpacity>
      </CardSection>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25
  }
});

export default connect(null, { chooseFriend })(FriendListUnit);
