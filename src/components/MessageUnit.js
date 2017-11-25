import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class MessageUnit extends React.Component {
  getViewStyle(color, flex, left, right) {
    return {
      marginLeft: left,
      marginRight: right,
      borderRadius: 10,
      flex: 1,
      justifyContent: flex,
      backgroundColor: color
    };
  }

  getDateAndTime(timestamp) {
    const date = new Date();
    date.setTime(timestamp);
    return `${date.toDateString()} - ${date.toTimeString().split(' ')[0]}`;
  }

  renderMessage() {
    let backgroundColor = 'white';
    let flex = 'flex-start';
    let left = 0;
    let right = 40;
    if (this.props.message.owner === this.props.friendId) {
      backgroundColor = '#aecbf9';
      flex = 'flex-end';
      left = 40;
      right = 0;
    }

    return (
      <CardSection>
        <View style={this.getViewStyle(backgroundColor, flex, left, right)}>
          <Text>
            ({this.getDateAndTime(this.props.message.timestamp)})
          </Text>
          <Text style={styles.textStyle}>
            {this.props.message.message}
          </Text>
        </View>
      </CardSection>);
  }

  render() {
    return (
      <Card>
        {this.renderMessage()}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  const { friendId } = state.message;

  return { friendId };
};

export default connect(mapStateToProps, {})(MessageUnit);
