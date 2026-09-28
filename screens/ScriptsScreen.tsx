import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function ScriptsScreen() {
  const { user, signOut } = useAuth();
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScripts = async () => {
      const { data, error } = await supabase.from('scripts').select('*').order('updated_at', { ascending: false });
      if (!error && data) setScripts(data);
      setLoading(false);
    };
    fetchScripts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>سكريبتاتي</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
          <Text style={styles.logoutText}>خروج</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color="#00BFFF" style={{ marginTop: 40 }} />
      ) : scripts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyText}>مفيش سكريبتات لسه</Text>
          <Text style={styles.emptySubtext}>ابدأ بإضافة أول سكريبت</Text>
        </View>
      ) : (
        <FlatList
          data={scripts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardStatus}>{item.status}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A1628', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00BFFF' },
  email: { fontSize: 12, color: '#8899AA', marginTop: 4 },
  logoutBtn: { padding: 10, backgroundColor: '#152238', borderRadius: 8 },
  logoutText: { color: '#F0F4F8', fontSize: 14 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 20, color: '#F0F4F8', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#8899AA' },
  card: { backgroundColor: '#152238', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#1E3A5F' },
  cardTitle: { fontSize: 16, color: '#F0F4F8', fontWeight: 'bold' },
  cardStatus: { fontSize: 12, color: '#00BFFF', marginTop: 4 },
  fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#00BFFF', alignItems: 'center', justifyContent: 'center' },
  fabText: { fontSize: 32, color: '#0A1628', fontWeight: 'bold', lineHeight: 36 },
});
