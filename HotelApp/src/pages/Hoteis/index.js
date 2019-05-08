import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, TouchableOpacity,TextInput, Text,ActivityIndicator, FlatList } from 'react-native';
import {Card, CardItem} from 'native-base'
import api from '~/services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/header';
import HotelItem from './HotelItem';
import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Hoteis extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    filter:false,
    name: '',
    data: [],
    price_min:0,
    price_max:1000000,
    classification_min:0,
    city: '',
    loading: true,
    refreshing:false,
  };

  async componentDidMount() {
    this.loadHoteis();
  }

  loadHoteis = async () =>{
    this.setState({ refreshing:true });

    const username = await AsyncStorage.getItem('@Hotel:username');
    const { data } = await api.get(`/hotel?city=${this.state.city}&&price_min=${this.state.price_min}&&price_max=${this.state.price_max}&&classification_min=${this.state.classification_min}`);
    this.setState({ data, loading: false, refreshing:false });
  }


  renderListItem = ({ item }) => {
    const { navigation } = this.props;
    return(
      <HotelItem hotel={item} navigation={navigation} />
    )
  };

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data.docs}
        keyExctractor={ item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadHoteis}
        refreshing={refreshing}
      />
    )
  }

  filterData = () =>{
    const {city,price_min,price_max,classification_min } = this.state;

    return(
          <Card>
          <CardItem>
            <Text>Filtros:</Text>
          </CardItem>
          <CardItem>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Cidade"
            underlineColorAndroid="transparent"
            value={city}
            onChangeText={text => this.setState({ city: text })}
          />
          </CardItem>
          <CardItem>
          <TextInput
            autoCapitalize="none"
            keyboardType="number-pad"
            autoCorrect={false}
            placeholder="Preço Minimo"
            underlineColorAndroid="transparent"
            value={price_min}
            onChangeText={text => this.setState({ price_min: text })}
          />
          </CardItem>
          <CardItem>
          <TextInput
            autoCapitalize="none"
            keyboardType="number-pad"
            autoCorrect={false}
            placeholder="Preço Máximo"
            underlineColorAndroid="transparent"
            value={price_max}
            onChangeText={text => this.setState({ price_max: text })}
          />
          </CardItem>
          <CardItem>
          <TextInput
            autoCapitalize="none"
            keyboardType="number-pad"
            autoCorrect={false}
            placeholder="Classificação"
            underlineColorAndroid="transparent"
            value={classification_min}
            onChangeText={text => this.setState({ classification_min: text })}
          />          
          </CardItem>        
          <TouchableOpacity style={styles.button} onPress={this.loadHoteis}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>   
        </Card>
    )
  }

  render() {
    const { loading, filter} = this.state
    return (
      <View style={styles.container}>
        <Header title="Hoteis" />
        <TouchableOpacity style={styles.button} onPress={()=> this.setState({filter: !this.state.filter})}>
            <Text style={styles.buttonText}>Filtro</Text>
          </TouchableOpacity>
        {filter? this.filterData(): <Text/>}
        {loading ? <ActivityIndicator style={styles.loading}/> : this.renderList()
        }
      </View>
    );
  }
}
