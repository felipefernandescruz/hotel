import React from 'react';
import PropTypes from 'prop-types';

import { Image, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

import styles from './styles';

const ReservaItem = ({ reserva }) => (
  <Card>
    <CardItem>
      <Left>
        <Body>
          <Text>{reserva.hotelId.name}</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem cardBody>
      <Image
        source={{ uri: reserva.hotelId.picture }}
        style={{ height: 200, width: null, flex: 1 }}
      />
    </CardItem>
    <CardItem>
      <Text>
          Descrição:
        {reserva.hotelId.description}
      </Text>
    </CardItem>
    <CardItem>
      <Left>
        <Text>Data da Reserva:</Text>
        <Text>{reserva.dateRent.toString().substr(0, 10)}</Text>
      </Left>
      <Right>
        <Text>Valor:</Text>
        <Text>
          {reserva.hotelId.price}
          {' '}
Reais
        </Text>
      </Right>
    </CardItem>
  </Card>
);

ReservaItem.propTypes = {
  repository: PropTypes.shape({
    price: PropTypes.string,
    dateRent: PropTypes.string,
    picture: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
export default ReservaItem;
