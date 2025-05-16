import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import halalLogo from '../assets/images/halal-logo.png';

type Restaurant = {
  title: string;
  address: string;
  rating?: number;
  thumbnail?: string;
};

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://192.168.2.116:3001/restaurants?location=Montreal');
        const text = await response.text();
        const data = JSON.parse(text);
        setRestaurants(data);
      } catch (error) {
        console.error('❌ FINAL CATCH:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/login' as never);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D32F2F" />
        <Text>Loading halal spots...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image source={halalLogo} style={styles.logo} resizeMode="contain" />

        <FlatList
          data={restaurants}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 12 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.thumbnail && (
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
              )}
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
                {item.rating && (
                  <Text style={styles.rating}>⭐ {item.rating}/5</Text>
                )}
              </View>
            </View>
          )}
        />

        <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcebea',
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcebea',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flexShrink: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  address: {
    color: '#555',
  },
  rating: {
    marginTop: 4,
    color: '#D32F2F',
    fontWeight: '500',
  },
  logoutContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  logoutText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
  },
});
