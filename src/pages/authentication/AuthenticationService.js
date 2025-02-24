import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

class AuthenticationService {
  async refreshAccessToken(refreshToken) {
    try {
      const refreshTokenResponse = await axios.post(`${API_URL}/refresh`, { refresh_token: refreshToken });
      const newAccessToken = refreshTokenResponse.data.access_token;
      // Store the new access token
      this.setToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      throw new Error("Error refreshing access token");
    }
  }
  getUserDetail(){
    const token = this.getToken();
    return axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  register(user) {
    return axios.post(`${API_URL}/register/`, user);
  }

  login(credentials) {
    return axios.post(`${API_URL}/login/`, credentials);
  }

  logout() {
    localStorage.removeItem('access');
  }

  getToken() {
    return localStorage.getItem('access');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh');
  }

  setToken(token) {
    JSON.stringify(localStorage.setItem('access', token))
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  async refreshToken() {
    try {
      const response = await axios.post(`${API_URL}/refresh`, { refresh_token: this.getRefreshToken() });
      this.setToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      throw new Error("Error refreshing access token");
    }
  }

  showSessionExpiredDialog() {
    this.$q.dialog({
      title: 'Session Expired',
      message: 'Your session has expired. Please log in again.',
      ok: {
        push: true,
        handler: () => {
          // Redirect the user to the login page
          this.$router.push('LoginPage');

        }
      }
    });
  }


  async getEmployees() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await axios.get(`${API_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.showSessionExpiredDialog()
        // alert("your session hase expire please login again!")
        this.$router.push('LoginPage.vue')
        // await this.refreshToken();
        // return this.getEmployees();
      }
      //  else if (error.response && error.response.status === 422) {
      //   alert("your session hase expire please login again!")
      //   this.$router.push('/LoginPage')
      //   throw new Error('Failed to fetch employees: Unprocessable Entity');
      // } else {
      //   throw error;
      // }
    }
  }


  async apiRequestWithAuth(url, method, data) {
    const headers = { Authorization: `Bearer ${this.getToken()}` };
    try {
      const response = await axios({ url: `${API_URL}/${url}`, method, data, headers });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await this.refreshToken();
          // Retry the original request with the new access token
          const response = await axios({ url: `${API_URL}/${url}`, method, data, headers });
          return response.data;
        } catch (refreshError) {
          this.logout();
          throw new Error('Please log in again.');
        }
      } else {
        throw error;
      }
    }
  }

  async protectedRouteExample() {
    try {
      const data = await this.apiRequestWithAuth('protected', 'GET');
      console.log('Data:', data);
      return data;
    } catch (error) {
      console.log('Error:', error.message);
      alert('Error:', error.message);
      throw error;
    }
  }

  generateSecretKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secretKey = '';
    for (let i = 0; i < length; i++) {
      secretKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return secretKey;
  }
}

export default new AuthenticationService();
