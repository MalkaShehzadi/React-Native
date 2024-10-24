import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, Button, ActivityIndicator, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import useQuranData from '../hooks/useQuranData'; // Custom hook for fetching data
import axios from 'axios';

// Define Surah Type based on API data
type Surah = {
  number: number;
  englishName: string;
  name: string;
  revelationType: string; // Meccan or Medinan
  numberOfAyahs: number; // Number of verses
};

const HomeScreen = () => {
  const { data, loading } = useQuranData('https://api.alquran.cloud/v1/surah');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [verses, setVerses] = useState<{ [key: number]: any[] }>({});
  const [loadingVerses, setLoadingVerses] = useState<number | null>(null);

  // Fetch verses for the selected Surah
  const fetchSurahVerses = async (surahId: number) => {
    setLoadingVerses(surahId); // Show loading for selected Surah
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
      setVerses((prevState) => ({ ...prevState, [surahId]: response.data.data.ayahs }));
      setSelectedSurah(surahId); // Set the clicked Surah as selected
      setLoadingVerses(null); // Stop loading
    } catch (error) {
      console.error('Error fetching verses:', error);
      setLoadingVerses(null); // Stop loading if error
    }
  };

  // Render each Surah item
  const renderItem = ({ item }: { item: Surah }) => (
    <View style={styles.surahItem}>
      <View style={styles.surahHeader}>
        <Button
          title={item.englishName}
          onPress={() => fetchSurahVerses(item.number)}
          color={selectedSurah === item.number ? '#841584' : '#000'}
        />
        <Text style={styles.locationText}>{item.revelationType} - {item.numberOfAyahs} VERSES</Text>
      </View>

      {/* Show loading spinner if fetching verses */}
      {loadingVerses === item.number && <ActivityIndicator size="small" color="#0000ff" />}

      {/* Show verses of the clicked Surah */}
      {selectedSurah === item.number && verses[item.number] && (
        <View style={styles.versesContainer}>
          {verses[item.number].map((verse, index) => (
            <Text key={index} style={styles.verseText}>{verse.text}</Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Assalamualaikum</Text>
        <Text style={styles.userName}>Malka Shehzadi</Text>
      </View>

      {/* Last Read Card */}
      <View style={styles.lastReadCard}>
        <View style={styles.cardContent}>
          <Text style={styles.lastReadText}>Last Read</Text>
          <Text style={styles.lastSurah}>Al-Fatiha</Text>
          <Text style={styles.ayah}>Ayah No: 1</Text>
        </View>
        <Image source={{ uri: 'https://example.com/book-image.png' }} style={styles.cardImage} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.tab}>Surah</Text>
        <Text style={styles.tab}>Para</Text>
        <Text style={styles.tab}>Page</Text>
        <Text style={styles.tab}>Hijb</Text>
      </View>

      {/* Surah List */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.number.toString()}
          renderItem={renderItem}
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <FontAwesome name="home" size={24} color="#841584" />
        <FontAwesome name="book" size={24} color="gray" />
        <FontAwesome name="user" size={24} color="gray" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#841584',
  },
  lastReadCard: {
    backgroundColor: '#e5e5ff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    justifyContent: 'center',
  },
  lastReadText: {
    fontSize: 14,
    color: '#555',
  },
  lastSurah: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ayah: {
    fontSize: 14,
    color: '#333',
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#841584',
    fontWeight: 'bold',
  },
  surahItem: {
    marginBottom: 15,
  },
  surahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  versesContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  verseText: {
    fontSize: 16,
    marginVertical: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
});

export default HomeScreen;
