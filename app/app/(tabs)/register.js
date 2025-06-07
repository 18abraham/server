import { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import request from '../services/requests';
import { useRouter } from 'expo-router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('empleado');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await request.post('/users/register', { name, email, rol, password });
      Alert.alert('Registro exitoso');
      router.push('/');
    } catch (err) {
      Alert.alert('Error', 'Algo salió mal');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Tu nombre"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        placeholder="ejemplo@correo.com"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="••••••••"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 45,
    backgroundColor: '#F5F5F5',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
