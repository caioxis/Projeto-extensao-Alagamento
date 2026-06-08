import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState, useMemo } from 'react';
import { useReports } from '../context/ReportsContext';

const TIPO_EMOJI = {
  alagamento: '🌊',
  rua_bloqueada: '🚧',
  arvore_caida: '🌳',
  bueiro: '🕳️',
  deslizamento: '⛰️',
  energia: '⚡',
  outros: '📋',
};

const SEVERIDADE_COR = {
  grave: '#ef4444',
  moderado: '#f59e0b',
  leve: '#22c55e',
};

const SEVERIDADE_LABEL = {
  grave: '🔴 Grave',
  moderado: '🟡 Moderado',
  leve: '🟢 Leve',
};

const FILTROS_TIPO = [
  { label: 'Todos', value: null },
  { label: '🌊', value: 'alagamento' },
  { label: '🚧', value: 'rua_bloqueada' },
  { label: '🌳', value: 'arvore_caida' },
  { label: '🕳️', value: 'bueiro' },
  { label: '⛰️', value: 'deslizamento' },
  { label: '⚡', value: 'energia' },
  { label: '📋', value: 'outros' },
];

const FILTROS_SEVERIDADE = [
  { label: 'Todas', value: null },
  { label: '🔴 Grave', value: 'grave' },
  { label: '🟡 Moderado', value: 'moderado' },
  { label: '🟢 Leve', value: 'leve' },
];

export default function AlertsScreen() {
  const { reports } = useReports();
  const [busca, setBusca] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState(null);
  const [severidadeFiltro, setSeveridadeFiltro] = useState(null);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  const resultado = useMemo(() => {
    return reports
      .filter(r => {
        const textoBusca = busca.toLowerCase();
        const bate =
          r.title.toLowerCase().includes(textoBusca) ||
          r.description.toLowerCase().includes(textoBusca) ||
          (r.bairro && r.bairro.toLowerCase().includes(textoBusca));
        const bateTipo = tipoFiltro ? r.tipo === tipoFiltro : true;
        const bateSeveridade = severidadeFiltro ? r.severidade === severidadeFiltro : true;
        return bate && bateTipo && bateSeveridade;
      })
      .sort((a, b) => {
        const ordem = { grave: 0, moderado: 1, leve: 2 };
        return (ordem[a.severidade] ?? 3) - (ordem[b.severidade] ?? 3);
      });
  }, [reports, busca, tipoFiltro, severidadeFiltro]);

  const temFiltroAtivo = tipoFiltro !== null || severidadeFiltro !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorrências</Text>

      {/* busca + botão filtros */}
      <View style={styles.buscaRow}>
        <View style={styles.buscaBox}>
          <Text style={styles.buscaIcon}>🔍</Text>
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar por título, bairro..."
            value={busca}
            onChangeText={setBusca}
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Text style={styles.buscaLimpar}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.filtroBtn, temFiltroAtivo && styles.filtroBtnAtivo]}
          onPress={() => setFiltrosAbertos(v => !v)}
        >
          <Text style={[styles.filtroBtnText, temFiltroAtivo && styles.filtroBtnTextAtivo]}>
            {filtrosAbertos ? '▲' : '▼'} Filtros{temFiltroAtivo ? ' ●' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* filtros colapsáveis */}
      {filtrosAbertos && (
        <View style={styles.filtrosBox}>
          <Text style={styles.filtrosLabel}>Tipo</Text>
          <FlatList
            horizontal
            data={FILTROS_TIPO}
            keyExtractor={(item) => String(item.value)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtrosRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, tipoFiltro === item.value && styles.chipAtivo]}
                onPress={() => setTipoFiltro(item.value)}
              >
                <Text style={[styles.chipText, tipoFiltro === item.value && styles.chipTextAtivo]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.filtrosLabel}>Severidade</Text>
          <FlatList
            horizontal
            data={FILTROS_SEVERIDADE}
            keyExtractor={(item) => String(item.value)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtrosRow}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, severidadeFiltro === item.value && styles.chipAtivo]}
                onPress={() => setSeveridadeFiltro(item.value)}
              >
                <Text style={[styles.chipText, severidadeFiltro === item.value && styles.chipTextAtivo]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />

          {temFiltroAtivo && (
            <TouchableOpacity
              onPress={() => { setTipoFiltro(null); setSeveridadeFiltro(null); }}
              style={styles.limparFiltros}
            >
              <Text style={styles.limparFiltrosText}>✕ Limpar filtros</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* contador */}
      <Text style={styles.contador}>
        {resultado.length} ocorrência(s) encontrada(s)
      </Text>

      {/* lista */}
      <FlatList
        data={resultado}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>🔎</Text>
            <Text style={styles.vazioText}>Nenhuma ocorrência encontrada</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitulo}>
                {item.title}
              </Text>
              <View style={[styles.badge, { backgroundColor: SEVERIDADE_COR[item.severidade] }]}>
                <Text style={styles.badgeText}>
                  {SEVERIDADE_LABEL[item.severidade] ?? item.severidade}
                </Text>
              </View>
            </View>

            <Text style={styles.cardDesc}>{item.description}</Text>

            <View style={styles.cardFooter}>
              {item.bairro && (
                <Text style={styles.cardInfo}>📍 {item.bairro}</Text>
              )}
              {item.data && (
                <Text style={styles.cardInfo}>📅 {item.data}</Text>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
  },
  buscaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  buscaBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  buscaIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  buscaInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },
  buscaLimpar: {
    fontSize: 16,
    color: '#999',
    paddingLeft: 8,
  },
  filtroBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  filtroBtnAtivo: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filtroBtnText: {
    fontSize: 13,
    color: '#444',
    fontWeight: 'bold',
  },
  filtroBtnTextAtivo: {
    color: '#fff',
  },
  filtrosBox: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  filtrosLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
    marginTop: 4,
  },
  filtrosRow: {
    gap: 6,
    paddingBottom: 4,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  chipAtivo: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  chipText: {
    fontSize: 13,
    color: '#444',
  },
  chipTextAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  limparFiltros: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  limparFiltrosText: {
    fontSize: 13,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  contador: {
    fontSize: 13,
    color: '#888',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  badge: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  cardInfo: {
    fontSize: 12,
    color: '#888',
  },
  vazio: {
    alignItems: 'center',
    marginTop: 60,
  },
  vazioEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  vazioText: {
    fontSize: 15,
    color: '#888',
  },
});