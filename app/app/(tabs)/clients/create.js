import { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import request from '../../services/requests';
import { useRouter } from 'expo-router';

export default function CreateClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    try {
      await request.post('/clients/create', {
        name,
        phone_number: phone,
        address,
      });
      Alert.alert('Cliente creado');
      router.push('/clients');
    } catch (err) {
      Alert.alert('Error', 'No se pudo crear el cliente');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} placeholder="Nombre" placeholderTextColor="#888" />

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        keyboardType="phone-pad"
        placeholder="Teléfono"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAddress}
        value={address}
        placeholder="Dirección"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/clients')}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    backgroundColor: '#F8F8F8',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    color: '#000000',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});
