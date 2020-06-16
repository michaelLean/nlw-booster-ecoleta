import React, { useState, useDebugValue, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, StyleSheet, Image, Text, KeyboardAvoidingView, Platform, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import ibge from '../../services/ibge';

interface Item {
  label: string;
  value: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [ufs, setUfs] = useState<Item[]>([]);
  const [cities, setCities] = useState<Item[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    ibge.get<IBGEUFResponse[]>('estados?orderBy=nome').then(response => {
      const ufInitials = response.data.map(uf => {
        return {
          label: uf.sigla,
          value: uf.sigla
        }
      });
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    ibge.get<IBGECityResponse[]>(`estados/${selectedUf}/municipios?orderBy=nome`).then(response => {
      const citiesNames = response.data.map(city => {
        return {
          label: city.nome,
          value: city.nome
        }
      });
      setCities(citiesNames);
    });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    if (selectedUf !== "0" && selectedCity !== "0") {
      navigation.navigate('Points', {
        uf: selectedUf,
        city: selectedCity
      });
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Picker
            selectedValue={selectedUf}
            style={{ height: 56, width: 'auto' }}
            onValueChange={(itemValue, itemIndex) => setSelectedUf(itemValue)}
          >
            <Picker.Item label="Selecione um estado" value="0" />
            {ufs.map(uf => (
              <Picker.Item key={uf.value} label={uf.label} value={uf.value} />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedCity}
            style={{ height: 56, width: 'auto' }}
            onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
          >
            <Picker.Item label="Selecione uma cidade" value="0" />
            {cities.map(city => (
              <Picker.Item key={city.value} label={city.label} value={city.value} />
            ))}
          </Picker>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>
              Entrar
          </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;