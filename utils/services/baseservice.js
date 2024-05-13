

import { useState, useCallback } from 'react';
import axios from 'axios';
import {BASE_API_URL} from "@env"


const useApi = () => {
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

  const post = useCallback(async (url, data = {}, customHeaders = {}) => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.post(url, data, { headers: { ...api.defaults.headers, ...customHeaders } });
      return response.data;
    } catch (error) {
        console.log(error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [api]);

  return { loading, error, get, post };
};

export default useApi;