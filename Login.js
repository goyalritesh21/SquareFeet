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
    StatusBar
} from 'react-native';
import App from './App';
import user from './user';
const styles = require('./Styles');
const colors = require('./colors');
const md5 = require('md5');
const emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email_mob: null,
            email: null,
            mobile: null,
            password: null,
            page: 'Login'
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
    }

    goBack = (screen) => {
        this.setState({page: screen});
        return true;
    };

    handleLogin = () => {
        const errors = [];
        if (this.state.mobileNumber == null || !this.state.mobileNumber.match(/[0-9]{10,10}/)) {
            errors.push('Mobile is invalid.');
        }

        if (this.state.email == null || !this.state.email.match(emailre)) {
            errors.push('Email is invalid.');
        }

        if (errors.length > 0) {
            const message = errors.join('\n');
            this.setState({disabled: true, error: true, message: message});
            Alert.alert(message);
            return;
        }

        const newUser = {
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password,
        };
        this.setState({user: newUser});
        if (this.state.password != null) {
            user.login(newUser, {
                onSuccess: (user) => {
                    global.loggedIn = true;
                    global.user = user;
                    AsyncStorage.setItem('loggedIn', 'true', () => {
                        AsyncStorage.setItem('user', JSON.stringify(user));
                        if (this.props.from === 'Home') {
                            this.setState({page: 'Dashboard', user: user})
                        }
                    });
                },
                onFailed: (error) => {
                    if (error.message)
                        Alert.alert(error.message);
                    else if (error.ACK)
                        Alert.alert('Invalid email/ mobile!');
                    else
                        Alert.alert("Check your internet connection.")

                    this.setState({loggingIn: false})
                }

            });

            this.setState({loggingIn: true})
        } else {
            Alert.alert("No Pecfest ID entered.")
        }
    };

    render() {
        if (this.state.page === 'Login') {
            return (
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('./assets/Logo.jpeg')}/>
                    </View>

                    <KeyboardAvoidingView behavior={'padding'} style={styles.formContainer}>
                        <TextInput style={styles.input}
                                   autoCapitalize="none"
                                   onSubmitEditing={() => this.passwordInput.focus()}
                                   onChangeText={(email_mob) => {
                                       if (email_mob.match(emailre)){
                                           this.setState({email: email_mob});
                                       }
                                       else if (email_mob.match(/[0-9]{10,10}/)) {
                                           this.setState({mobile: email_mob})
                                       }
                                   }
                                   }
                                   autoCorrect={false}
                                   keyboardType='email-address'
                                   returnKeyType="next"
                                   placeholder='Email or Mobile Num'
                                   placeholderTextColor='rgba(20,20,20,0.7)'/>

                        <TextInput style={styles.input}
                                   returnKeyType="go"
                                   ref={(input) => this.passwordInput = input}
                                   onChangeText={(password) => this.setState({password: md5(password)})}
                                   placeholder='Password'
                                   placeholderTextColor='rgba(20,20,20,0.7)'
                                   secureTextEntry/>

                        <TouchableOpacity style={styles.MobileButtonContainer}
                                          onPress={this.handleLogin}>
                            <Text style={styles.buttonText}> Sign In </Text>
                        </TouchableOpacity>
                        <View style={styles.TextContainer}>
                            <TouchableOpacity>
                                <Text style={{color: '#2980b6', textDecorationLine: 'underline'}}>Forgot
                                    Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            );
        }
        else {
            return (
                <App/>
            );
        }
    }
}