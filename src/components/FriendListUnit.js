import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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

const winWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    width: (winWidth - 10),
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: '#e6ecf7'
  }
});

export default connect(null, { chooseFriend })(FriendListUnit);
