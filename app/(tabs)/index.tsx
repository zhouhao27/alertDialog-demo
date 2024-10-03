import { FlatList, StyleSheet, TouchableOpacity, Image, SectionList, Pressable } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react'; 
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
interface Member {
  id: string;
  name: string;
  type: 'Friend' | 'COP Member';
  avatar: string;
  isSelected?: boolean;
}

interface Section {
  title: string;
  data: Member[];
}

const mockData: Member[] = [
  { id: '1', name: 'John Doe', type: 'Friend', avatar: 'https://example.com/avatar1.jpg' },
  { id: '2', name: 'Jane Smith', type: 'COP Member', avatar: 'https://example.com/avatar2.jpg' },
  { id: '3', name: 'Mike Johnson', type: 'Friend', avatar: 'https://example.com/avatar3.jpg' },  
  { id: '4', name: 'Alice Brown', type: 'COP Member', avatar: 'https://example.com/avatar4.jpg' },
  { id: '5', name: 'Chris Green', type: 'Friend', avatar: 'https://example.com/avatar5.jpg' },
  { id: '6', name: 'Diana White', type: 'COP Member', avatar: 'https://example.com/avatar6.jpg' },
  { id: '7', name: 'Eve Black', type: 'Friend', avatar: 'https://example.com/avatar7.jpg' },
  { id: '8', name: 'Frank Blue', type: 'COP Member', avatar: 'https://example.com/avatar8.jpg' },
  { id: '9', name: 'Grace Red', type: 'Friend', avatar: 'https://example.com/avatar9.jpg' },
  { id: '10', name: 'Hank Yellow', type: 'COP Member', avatar: 'https://example.com/avatar10.jpg' },
  { id: '11', name: 'Ivy Purple', type: 'Friend', avatar: 'https://example.com/avatar11.jpg' }
];

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#d3e2ff', // Change the background color when selected
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: '#888',
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    margin: 8,
  },
  button: {
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#3070f0',
    color: 'white',
    height: 44,
    textAlignVertical: 'center',
  }
});

export default function TabOneScreen() {
  const [members, setMembers] = useState<Member[]>(mockData);
  const [sectionData, setSectionData] = useState<Section[]>([]);

  useEffect(() => {
    setSectionData([
      { title: 'Friends', data: mockData.filter(member => member.type === 'Friend') },
      { title: 'COP Members', data: mockData.filter(member => member.type === 'COP Member') },
    ]);  
  },[mockData]);

  const handleSelectMember = (id: string) => {
    setSectionData(prevSections =>
      prevSections.map(section => ({
        ...section,
        data: section.data.map(member =>
          member.id === id
            ? { ...member, isSelected: !member.isSelected }
            : member
        ),
      }))
    );    
  };

  const renderItem = ({ item }: { item: Member }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, item.isSelected ? styles.selectedItem : null]}
        onPress={() => handleSelectMember(item.id)}
      >
        <Image source={require('../../assets/images/favicon.png')} style={styles.avatar} />
        <Checkbox
          style={styles.checkbox}
          value={item.isSelected}
          onValueChange={() => handleSelectMember(item.id)}
          color={item.isSelected ? '#4630EB' : undefined}
        />        
        <View style={styles.memberInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Link href="/modal" asChild>
        <Pressable style={styles.header}>
          <Text style={styles.button}>Open a modal view</Text>
        </Pressable>
      </Link>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>
      <SectionList
        sections={sectionData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}
