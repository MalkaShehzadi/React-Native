import React from 'react';
import { SectionList, Text, View } from 'react-native';

const sections = [
  { title: 'Fruits', data: ['Apple', 'Banana', 'Orange'] },
  { title: 'Vegetables', data: ['Carrot', 'Broccoli', 'Spinach'] },
];

const ProfileScreen = () => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Text>{item}</Text>}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      )}
    />
  );
};

export default ProfileScreen;
