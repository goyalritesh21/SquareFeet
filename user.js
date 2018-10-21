window._user = {
    currentUser: {
        name: 'global_name',
        username: 'global',
    },
    url: 'http://api.squarefeet.in/v1/',

    loggedIn: false,

    isLoggedIn() {
        if (window.localStorage) {
            if (window.localStorage.getItem('username')) {
                const username = window.localStorage.getItem('username');
                if (username.length > 1) {
                    this.currentUser.username = username
                    this.loggedIn = true;
                    return true
                }
            }
        }
        return false;
    },

    logout(userId, callback) {
        if (window.localStorage) {
            if (window.localStorage.getItem('username')) {
                window.localStorage.setItem('username', '')
                this.loggedIn = false;
                setTimeout(callback);
            }
        }
    },

    loginLocal(user) {
        this.currentUser = user;
        this.loggedIn = true;
        if (typeof window.localStorage !== 'undefined') {
            window.localStorage.setItem('username', user.username)
        }
    },

    login(userData, config) {
        fetch(api.url + 'user/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(res => {
                if (res.ACK !== 'SUCCESS') {
                    config.onFailed(res);
                    return;
                }
                config.onSuccess(res);
            })
            .catch(err => {
                config.onFailed(err);
            })
    },

    signUp(data, config) {
        fetch(api.url + 'user/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(data => data.json())
            .then(res => {
                if (res.ACK !== 'SUCCESS') {
                    config.onFailed(res);
                    return;
                }
                config.onSuccess(res);
            })
            .catch(err => {
                config.onFailed(err);
            })
    },

    verifyOtp(otp, mobile, config) {
        fetch(api.url + 'user/verify', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({otp, mobile}),
        })
            .then(data => data.json())
            .then(res => {
                if (res.ACK !== 'SUCCESS') {
                    config.onFailed(res);
                    return;
                }

                this.loginLocal(res);
                config.onSuccess(res.username);
            })
            .catch(err => {
                console.log("This should not happen");
                config.onFailed(err);
            })
    },

    checkVerified(mobile, config) {
        fetch(api.url + 'user/isVerified', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mobile}),
        })
            .then(data => data.json())
            .then(json => {
                console.log(json.ACK + ' CheckVerified');
                if (json.ACK !== 'SUCCESS') {
                    config.onFailed()
                    return
                }

                config.onSuccess(json.verified)
            })
            .catch(config.onFailed)
    },
};

let user = window._user;

export default user;