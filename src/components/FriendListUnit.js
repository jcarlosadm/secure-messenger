import React from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class FriendListUnit extends React.Component {
  render() {
    const { id } = this.props.friend;

    return (
      <CardSection>
        <View>
          <Text>{id}</Text>
        </View>
      </CardSection>
    );
  }
}

export default FriendListUnit;
