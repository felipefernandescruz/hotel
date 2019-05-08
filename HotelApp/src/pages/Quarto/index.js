import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image,TextInput,ActivityIndicator, FlatList } from 'react-native';
import {Container, Content, DatePicker, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right} from 'native-base'
import api from '~/services/api';

import Header from '~/components/header';
import styles from './styles';

export default class Quarto extends Component {
    state = {
        name: '',
        description: '',
        picture: '',
        city: '',
        classification: 1,
        price: 1.0,
        vacancy:1,
        dateRent: new Date(),
        loading: true,
        refreshing:false,
    };

      async componentDidMount() {
        this.getRoomById();
      }

      confirmPage = () => {
        const { navigation } = this.props;
        const { data, dateRent } = this.state;
        console.tron.log(data);
        navigation.navigate('ConfirmarQuarto',{itemId:data._id, date: dateRent, valor: data.price});
      }
      setDate=(newDate) => {
        this.setState({ dateRent: newDate });
      }

      getRoomById = async () =>{
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');

        this.setState({ refreshing:true });
        const { data } = await api.get(`/hotel/${itemId}`);
        this.setState({ data, loading: false, refreshing:false });
      }

      cardDetails=()=>{
        const { data } = this.state;
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
                    <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>{data.classification} Likes</Text>
                    </Button>
                </Left>
                <Body>
                    <Text>{data.city}</Text>
                </Body>
                <Right>
                    <Text>Preço: {data.price}</Text>
                </Right>
            </CardItem>
        </Card>
      )
    }
      render() {
        const { loading, filter} = this.state;
        return (
            <View style={styles.container}>
                <Header title="Quarto" />
                {loading ? <ActivityIndicator style={styles.loading}/> : this.cardDetails()
                }
                <View style={styles.form}>
                <Text>Data da reserva:</Text>
                <DatePicker
                    style={styles.datePicker}
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    maximumDate={new Date(2020, 12, 31)}
                    locale={"pt"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText="Data inicial"
                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                    onDateChange={this.setDate}
                    disabled={false}
                />
                <TouchableOpacity style={styles.button} onPress={this.confirmPage}>
                    <Text style={styles.buttonText}>Reservar</Text>
                </TouchableOpacity>           
                </View>   
            </View>
        )
      }
}