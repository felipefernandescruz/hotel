import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {DatePicker, Card, CardItem, Text, Left, Body, Right} from 'native-base';
import api from '~/services/api';
import Header from '~/components/header';
import styles from './styles';

export default class ConfirmarQuarto extends Component {
  state = {
    itemId: '',
    date: new Date(),
    valor: 0,
    card: '',
    data: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.getRoomById();
  }

  getRoomById = async () => {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const date = navigation.getParam('date', 'NO-DATE');
    const valor = navigation.getParam('valor', 0);

    this.setState({ refreshing: true, itemId, date, valor });
    const { data } = await api.get(`/hotel/${itemId}`);
    this.setState({ data, loading: false, refreshing: false });
    console.tron.log(data);
  };

  pagar = async () => {
    const { itemId, date } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });
    try {
      const response = await this.rentRoom(itemId, date);
      navigation.navigate('User');
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  rentRoom= async (hotel, date) => {
    const response = await api.post('/rent', {
      hotelId: hotel,
      dateRent: date,
    })
    
    return response;
  };
  cardDetails=()=>{
    const { data, date, valor } = this.state;
      return(
        <Card>
        <CardItem>
            <Left>
                <Body>
                    <Text>{data.name}</Text>
                    <Text note>{data.owner.name}</Text>
                </Body>
            </Left>
        </CardItem>
        <CardItem cardBody>
            <Image source={{uri: data.picture}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
            <Text>Descrição: {data.description}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Text>Data da Reserva:</Text>
            <Text>{date.toString().substr(4, 12)}</Text>
          </Left>
          <Right>
          <Text>Valor:</Text>
            <Text>{valor} Reais</Text>
          </Right>
        </CardItem>
    </Card>
  )
}

  render() {
    const {loading, card} = this.state;
    return (
      <View style={styles.container}>
        <Header title="Quarto" />
        {loading ? <ActivityIndicator style={styles.loading}/> : this.cardDetails()
        }

      <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Pagamento"
          underlineColorAndroid="transparent"
          value={card}
          onChangeText={text => this.setState({ card: text })}
        />

        <TouchableOpacity style={styles.button} onPress={this.pagar}>
            <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>   
      </View>
    );
  }
}
