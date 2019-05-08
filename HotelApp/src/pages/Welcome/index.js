import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    password: '',
    loading: false,
    error: false,
  };

  checkUserExists = async (username, password) => {
    const response = await api.post('/auth', {
      email: username,
      password: password,
    })
    
    return response;
  };

  saveToken = async (token) => {
    await AsyncStorage.setItem('@Hotel:token', token);
  };

  saveHotel = async (hotel) => {
    console.tron.log(hotel);
    if(hotel){
      await AsyncStorage.setItem('@Hotel:ishotel', 'hotel');
    }
    
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Hotel:username', username);
  };

  goToUserRegisterPage = () => {
    const { navigation } = this.props;

    navigation.navigate('UserRegister');
  }
  navigationController = (isHotel) =>{
    const { navigation } = this.props;
    if(isHotel){
      navigation.navigate('HotelRegister');
    }else{
      navigation.navigate('User');
    }
  }
  singIn = async () => {
    const { username, password } = this.state;

    this.setState({ loading: true });
    try {
      const response = await this.checkUserExists(username, password);

      await this.saveToken(response.data.token);
      await this.saveUser(response.data.user.name);
      await this.saveHotel(response.data.user.isHotel);
      this.navigationController(response.data.user.isHotel)
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { username, password, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
          Para continuar precisamos que você informe seu email e senha
        </Text>
        {error && <Text style={styles.error}>Usuário ou Senha incorretas</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite sua senha"
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.singIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonBack} onPress={this.goToUserRegisterPage}>
            <Text style={styles.buttonText}>Não possuo uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
