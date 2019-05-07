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
import Header from '~/components/header';

class HotelRegister extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    name: '',
    description: '',
    picture: '',
    city: '',
    classification: 1,
    price: 1.0,
    vacancy:1,
    loading: false,
    error: false,
  };

  hotelRegister = async (name, description, picture, city, classification, price, vacancy) => {
    console.tron.log(classification)
    
    const response = await api.post('/hotel', {
      name: name,
      description: description,
      picture: picture,
      city: city,
      classification: classification,
      price: price,
      vacancy:vacancy
    })
    
    return response;
  };


  onSubmit = async () => {
    const { name, description, picture, city, classification, price, vacancy } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });
    try{
      const response = await this.hotelRegister(name, description, picture, city, classification, price, vacancy);
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { name, description, picture, city, classification, price, vacancy, loading, error } = this.state;
    return (
      <View style={styles.container}>
         <Header title="Novo Quarto" />
         <View style={styles.formContainer}>      
        <View style={styles.form}>
        {error && <Text style={styles.error}>Formulário incorreto</Text>}
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
            placeholder="Digite uma descrição"
            underlineColorAndroid="transparent"
            value={description}
            onChangeText={text => this.setState({ description: text })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Informe a uri da imagem"
            underlineColorAndroid="transparent"
            value={picture}
            onChangeText={text => this.setState({ picture: text })}
          />
          
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Informe a cidade"
            underlineColorAndroid="transparent"
            value={city}
            onChangeText={text => this.setState({ city: text })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="number-pad"
            autoCorrect={false}
            placeholder="Classificação"
            underlineColorAndroid="transparent"
            value={classification}
            onChangeText={number => this.setState({ classification: number })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="decimal-pad"
            autoCorrect={false}
            placeholder="Preço"
            underlineColorAndroid="transparent"
            value={price}
            onChangeText={number => this.setState({ price: number })}
          />

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="number-pad"
            autoCorrect={false}
            placeholder="Vagas"
            underlineColorAndroid="transparent"
            value={vacancy}
            onChangeText={number => this.setState({ vacancy: number })}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HotelRegister;
