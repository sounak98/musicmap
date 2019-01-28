export default class Auth {

    async login(username, password) {
        // logs in user and returns token
        const resp = await fetch(`http://localhost:4000/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        });
        const data = await resp.json();
        if (resp.status == 200) {
            const user = {
                token: data.token,
                user: data.user
            };
            localStorage.setItem('jwtToken', data.token);
            return { err: null, user };
        }
        else {
            return { err: data.message, user: null };
        }
    }

    logout() {
        localStorage.removeItem('jwtToken');
    }

    async checkUsername(username) {
        // returns whether username is available or not
        const resp = await fetch(`http://localhost:4000/available?username=${username}`);
        const data = await resp.json();
        if (resp.status == 200) {
            return { err: null, res: data.message }
        }
        else {
            return { err: "could not fetch details", res: null }
        }
    }

    async signup(username, email, password) {
        // signs up a new user
        const resp = await fetch(`http://localhost:4000/signup`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'email': email
            })
        });
        const data = await resp.json();
        if (resp.status != 200) {
            return data.message;
        }
    }

    // how to handle tokens?
    async changePassword(newPassword) {
        // accesses PROTECTED route
        // changes the password of an existing user
        const resp = await fetch(`http://localhost:4000/changePassword`, {
            method: 'post',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'password': newPassword
            })
        });
        if (resp.status != 200) {
            return resp.statusText;
        }
    }

    deleteUser(token) {
        // accesses PROTECTED route
        // deletes the current user
    }
}
