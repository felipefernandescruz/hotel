import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import '~/config/ReactontronConfig';

import createNavigator from './routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Hotel:token');
    const hotel = await AsyncStorage.getItem('@Hotel:ishotel');
    console.tron.log(hotel);
    this.setState({
      userChecked: true,
      userLogged: !!username,
      isHotel: !! hotel
    });
  }

  render() {
    const { userChecked, isHotel, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigator(userLogged, isHotel);
    return <Routes />;
  }
}
