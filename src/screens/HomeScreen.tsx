import React, { useState } from 'react';
import { View, Text, FlatList, Button, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import useQuranData from '../hooks/useQuranData';
import axios from 'axios';

const HomeScreen = () => {
  const { data, loading } = useQuranData('https://api.alquran.cloud/v1/surah');
  const [verses, setVerses] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);

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
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.number.toString()}
            renderItem={({ item }) => (
              <View style={styles.surahItem}>
                <Button
                  title={item.englishName}
                  onPress={() => fetchSurahVerses(item.number)}
                  color="#841584"
                />
              </View>
            )}
          />
          {selectedSurah && (
            <View style={styles.versesContainer}>
              <Text style={styles.versesTitle}>Verses of Surah {selectedSurah}</Text>
              {verses.map((verse: { text: string }, index) => (
                <Text key={index} style={styles.verseText}>{verse.text}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  surahItem: {
    marginVertical: 5,
  },
  versesContainer: {
    marginTop: 20,
  },
  versesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  verseText: {
    marginVertical: 5,
    fontSize: 16,
    lineHeight: 22,
  },
});

export default HomeScreen;
