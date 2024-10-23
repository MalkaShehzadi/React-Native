import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useQuranData = (endpoint: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check AsyncStorage for stored data
        const storedData = await AsyncStorage.getItem(endpoint);
        if (storedData) {
          setData(JSON.parse(storedData));  // Load data from local storage
        }

        const response = await axios.get(endpoint);
        setData(response.data.data);
        await AsyncStorage.setItem(endpoint, JSON.stringify(response.data.data));  // Save data to AsyncStorage
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useQuranData;
