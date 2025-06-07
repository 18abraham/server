import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import request from '../../services/requests';

export default function UpdateClient() {
  const { id } = useLocalSearchParams();
  const [client, setClient] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (id) {
      request.get(`/clients/search/phone?phone=${id}`).then((res) => {
        const c = res.data;
        setClient(c);
        setName(c.name);
        setPhone(c.phone_number);
        setAddress(c.address);
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await request.put(`/clients/update/${client.id}`, {
        name,
        phone_number: phone,
        address,
      });
      Alert.alert('Cliente actualizado con éxito');
      router.push('/clients');
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar el cliente');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nombre" placeholderTextColor="#888" />

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Teléfono" placeholderTextColor="#888" />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Dirección" placeholderTextColor="#888" />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Actualizar</Text>
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
