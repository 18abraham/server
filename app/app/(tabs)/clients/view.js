import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import request from '../../services/requests';

export default function ClientDetail() {
  const { id } = useLocalSearchParams();
  const [client, setClient] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      request.get(`/clients/search/phone?phone=${id}`)
        .then(res => {
          setClient(res.data);
        })
        .catch(err => {
          console.error('Error al obtener cliente:', err);
        });
    }
  }, [id]);

  const deleteClient = async () => {
    await request.delete(`/clients/delete/${client.id}`);
    Alert.alert('Cliente eliminado');
    router.push('/clients');
  };

  if (!client) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando cliente...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Cliente</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{client.name}</Text>
      <Text style={styles.label}>Teléfono:</Text>
      <Text style={styles.value}>{client.phone_number}</Text>
      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.value}>{client.address}</Text>

      <TouchableOpacity style={styles.button} onPress={deleteClient}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`/clients/update?id=${client.phone_number}`)}
      >
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/clients')}
      >
        <Text style={styles.secondaryButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#000000',
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 15,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000000',
  },
});
