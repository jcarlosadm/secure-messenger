import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { verifyIfUserLogged } from '../actions';
import { Card, CardSection } from './common';
import Logo from '../images/logo.png';

class InitialLogo extends React.Component {
  componentWillMount() {
    this.props.verifyIfUserLogged();
  }

  render() {
    return (
      <Card>
        <CardSection
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Image source={Logo} />
        </CardSection>
      </Card>
    );
  }
}

export default connect(null, { verifyIfUserLogged })(InitialLogo);
