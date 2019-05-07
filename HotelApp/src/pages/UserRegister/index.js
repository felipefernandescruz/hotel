import React, { Component } from 'react';
import api from '~/services/api';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

class UserRegister extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
    isHotel: false,
    loading: false,
    error: false,
  };

  userRegister = async (name, email, password, isHotel) => {
    const response = await api.post('/users', {
      name: name,
      email: email,
      password: password,
      isHotel: isHotel
    })

    return response;
  };



  goToWelcomePage = () => {
    const { navigation } = this.props;

    navigation.navigate('Welcome');
  }

  onSubmit = async () => {
    const { name, email, password, isHotel } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });
    try{
      const response = await this.userRegister(name, email, password, isHotel);

      navigation.navigate('Welcome');
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { name, email, password, isHotel, loading, error } = this.state;
    return (
      <View style={styles.container}>
         <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Cadastrar</Text>
        {error && <Text style={styles.error}>Formulário incorretas</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu nome"
            underlineColorAndroid="transparent"
            value={name}
            onChangeText={text => this.setState({ name: text })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu email"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={text => this.setState({ email: text })}
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
          <View style={styles.checkIsHotel}>
            <CheckBox 
              style={styles.checkBox}
              checked={this.state.isHotel} 
              onPress={()=> this.setState({isHotel: !this.state.isHotel})}
            />
            <Text style={styles.isHotelText}>Sou Hotel</Text>
          </View>       

        </View>



        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBack} onPress={this.goToWelcomePage}>
          <Text style={styles.buttonText}>Já possuo uma conta</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default UserRegister;
