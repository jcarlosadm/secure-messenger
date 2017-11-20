import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CardSection } from './common';

class FriendListUnit extends React.Component {
  render() {
    const { name, email } = this.props.friend;

    return (
      <CardSection>
        <TouchableOpacity onPress={() => console.log('hi!')}>
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

export default FriendListUnit;
