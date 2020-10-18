import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import * as ReactNative from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Orphanage } from '../../models';
import * as ImagePicker from 'expo-image-picker';
import Api from '../../services/Api';

const Form = () => {
  const navigation = useNavigation();
  const { coordinate } = useRoute().params as { coordinate: Record<string, number> };
  const { latitude, longitude } = coordinate as { latitude: number; longitude: number };

  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [openingHours, setOpeningHours] = React.useState('');
  const [openOnWeekends, setOpenOnWeekends] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);

  const createOrphanage = () => {
    const payload = {
      name,
      about,
      contact,
      instructions,
      latitude,
      longitude,
      openingHours,
      openOnWeekends,
      images,
    };

    const data = new FormData();
    Object.keys(payload).forEach((key) => {
      const items = payload[key as keyof typeof payload];

      if (Array.isArray(items))
        return items.forEach((uri, index) =>
          data.append(key, { name: `image_${index}.jpg`, type: 'image/jpg', uri } as any)
        );
      return data.append(key, String(items).trim());
    });

    Api.post('/orphanages', data).then(() => navigation.navigate('orphanages-map'));
  };

  const selectImages = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') return alert('Você não tem acesso à galeria de fotos');

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) return;

    setImages([...images, result.uri]);
  };

  return (
    <ReactNative.ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <ReactNative.Text style={styles.title}>Dados</ReactNative.Text>

      <ReactNative.Text style={styles.label}>Nome</ReactNative.Text>
      <ReactNative.TextInput style={styles.input} onChangeText={setName} value={name} />

      <ReactNative.Text style={styles.label}>Sobre</ReactNative.Text>
      <ReactNative.TextInput style={[styles.input, { height: 110 }]} multiline onChangeText={setAbout} value={about} />

      <ReactNative.Text style={styles.label}>Whatsapp</ReactNative.Text>
      <ReactNative.TextInput style={styles.input} onChangeText={setContact} value={contact} />

      <ReactNative.Text style={styles.label}>Fotos</ReactNative.Text>
      <ReactNative.View style={styles.uploadedImagesContainer}>
        <ReactNative.View style={styles.uploadedImage}>
          <TouchableOpacity style={styles.imagesInput} onPress={selectImages}>
            <Feather name='plus' size={24} color='#15B6D6' />
          </TouchableOpacity>
        </ReactNative.View>
        {images.map((uri) => (
          <ReactNative.Image source={{ uri }} key={uri} style={styles.uploadedImage} />
        ))}
      </ReactNative.View>

      <ReactNative.Text style={styles.title}>Visitação</ReactNative.Text>

      <ReactNative.Text style={styles.label}>Instruções</ReactNative.Text>
      <ReactNative.TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        onChangeText={setInstructions}
        value={instructions}
      />

      <ReactNative.Text style={styles.label}>Horario de visitas</ReactNative.Text>
      <ReactNative.TextInput style={styles.input} value={openingHours} onChangeText={setOpeningHours} />

      <ReactNative.View style={styles.switchContainer}>
        <ReactNative.Text style={styles.label}>Atende final de semana?</ReactNative.Text>
        <ReactNative.Switch
          onValueChange={setOpenOnWeekends}
          thumbColor='#fff'
          value={openOnWeekends}
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </ReactNative.View>

      <RectButton style={styles.nextButton} onPress={createOrphanage}>
        <ReactNative.Text style={styles.nextButtonText}>Cadastrar</ReactNative.Text>
      </RectButton>
    </ReactNative.ScrollView>
  );
};

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6',
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  uploadedImagesContainer: {
    flexDirection: 'row',
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },
});

export default Form;
