import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import {AsyncStorage} from 'react-native';

import Welcome from '~/pages/Welcome';
import UserRegister from '~/pages/UserRegister';
import Repositories from '~/pages/Repositories';
import Organizations from '~/pages/Organizations';
import HotelRegister from '~/pages/HotelRegister';
import { colors } from '~/styles';

const Routes = (userLogged = false, isHotel) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome,
      UserRegister,
      User: createBottomTabNavigator({
        Repositories,
        Organizations,
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
    },
    {
      initialRouteName: userLogged 
      ? isHotel ? 'HotelRegister' :'User' 
      : 'Welcome',
    },
  ),
);

export default Routes;
