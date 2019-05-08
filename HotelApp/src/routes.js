import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import {AsyncStorage} from 'react-native';

import Welcome from '~/pages/Welcome';
import UserRegister from '~/pages/UserRegister';
import HotelRegister from '~/pages/HotelRegister';
import Hoteis from '~/pages/Hoteis';
import Quarto from '~/pages/Quarto';
import ConfirmarQuarto from '~/pages/ConfirmarQuarto';
import MinhasReservas from '~/pages/MinhasReservas';

import { colors } from '~/styles';

const Routes = (userLogged = false, isHotel) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome,
      UserRegister,
      User: createBottomTabNavigator({
        Hoteis,
        MinhasReservas,
      }, {
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          activeTintColor: colors.white,
          inactiveTintColor: colors.whiteTransparent,
          style: {
            backgroundColor: colors.secundary,
          },
        },
      }),
      HotelRegister,
      Quarto,
      ConfirmarQuarto,
    },
    {
      initialRouteName: userLogged 
      ? isHotel ? 'HotelRegister' :'User' 
      : 'Welcome',
    },
  ),
);

export default Routes;
