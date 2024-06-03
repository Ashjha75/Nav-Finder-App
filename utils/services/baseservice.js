

import { useState, useCallback } from 'react';
import axios from 'axios';
// import {BASE_API_URL} from "@env"


const useApi = () => {
  const BASE_API_URL='https://nav-finder-backend.onrender.com/api/v1'
  // const BASE_API_URL='http://192.168.1.8:8000/api/v1'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const get = useCallback(async (url, params = {}, customHeaders = {}) => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.get(url, { params, headers: { ...api.defaults.headers, ...customHeaders } });
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const put = useCallback(async (url, data = {}, customHeaders = {}) => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.put(url, data, { headers: { ...api.defaults.headers, ...customHeaders } });
      return response?.data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api]);
  const post = useCallback(async (url, data = {}, customHeaders = {}) => {
<<<<<<< HEAD
=======
    
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
    setError(null);
    setLoading(true);
    try {
      const response = await api.post(url, data, { headers: { ...api.defaults.headers, ...customHeaders } });
      return response?.data;
<<<<<<< HEAD
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api]);
  const deleteApi = useCallback(async (url, data = {}, customHeaders = {}) => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.delete(url, data, { headers: { ...api.defaults.headers, ...customHeaders } });
      return response?.data;
=======
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api]);

  return { loading, error, get, post ,deleteApi,put};
};

export default useApi;