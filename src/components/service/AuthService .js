class AuthService {

    setToken(token) {
        localStorage.setItem("token", JSON.stringify(token));
    }

    getToken() {
        return JSON.parse(localStorage.getItem("token"));
    }

    getAuthHeader() {
        return { headers: { Authorization: 'Bearer ' + this.getUserInfo() } };
    }

    logOut() {
        localStorage.removeItem("token");
    }
}

export default new AuthService();