import React from 'react';
import {
    Text,
    TextInput,
    View,
    Image,
    BackHandler,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    Alert,
    ScrollView,
    StyleSheet
} from 'react-native';
import App from './App';

const styles = require('./Styles');
const colors = require('./colors');
const emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'SignUp',
            name: null,
            email: null,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
    }

    goBack = (screen) => {
        this.setState({page: screen});
        return true;
    };

    isValidName() {
        if (this.state.name == null) {
            return false;
        }
        return this.state.name.length > 2;
    }

    handleClick = (screen) => {
        this.setState({page: screen});
    };

    handleSignUp = () => {
        const errors = [];
        if (!this.isValidName()) {
            errors.push('Name is invalid.');
        }
        if (this.state.email == null || !this.state.email.match(emailre)) {
            errors.push('Invalid Email!')
        }
        if(this.passwordInput.valueOf() !== this.confirmPasswordInput.valueOf()){
            errors.push("Passwords don't match!");
        }
        if(errors.length >0){
            const message = errors.join('\n');
            Alert.alert(message);
        }
    };

    render() {
        if (this.state.page === 'SignUp') {
            return (
                <View style={styles.container}>
                    <StatusBar backgroundColor={colors.statusBarLight} barStyle="dark-content"/>
                    <View style={styles.logoContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('./assets/Logo.jpeg')}/>
                    </View>
                    <View style={{flex:3}}>
                        <KeyboardAvoidingView enabled={true} behavior={"padding"} style={styles.SignUpContainer}>
                            <TextInput style={styles.input}
                                       autoCapitalize="none"
                                       onChangeText={(name) => this.setState({name})}
                                       onSubmitEditing={() => this.emailInput.focus()}
                                       autoCorrect={false}
                                       returnKeyType="next"
                                       placeholder='Full Name'
                                       placeholderTextColor='rgba(20,20,20,0.7)'/>
                            <TextInput style={styles.input}
                                       autoCapitalize="none"
                                       ref={(input) => this.emailInput = input}
                                       onChangeText={(email) => this.setState({email})}
                                       onSubmitEditing={() => this.passwordInput.focus()}
                                       autoCorrect={false}
                                       keyboardType='email-address'
                                       returnKeyType="next"
                                       placeholder='Email'
                                       placeholderTextColor='rgba(20,20,20,0.7)'/>
                            <TextInput style={styles.input}
                                       returnKeyType="next"
                                       onSubmitEditing={() => this.confirmPasswordInput.focus()}
                                       ref={(input) => this.passwordInput = input}
                                       placeholder='Password'
                                       placeholderTextColor='rgba(20,20,20,0.7)'
                                       secureTextEntry/>
                            <TextInput style={styles.input}
                                       returnKeyType="go"
                                       ref={(input) => this.confirmPasswordInput = input}
                                       placeholder='Confirm Password'
                                       placeholderTextColor='rgba(20,20,20,0.7)'
                                       secureTextEntry/>
                            <TouchableOpacity style={styles.MobileButtonContainer}
                                              onPress={this.handleSignUp}>
                                <Text style={styles.buttonText}> Sign Up </Text>
                            </TouchableOpacity>
                            <View style={styles.TextContainer}>
                                <Text style={{color: '#777'}}>Or</Text>
                            </View>
                            <TouchableOpacity style={styles.GoogleButtonContainer}
                                              onPress={this.handleClick.bind(this, 'SignUp')}>
                                <Text style={{color: '#fff'}}>Continue with Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.FbButtonContainer}
                                              onPress={this.handleClick.bind(this, 'SignUp')}>
                                <Text style={{color: '#fff'}}>Continue with Facebook</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
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
