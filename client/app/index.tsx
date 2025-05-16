import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login' as never); // Or use '/home' if token exists
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Text style={{ textAlign: 'center', marginTop: 100, fontSize: 18 }}>
      Loading Halal Crave...
    </Text>
  );
}
