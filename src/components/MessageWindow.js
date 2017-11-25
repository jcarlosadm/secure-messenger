import _ from 'lodash';
import React from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  fetchMessages,
  bubbleTextChanged,
  sendMessage
} from '../actions';
import MessageUnit from './MessageUnit';
import { Input, CardSection, Button, Spinner } from './common';

class MessageWindow extends React.Component {
  componentWillMount() {
    Actions.refresh({ title: this.props.title });

    this.props.fetchMessages({
      uid: this.props.user.uid,
      friendId: this.props.friendId,
      sessionKey: this.props.sessionKey,
      initVector: this.props.initVector
    });

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onButtonPress() {
    this.props.sendMessage({
      uid: this.props.user.uid,
      friendId: this.props.friendId,
      message: this.props.bubbleText,
      sessionKey: this.props.sessionKey,
      initVector: this.props.initVector
    });
  }

  bubbleTextChange(text) {
    this.props.bubbleTextChanged(text);
  }

  createDataSource({ messages }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(messages);
  }

  renderRow(message) {
    return <MessageUnit message={message} />;
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        send
      </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CardSection style={{ flex: 5 }}>
            <Input
              autoFocus
              labelStyle2={{ flex: 0 }}
              onChangeText={this.bubbleTextChange.bind(this)}
              value={this.props.bubbleText}
              returnKeyType='send'
              onSubmitEditing={this.onButtonPress.bind(this)}
              autoCorrect
            />
          </CardSection>
          <CardSection style={{ flex: 1 }}>
            {this.renderButton()}
          </CardSection>
        </View>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { title,
    friendId,
    listMessages,
    bubbleText,
    loading,
    sessionKey,
    initVector
  } = state.message;
  const { user } = state.auth;

  const messages = _.map(listMessages, (val, id) => {
    return { ...val, id };
  });
  messages.reverse();

  return {
    title,
    friendId,
    messages,
    bubbleText,
    user,
    loading,
    sessionKey,
    initVector
  };
};

export default connect(mapStateToProps, {
  fetchMessages,
  bubbleTextChanged,
  sendMessage
})(MessageWindow);
