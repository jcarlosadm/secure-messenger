import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class MessageWindow extends React.Component {
  componentWillMount() {
    Actions.refresh({ title: this.props.title });
  }

  render() {
    return (
      <View>
        <Text>Hi!</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { title } = state.message;

  return { title };
};

export default connect(mapStateToProps, {})(MessageWindow);
