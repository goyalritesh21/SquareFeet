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
import SignUp from './SignUp';
const styles = require('./Styles');
const colors = require('./colors');

export default class VerifyOtp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'VerifyOtp',
            otpVerified: false,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack.bind(this, this.props.from));
    }

    goBack = (screen) => {
        this.setState({page: screen});
        return true;
    };

    verify = () => {
        this.setState({otpVerified: true});
    };

    render() {
        if(this.state.page === 'VerifyOtp') {
            return (
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('./assets/Logo.jpeg')}/>
                    </View>
                    <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
                        <TextInput  style={styles.input}
                                onChangeText={(otp) => this.setState({otp})}
                                autoCorrect={false}
                                keyboardType='phone-pad'
                                returnKeyType="go"
                                placeholder='OTP'
                                placeholderTextColor='rgba(20,20,20,0.7)'/>
                        <TouchableOpacity style={styles.MobileButtonContainer}
                                onPress={this.verify}>
                            <Text style={styles.buttonText}> Verify OTP </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            );
        }
        else if(this.state.page === 'SignUp') {
            return (
            <SignUp from={'Home'}/>
            );
        }
        else {
            return (
                <App/>
            );
        }
    }
    
}