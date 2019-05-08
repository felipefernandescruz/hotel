import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage, TouchableOpacity,TextInput, Text,ActivityIndicator, FlatList } from 'react-native';
import {Card, CardItem} from 'native-base'
import api from '~/services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/header';
import ReservaItem from './ReservaItem';
import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class MinhasReservas extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
    refreshing:false,
  };
  async componentDidMount() {
    this.loadReservas();
  }

  loadReservas = async () =>{
    this.setState({ refreshing:true });

    const { data } = await api.get(`/rent`);
    this.setState({ data, loading: false, refreshing:false });
  }

  renderListItem = ({ item }) => {
    const { navigation } = this.props;
    return(
      <ReservaItem reserva={item} navigation={navigation} />
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

  render() {
    const { loading, filter} = this.state
    return (
      <View style={styles.container}>
        <Header title="Minhas Reservas" />
        {filter? this.filterData(): <Text/>}
        {loading ? <ActivityIndicator style={styles.loading}/> : this.renderList()
        }
      </View>
    );
  }
}