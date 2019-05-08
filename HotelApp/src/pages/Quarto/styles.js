import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lighter,
      },
      form: {
        marginTop: metrics.baseMargin * 2,
        backgroundColor: colors.white,
        padding:metrics.basePadding
      },
      datePicker:{
        marginTop: metrics.baseMargin * 2,
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
});

export default styles;
    