import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

type Restaurant = {
  title: string;
  address: string;
  rating?: number;
  thumbnail?: string;
};

export default function RestaurantListScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://192.168.2.116:3001/restaurants?location=Montreal');

      if (!response.ok) {
        console.warn(`⚠️ Backend error: ${response.status}`);
        setRestaurants([]);
        return;
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        console.warn('⚠️ No restaurants returned');
        setRestaurants([]);
        return;
      }

      console.log(`✅ Loaded ${data.length} restaurants`);
      setRestaurants(data);
    } catch (error) {
      console.error('❌ Network or parse error:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  fetchRestaurants();
}, []);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading halal spots...</Text>
      </View>
    );
  }
    console.log('📦 restaurants:', restaurants);

  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Halal Restaurants in Montreal</Text>
    <Text>Total restaurants loaded: {restaurants.length}</Text>

    {restaurants.slice(0, 3).map((r, i) => (
      <View key={i} style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{r.title}</Text>
        <Text>{r.address}</Text>
        <Text>{r.rating ? `Rating: ${r.rating}/5` : 'No rating'}</Text>
      </View>
    ))}
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flexShrink: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    color: '#555',
  },
  rating: {
    marginTop: 4,
    color: '#333',
  },
});
