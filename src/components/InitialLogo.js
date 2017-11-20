import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { verifyIfUserLogged } from '../actions';

class InitialLogo extends React.Component {
  componentWillMount() {
    this.props.verifyIfUserLogged();
  }

  render() {
    return (
      <View>
        <Text>logo</Text>
      </View>
    );
  }
}

export default connect(null, { verifyIfUserLogged })(InitialLogo);
