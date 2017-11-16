import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './common';

class FriendsList extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Text>Friends</Text>
        </CardSection>
      </Card>
    );
  }
}

export default FriendsList;
