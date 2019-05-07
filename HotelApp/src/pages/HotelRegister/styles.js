import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secundary,   
  },
  formContainer:{
    marginHorizontal: metrics.baseMargin*2,
    marginTop: metrics.baseMargin * 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },

  text: {
    textAlign: 'center',
    marginTop: metrics.baseMargin,
    fontSize: 15,
    color: colors.light,
    lineHeight: 21,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  form: {
    marginTop: metrics.baseMargin * 2,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    paddingHorizontal: metrics.basePadding,
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: metrics.baseRadius,
    height: 44,
    marginTop: metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonBack: {
    backgroundColor: colors.secundary,
    borderRadius: metrics.baseRadius,
    height: 44,
    marginTop: metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIsHotel:{
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
  },
  checkBox: {  
    height: 22,
    width: 22,
    marginRight: 10,
  },
  isHotelText:{
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft:10,
  }
});

export default styles;
