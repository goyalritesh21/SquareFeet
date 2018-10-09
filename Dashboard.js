import React from 'react';
import {
    Text,
    TextInput,
    View,
    Image,
    BackHandler,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    StyleSheet
} from 'react-native';
import App from './App';

const styles = require('./Styles');
const colors = require('./colors');

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page : 'Dashboard',
        };
    }
    render() {
        if(this.props.loggedIn === true && this.state.page === 'Dashboard')
        return (
            <View style={styles.container}>
                <View style={styles.PaymentsListContainer}>
                    <Text> Hello! All due payments will show up here.</Text>
                </View>
                <View style={styles.PayNowContainer}>
                    <Text>Hello! Pay Now button will show up here.</Text>
                </View>
            </View>
        );
    }
}