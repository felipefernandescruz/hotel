import React from 'react';
import PropTypes from 'prop-types';

import { Image, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'

import styles from './styles';

const HotelItem = ({ hotel, navigation }) => {
  return(
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>{hotel.name}</Text>
                  <Text note>{hotel.owner.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: hotel.picture}} style={{height: 200, width: null, flex: 1}}/>
              
            </CardItem>
            <CardItem>      
            <Text>Descrição: {hotel.description}</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>{hotel.classification} Likes</Text>
                </Button>
              </Left>
              <Body>
                  <Text>{hotel.city}</Text>
              </Body>
              <Right>
                <Text>Preço: {hotel.price}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Button style={styles.button} onPress={()=> navigation.navigate('Quarto',{itemId:hotel._id})} >
                <Text>Reservar</Text>
              </Button>
            </CardItem>
          </Card>
)}



HotelItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    city: PropTypes.string,
    classification: PropTypes.number,
    price: PropTypes.number,
    vacancy: PropTypes.number
  }).isRequired,
};

export default HotelItem;
