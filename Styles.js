'use strict';
import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

const React = require('react-native');
const colors = require('./colors');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    SignUpContainer: {
        flexGrow: 3,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    PaymentsListContainer: {
        flexGrow: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    PayNowContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    formContainer: {
        flex: 2,
        padding: 20,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#111',
        width: Dimensions.get('window').width - 32,
    },
    MobileButtonContainer:{
        backgroundColor: colors.gold,
        padding: 10,
        marginBottom: 15,
        width: Dimensions.get('window').width - 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextContainer: {
        width: Dimensions.get('window').width - 32,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    GoogleButtonContainer:{
        backgroundColor: colors.red,
        padding: 10,
        marginBottom: 15,
        width: Dimensions.get('window').width - 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    FbButtonContainer:{
        backgroundColor: colors.blue,
        padding: 10,
        marginBottom: 15,
        width: Dimensions.get('window').width - 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        color: '#000',
        textAlign: 'center',
        fontWeight: '700'
    }
});

module.exports = styles;