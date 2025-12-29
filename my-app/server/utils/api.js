import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Compute a development API base URL that works across simulators/emulators/devices.
// - On iOS simulator: localhost works.
// - On Android emulator: use 10.0.2.2 to reach host machine.
// - On a physical device when running Expo: use the dev machine's LAN IP (expo provides it via debuggerHost).
const resolveDevHost = () => {
  // Try to read the debugger host that Expo injects (e.g. "192.168.1.2:8081").
  const debuggerHost = Constants.manifest?.debuggerHost || Constants.debuggerHost;
  const hostFromDebugger = debuggerHost ? String(debuggerHost).split(':')[0] : null;

  if (hostFromDebugger) {
    // On Android emulator, localhost won't reach the host machine; map it accordingly.
    if (Platform.OS === 'android' && (hostFromDebugger === 'localhost' || hostFromDebugger === '127.0.0.1')) {
      return '10.0.2.2';
    }
    return hostFromDebugger;
  }

  // Fallbacks
  if (Platform.OS === 'android') return '10.0.2.2';
  return 'localhost';
};

const API_BASE_URL = `http://${resolveDevHost()}:3000/api`;

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authtoken');
    return token;
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
};

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('authtoken', token);
    return token;
  } catch (error) {
    console.error('Token cannot be saved', error);
    return null;
  }
};

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    // attach JWT if available
    const token = await getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// login and signup
export const authApi = {
  signup: async (name, email, password) => {
    return apiRequest('/auth/signup', 'POST', { name, email, password });
  },

  login: async (email, password) => {
    return apiRequest('/auth/login', 'POST', { email, password });
  },
};