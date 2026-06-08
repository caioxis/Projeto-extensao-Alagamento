import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useReports } from '../context/ReportsContext';

const BAIRROS = [
  'Centro',
  'Braga',
  'São Cristóvão',
  'Vila Nova',
  'Passagem',
  'Itajuru',
  'Jardim Caiçara',
  'Jardim Esperança',
  'Peró',
  'Ogiva',
  'Praia do Siqueira',
  'Porto do Carro',
  'Foguete',
  'Tamoios',
];

const TIPOS = [
  { label: '🌊 Alagamento', value: 'alagamento' },
  { label: '🚧 Rua bloqueada', value: 'rua_bloqueada' },
  { label: '🌳 Árvore caída', value: 'arvore_caida' },
  { label: '🕳️ Bueiro entupido', value: 'bueiro' },
  { label: '⛰️ Deslizamento', value: 'deslizamento' },
  { label: '⚡ Falta de energia', value: 'energia' },
  { label: '📋 Outros', value: 'outros' },
];

const SEVERIDADES = [
  { label: '🔴 Grave', value: 'grave' },
  { label: '🟡 Moderado', value: 'moderado' },
  { label: '🟢 Leve', value: 'leve' },
];

const TIPO_LABEL = {
  alagamento: '🌊 Alagamento',
  rua_bloqueada: '🚧 Rua bloqueada',
  arvore_caida: '🌳 Árvore caída',
  bueiro: '🕳️ Bueiro entupido',
  deslizamento: '⛰️ Deslizamento',
  energia: '⚡ Falta de energia',
  outros: '📋 Outros',
};

export default function ReportScreen() {
  const { addReport } = useReports();
  const [detalhes, setDetalhes] = useState('');
  const [location, setLocation] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [severidade, setSeveridade] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [modalBairro, setModalBairro] = useState(false);
  const [buscaBairro, setBuscaBairro] = useState('');

  const bairrosFiltrados = BAIRROS.filter((b) =>
    b.toLowerCase().includes(buscaBairro.toLowerCase())
  );

  function handleMapPress(e) {
    setLocation(e.nativeEvent.coordinate);
  }

  function selecionarBairro(b) {
    setBairro(b);
    setModalBairro(false);
    setBuscaBairro('');
  }

  function handleSubmit() {
    if (!location) {
      Alert.alert('Marque o local', 'Toque no mapa onde ocorreu a ocorrência.');
      return;
    }
    if (!tipo) {
      Alert.alert('Selecione o tipo', 'Escolha o tipo de ocorrência.');
      return;
    }
    if (!severidade) {
      Alert.alert(
        'Selecione a severidade',
        'Escolha a gravidade da ocorrência.'
      );
      return;
    }
    if (!bairro) {
      Alert.alert('Selecione o bairro', 'Escolha o bairro da ocorrência.');
      return;
    }

    addReport({
      id: Date.now(),
      title: TIPO_LABEL[tipo],
      description: detalhes.trim() || 'Sem detalhes adicionais.',
      latitude: location.latitude,
      longitude: location.longitude,
      tipo,
      severidade,
      bairro,
    });

    setDetalhes('');
    setLocation(null);
    setTipo(null);
    setSeveridade(null);
    setBairro(null);
    Alert.alert('Relato enviado!', 'O pin apareceu no mapa.');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Novo Relato</Text>

      <Text style={styles.label}>
        {location ? '📍 Local marcado' : '👆 Toque no mapa para marcar o local'}
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.8794,
          longitude: -42.0186,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
        onPress={handleMapPress}>
        {location && <Marker coordinate={location} title="Novo relato" />}
      </MapView>

      <Text style={styles.label}>Tipo de ocorrência</Text>
      <View style={styles.opcoes}>
        {TIPOS.map((t) => (
          <TouchableOpacity
            key={t.value}
            style={[styles.chip, tipo === t.value && styles.chipSelecionado]}
            onPress={() => setTipo(t.value)}>
            <Text
              style={[
                styles.chipText,
                tipo === t.value && styles.chipTextSelecionado,
              ]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Severidade</Text>
      <View style={styles.opcoes}>
        {SEVERIDADES.map((s) => (
          <TouchableOpacity
            key={s.value}
            style={[
              styles.chip,
              severidade === s.value && styles.chipSelecionado,
            ]}
            onPress={() => setSeveridade(s.value)}>
            <Text
              style={[
                styles.chipText,
                severidade === s.value && styles.chipTextSelecionado,
              ]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Bairro</Text>
      <TouchableOpacity
        style={styles.bairroBtn}
        onPress={() => setModalBairro(true)}>
        <Text
          style={[
            styles.bairroBtnText,
            !bairro && styles.bairroBtnPlaceholder,
          ]}>
          {bairro ? '📍 ' + bairro : 'Selecionar bairro...'}
        </Text>
        <Text style={styles.bairroSeta}>▼</Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Detalhes adicionais (opcional) — ex: perto do semáforo"
        value={detalhes}
        onChangeText={setDetalhes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      {/* modal bairro */}
      <Modal visible={modalBairro} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Selecionar bairro</Text>

            <View style={styles.modalBusca}>
              <Text>🔍</Text>
              <TextInput
                style={styles.modalBuscaInput}
                placeholder="Buscar bairro..."
                value={buscaBairro}
                onChangeText={setBuscaBairro}
                autoFocus
              />
              {buscaBairro.length > 0 && (
                <TouchableOpacity onPress={() => setBuscaBairro('')}>
                  <Text style={styles.buscaLimpar}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={bairrosFiltrados}
              keyExtractor={(item) => item}
              style={styles.modalLista}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    bairro === item && styles.modalItemAtivo,
                  ]}
                  onPress={() => selecionarBairro(item)}>
                  <Text
                    style={[
                      styles.modalItemText,
                      bairro === item && styles.modalItemTextAtivo,
                    ]}>
                    {item}
                  </Text>
                  {bairro === item && <Text>✓</Text>}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalFechar}
              onPress={() => {
                setModalBairro(false);
                setBuscaBairro('');
              }}>
              <Text style={styles.modalFecharText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  label: { fontSize: 14, color: '#666', marginBottom: 8 },
  map: { height: 200, borderRadius: 12, marginBottom: 16 },
  opcoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipSelecionado: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  chipText: { fontSize: 13, color: '#333' },
  chipTextSelecionado: { color: '#fff' },
  bairroBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  bairroBtnText: { fontSize: 15, color: '#333' },
  bairroBtnPlaceholder: { color: '#aaa' },
  bairroSeta: { color: '#888' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputMultiline: { height: 80, textAlignVertical: 'top' },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '75%',
  },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  modalBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    gap: 8,
  },
  modalBuscaInput: { flex: 1, paddingVertical: 10, fontSize: 15 },
  buscaLimpar: { fontSize: 16, color: '#999' },
  modalLista: { flex: 1 },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  modalItemAtivo: { backgroundColor: '#eff6ff' },
  modalItemText: { fontSize: 15, color: '#333' },
  modalItemTextAtivo: { color: '#2563eb', fontWeight: 'bold' },
  modalFechar: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalFecharText: { color: '#fff', fontWeight: 'bold' },
});
