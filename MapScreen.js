import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
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

export default function MapScreen() {
  const { reports } = useReports();
  const [modalLista, setModalLista] = useState(false);
  const [pinSelecionado, setPinSelecionado] = useState(null);
  const mapRef = useRef(null);

  function irParaOcorrencia(report) {
    setModalLista(false);
    mapRef.current?.animateToRegion({
      latitude: report.latitude,
      longitude: report.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  }

  function handleMarkerPress(report) {
    setPinSelecionado(report);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Ocorrências</Text>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -22.8794,
          longitude: -42.0186,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            pinColor={SEVERIDADE_COR[report.severidade] ?? '#888'}
            onPress={() => handleMarkerPress(report)}
          />
        ))}
      </MapView>

      <TouchableOpacity
        style={styles.bottomPanel}
        onPress={() => setModalLista(true)}
      >
        <Text style={styles.bottomText}>
          {reports.length} ocorrência(s) — ver lista
        </Text>
      </TouchableOpacity>

      {/* aba flutuante do pin */}
      {pinSelecionado && (
        <View style={styles.pinCard}>
          <TouchableOpacity
            style={styles.pinFechar}
            onPress={() => setPinSelecionado(null)}
          >
            <Text style={styles.pinFecharText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.pinTipo}>
            {TIPO_EMOJI[pinSelecionado.tipo] ?? '📍'} {pinSelecionado.title}
          </Text>

          <View style={[styles.pinSeveridadeBadge, { backgroundColor: SEVERIDADE_COR[pinSelecionado.severidade] }]}>
            <Text style={styles.pinSeveridadeText}>
              {SEVERIDADE_LABEL[pinSelecionado.severidade] ?? pinSelecionado.severidade}
            </Text>
          </View>

          <Text style={styles.pinDescricao}>{pinSelecionado.description}</Text>

          {pinSelecionado.bairro && (
            <Text style={styles.pinInfo}>📍 {pinSelecionado.bairro}</Text>
          )}
          {pinSelecionado.data && (
            <Text style={styles.pinInfo}>📅 {pinSelecionado.data}</Text>
          )}
        </View>
      )}

      {/* modal lista */}
      <Modal visible={modalLista} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Ocorrências</Text>
            <FlatList
              data={reports}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => irParaOcorrencia(item)}
                >
                  <Text style={styles.itemTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                  <Text style={[styles.itemSeveridade, { color: SEVERIDADE_COR[item.severidade] }]}>
                    {SEVERIDADE_LABEL[item.severidade] ?? item.severidade}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setModalLista(false)}
            >
              <Text style={styles.fecharText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  map: {
    flex: 1,
  },
  bottomPanel: {
    padding: 14,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: 'bold',
  },
  pinCard: {
    position: 'absolute',
    bottom: 70,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  pinFechar: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  pinFecharText: {
    fontSize: 16,
    color: '#999',
  },
  pinTipo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginRight: 24,
  },
  pinSeveridadeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  pinSeveridadeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pinDescricao: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  pinInfo: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  itemSeveridade: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 4,
  },
  fechar: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  fecharText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});