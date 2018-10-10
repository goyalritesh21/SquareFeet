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
const styles = require('./Styles');
const colors = require('./colors');
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleClick = (screen) => {
        this.setState({page: screen});
    };

    render() {
        if(this.state.page === 'Login') {
            return (
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('./assets/Logo.jpeg')}/>
                    </View>

                    <KeyboardAvoidingView behavior={'padding'} style={styles.formContainer}>
                        <TextInput style={styles.input}
                                   autoCapitalize="none"
                                   onSubmitEditing={() => this.passwordInput.focus()}
                                   autoCorrect={false}
                                   keyboardType='email-address'
                                   returnKeyType="next"
                                   placeholder='Email or Mobile Num'
                                   placeholderTextColor='rgba(20,20,20,0.7)'/>

                        <TextInput style={styles.input}
                                   returnKeyType="go"
                                   ref={(input) => this.passwordInput = input}
                                   placeholder='Password'
                                   placeholderTextColor='rgba(20,20,20,0.7)'
                                   secureTextEntry/>

                        <TouchableOpacity style={styles.MobileButtonContainer}
                                          onPress={this.handleClick.bind(this, 'Login')}>
                            <Text style={styles.buttonText}> Sign In </Text>
                        </TouchableOpacity>
                        <View style={styles.TextContainer}>
                            <TouchableOpacity>
                                <Text style={{color: '#2980b6', textDecorationLine: 'underline'}}>Forgot Password?</Text>
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