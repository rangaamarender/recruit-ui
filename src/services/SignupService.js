// SignupService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Your API base URL

class SignupService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async signupUser(userData) {
    try {
      const response = await this.api.post('/signup', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async savePersonalDetails(personalData) {
    try {
      const response = await this.api.post('/personal', personalData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async saveCompanyDetails(companyData) {
    try {
      const response = await this.api.post('/company', companyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SignupService;
