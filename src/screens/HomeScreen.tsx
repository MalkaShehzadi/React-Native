import React, { useState } from 'react';
import { View, Text, FlatList, Button, ScrollView, ActivityIndicator } from 'react-native';
import useQuranData from '../hooks/useQuranData';
import axios from 'axios';

const HomeScreen = () => {
  const { data, loading } = useQuranData('https://api.alquran.cloud/v1/surah');
  const [verses, setVerses] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

  const fetchSurahVerses = async (surahId: number) => {
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
      setVerses(response.data.data.ayahs);
      setSelectedSurah(surahId);
    } catch (error) {
      console.error('Error fetching verses:', error);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.number.toString()}
            renderItem={({ item }) => (
              <Button
                title={item.englishName}
                onPress={() => fetchSurahVerses(item.number)}
              />
            )}
          />
          {selectedSurah && (
            <View>
              <Text>Verses of Surah {selectedSurah}</Text>
              {verses.map((verse, index) => (
                <Text key={index}>{verse.text}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
