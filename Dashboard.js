import React, {Component} from 'react';
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

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            page : 'Dashboard',
            exitBack: false,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
    }

    goBack = (screen) => {
        this.setState({page: 'Home'});
        Alert.alert(
            'Logout',
            'Are you sure, you want to logout?',
            [
              {text: 'Cancel', onPress: () => this.setState({loggedIn: true}), style: 'cancel'},
              {text: 'OK', onPress: () => {

                  this.setState({loggedIn: false});
                }
              },
            ],
            { cancelable: false }
          )
        return true;

    };

    render() {
        if(this.props.loggedIn === true && this.state.page === 'Dashboard') {
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
        else if (this.props.loggedIn === false && this.state.page === 'Dashboard') {
            Alert.alert('You are not logged in. Please login.');
            return (
                <App/>
            );
        } 
        else {
            return (
                <App/>
            );
        }
    }
}