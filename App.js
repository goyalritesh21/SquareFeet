import React from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    BackHandler,
    TouchableOpacity,
    StatusBar} from 'react-native';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
const styles = require('./Styles');
const colors = require('./colors');
export default class App extends React.Component {
    state = {
        page: 'Home',
        signedIn: false,
        done: false,
    };
    handleClick = (screen) => {
        this.setState({page: screen});
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', BackHandler.exitApp);
    }

    render() {
        if(this.state.page === 'Home') {
            return (
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('./assets/Logo.jpeg')}/>
                    </View>

                    <View style={styles.formContainer}>
                        <TouchableOpacity style={styles.MobileButtonContainer}
                                          onPress={this.handleClick.bind(this, 'Login')}>
                            <Text style={{color: '#222'}}>Already a member? Sign In</Text>
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={styles.GoogleButtonContainer}*/}
                                          {/*onPress={this.handleClick.bind(this, 'GSignIn')}>*/}
                            {/*<Text style={{color: '#fff'}}>Sign In with Google</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity style={styles.FbButtonContainer}*/}
                                          {/*onPress={this.handleClick.bind(this, 'FBSignIn')}>*/}
                            {/*<Text style={{color: '#fff'}}>Sign In with Facebook</Text>*/}
                        {/*</TouchableOpacity>*/}
                        <View style={styles.TextContainer}>
                            <Text>Don't have accout?</Text>
                            <TouchableOpacity onPress={this.handleClick.bind(this, 'SignUp')} >
                                <Text style={{color: '#2980b6', textDecorationLine: 'underline'}}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
        else if(this.state.page === 'Login') {
            return (
                <Login from={'Home'}/>
            );
        }
        else if (this.state.page === 'SignUp') {
            return (
                <SignUp from={'Home'}/>
            );
        }
        else {
            return (
                <Dashboard from={'Home'} loggedIn={true}/>
            );
        }
    }
}
