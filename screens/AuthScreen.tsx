import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('تنبيه', 'اكتب الإيميل وكلمة السر');
      return;
    }
    if (password.length < 6) {
      Alert.alert('تنبيه', 'كلمة السر لازم 6 حروف على الأقل');
      return;
    }

    setLoading(true);
    const { error } = isLogin ? await signIn(email, password) : await signUp(email, password);
    setLoading(false);

    if (error) {
      Alert.alert('خطأ', error.message);
    } else if (!isLogin) {
      Alert.alert('تم!', 'تم إنشاء الحساب بنجاح');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>نُقطة</Text>
      <Text style={styles.subtitle}>كل فكرة بتبدأ من نقطة</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="الإيميل"
          placeholderTextColor="#8899AA"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة السر"
          placeholderTextColor="#8899AA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#0A1628" />
          ) : (
            <Text style={styles.buttonText}>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? 'ماعندكش حساب؟ سجل دلوقتي' : 'عندك حساب؟ سجل دخول'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00BFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8899AA',
    marginBottom: 48,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#152238',
    color: '#F0F4F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1E3A5F',
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#0A1628',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#00BFFF',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
});
