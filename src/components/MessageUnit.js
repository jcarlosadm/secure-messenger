import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class MessageUnit extends React.Component {
  renderMessage() {
    let backgroundColor = 'white';
    if (this.props.message.owner === this.props.friendId) {
      backgroundColor = '#aecbf9';
    }

    return (<Text style={{ backgroundColor }}>
      [{this.props.message.timestamp}] {this.props.message.message} ({this.props.message.owner})
            </Text>);
  }

  render() {
    return (
      <View>
        {this.renderMessage()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { friendId } = state.message;

  return { friendId };
};

export default connect(mapStateToProps, {})(MessageUnit);
