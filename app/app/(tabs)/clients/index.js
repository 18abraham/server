import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import request from '../../services/requests';
import { useRouter, useFocusEffect } from 'expo-router';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const router = useRouter();

  const fetchClients = async () => {
    const res = await request.get('/clients/search/name?name=');
    setClients(res.data);
  };

  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [])
  );

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton} onPress={() => router.push('/clients/create')}>
        <Text style={styles.createButtonText}>Crear cliente</Text>
      </TouchableOpacity>

      <FlatList
        data={clients}
        keyExtractor={(item) => item.phone_number}
        renderItem={({ item }) => (
          <TouchableHighlight 
            underlayColor="#DDD" 
            onPress={() => router.push(`/clients/view?id=${item.phone_number}`)} 
            style={styles.item}
          >
            <Text style={styles.title}>{item.name} - {item.phone_number}</Text>
          </TouchableHighlight>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  createButton: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  item: {
    paddingVertical: 15,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
});
