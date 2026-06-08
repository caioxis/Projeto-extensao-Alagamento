import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

// O Snack precisa obrigatoriamente de um "export default function App" no arquivo principal
export default function App() {
  // Estados para controlar a exibição dos Modais
  const [denunciaVisible, setDenunciaVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [emergVisible, setEmergVisible] = useState(false);

  // Estados dos dados simulados
  const [denunciasCount, setDenunciasCount] = useState(52);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Estados do Formulário de Denúncia
  const [bairro, setBairro] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para simular o Toast na tela
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  const handleSendDenuncia = () => {
    setDenunciaVisible(false);
    setDenunciasCount(prev => prev + 1);
    triggerToast('✅ Denúncia enviada com sucesso!');
    setBairro('');
    setDescricao('');
  };

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="light-content" backgroundColor="#0f2a5e" />
      
      {/* BACKGROUND GRADIENT SIMULADO */}
      <View style={styles.appBg} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerMenu} onPress={() => triggerToast('Menu em breve!')}>
          <Text style={styles.headerIconText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Alerta Cabo Frio</Text>
          <Text style={styles.headerSubtitleText}>Sistema de Alerta de Alagamentos</Text>
        </View>
        <TouchableOpacity style={styles.headerBell} onPress={() => triggerToast('2 novas notificações de alerta!')}>
          <Text style={styles.headerIconText}>🔔</Text>
          <View style={styles.bellBadge}>
            <Text style={styles.bellBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO SCROLLABLE */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* CARD DE ALERTA PRINCIPAL */}
        <View style={styles.alertCard}>
          <View style={styles.alertTop}>
            <Text style={styles.alertIcon}>🌧️</Text>
            <View style={styles.alertTextContainer}>
              <Text style={styles.alertTitle}>ATENÇÃO</Text>
              <Text style={styles.alertDescription}>
                Risco moderado de alagamento em Cabo Frio.
              </Text>
            </View>
            <View style={styles.riskGauge}>
              <Text style={styles.riskPct}>62%</Text>
              <Text style={styles.riskLabel}>RISCO ATUAL</Text>
            </View>
          </View>
          <View style={styles.alertFooter}>
            <Text style={styles.alertTime}>🕒 Última atualização: 18:42</Text>
            <TouchableOpacity onPress={() => {
              triggerToast('🔄 Atualizando dados...');
              setTimeout(() => triggerToast('✅ Dados atualizados!'), 1500);
            }}>
              <Text style={styles.alertRefresh}>🔄 Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* CARD DE INFORMAÇÕES / STATUS METRICS */}
        <View style={styles.statsCardGrid}>
          <View style={styles.statItem}>
            <View style={[styles.statIconWrap, styles.statIconBlue]}><Text>📷</Text></View>
            <Text style={styles.statNum}>{denunciasCount}</Text>
            <Text style={styles.statLbl}>Denúncias hoje</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIconWrap, styles.statIconOrange]}><Text>⚠️</Text></View>
            <Text style={styles.statNum}>14</Text>
            <Text style={styles.statLbl}>Ocorrências ativas</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIconWrap, styles.statIconGreen]}><Text>📍</Text></View>
            <Text style={styles.statNum}>4</Text>
            <Text style={styles.statLbl}>Bairros afetados</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIconWrap, styles.statIconPurple]}><Text>📊</Text></View>
            <Text style={styles.statNum}>128</Text>
            <Text style={styles.statLbl}>Apoios dados hoje</Text>
          </View>
        </View>

        {/* GRID DE AÇÕES */}
        <View style={styles.actionsCardGrid}>
          <TouchableOpacity style={styles.actionItem} onPress={() => setDenunciaVisible(true)}>
            <View style={[styles.actionIconWrap, styles.aiBlue]}><Text style={{fontSize:20}}>📷</Text></View>
            <Text style={styles.actionLbl}>Nova denúncia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => setMapVisible(true)}>
            <View style={[styles.actionIconWrap, styles.aiGreen]}><Text style={{fontSize:20}}>🗺️</Text></View>
            <Text style={styles.actionLbl}>Ver mapa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => setStatsVisible(true)}>
            <View style={[styles.actionIconWrap, styles.aiPurple]}><Text style={{fontSize:20}}>📊</Text></View>
            <Text style={styles.actionLbl}>Estatísticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => setEmergVisible(true)}>
            <View style={[styles.actionIconWrap, styles.aiRed]}><Text style={{fontSize:20}}>📞</Text></View>
            <Text style={styles.actionLbl}>Emergência</Text>
          </TouchableOpacity>
        </View>

        {/* SEÇÃO OCORRÊNCIAS RECENTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ocorrências recentes</Text>
          <TouchableOpacity onPress={() => triggerToast('Carregando todas as ocorrências...')}>
            <Text style={styles.sectionLink}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.occurrencesContainer}>
          {/* Card Ocorrência 1 */}
          <View style={styles.occCard}>
            <Text style={styles.occImg}>🌊</Text>
            <View style={styles.occInfo}>
              <View style={styles.occLoc}>
                <Text style={styles.occLocName}>📍 Braga</Text>
              </View>
              <Text style={styles.occDesc}>Rua alagada próximo ao mercado Princesa</Text>
              <Text style={styles.occTime}>🕒 há 15 min</Text>
            </View>
            <View style={styles.badgeAlto}>
              <Text style={styles.badgeAltoText}>ALTO RISCO</Text>
            </View>
          </View>

          {/* Card Ocorrência 2 */}
          <View style={styles.occCard}>
            <Text style={styles.occImg}>🕳️</Text>
            <View style={styles.occInfo}>
              <View style={styles.occLoc}>
                <Text style={styles.occLocName}>📍 Centro</Text>
              </View>
              <Text style={styles.occDesc}>Bueiro transbordando na Av. Assunção</Text>
              <Text style={styles.occTime}>🕒 há 23 min</Text>
            </View>
            <View style={styles.badgeAtencao}>
              <Text style={styles.badgeAtencaoText}>ATENÇÃO</Text>
            </View>
          </View>
        </View>

        {/* FORECAST BANNER */}
        <View style={styles.forecastBanner}>
          <Text style={styles.forecastIcon}>🌧️</Text>
          <View style={styles.forecastText}>
            <Text style={styles.forecastTitle}>Previsão: Chuva forte nas próximas horas</Text>
            <Text style={styles.forecastSubtitle}>Fique atento e evite áreas alagadas.</Text>
          </View>
          <TouchableOpacity onPress={() => triggerToast('Abrindo previsão detalhada...')}>
            <Text style={styles.forecastLink}>Ver previsão ❯</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* TOAST FLUTUANTE */}
      {showToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* BOTTOM NAV BAR */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Text style={[styles.navIcon, {color: '#1a5fd4'}]}>🏠</Text>
          <Text style={[styles.navLabel, {color: '#1a5fd4'}]}>Início</Text>
        </View>
        <TouchableOpacity style={styles.navItem} onPress={() => triggerToast('Abrindo Denúncias...')}>
          <Text style={[styles.navIcon, {color: '#aaa'}]}>📋</Text>
          <Text style={styles.navLabel}>Denúncias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navAdd} onPress={() => setDenunciaVisible(true)}>
          <Text style={styles.navAddText}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => triggerToast('Abrindo Apoios...')}>
          <Text style={[styles.navIcon, {color: '#aaa'}]}>👥</Text>
          <Text style={styles.navLabel}>Apoios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => triggerToast('Abrindo Perfil...')}>
          <Text style={[styles.navIcon, {color: '#aaa'}]}>👤</Text>
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL: NOVA DENÚNCIA */}
      <Modal animationType="slide" transparent={true} visible={denunciaVisible} onRequestClose={() => setDenunciaVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <TouchableOpacity style={styles.btnClose} onPress={() => setDenunciaVisible(false)}>
              <Text style={styles.btnCloseText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>📸 Nova Denúncia</Text>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Bairro / Localização</Text>
              <TextInput style={styles.formInput} placeholder="Ex: Centro, Braga, Tamoios..." placeholderTextColor="#aaa" value={bairro} onChangeText={setBairro} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Descrição</Text>
              <TextInput style={[styles.formInput, {height: 80}]} placeholder="Descreva a situação..." placeholderTextColor="#aaa" multiline numberOfLines={3} value={descricao} onChangeText={setDescricao} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Foto (opcional)</Text>
              <TouchableOpacity style={styles.uploadBox} onPress={() => triggerToast('Câmera/galeria aberta!')}>
                <Text style={{fontSize: 24}}>📷</Text>
                <Text style={styles.uploadBoxText}>Toque para adicionar foto</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleSendDenuncia}>
              <Text style={styles.btnPrimaryText}>📤 Enviar Denúncia</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: MAPA DE OCORRÊNCIAS */}
      <Modal animationType="slide" transparent={true} visible={mapVisible} onRequestClose={() => setMapVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <TouchableOpacity style={styles.btnClose} onPress={() => setMapVisible(false)}>
              <Text style={styles.btnCloseText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>🗺️ Mapa de Ocorrências</Text>
            
            <View style={styles.mapPlaceholder}>
              <Text style={{fontSize: 50}}>🗺️</Text>
            </View>
            <Text style={styles.mapInfo}>📍 Cabo Frio — 4 bairros afetados agora.</Text>
            
            <View style={styles.mapPinList}>
              <View style={styles.mapPinItem}><Text style={{color:'#e74c3c'}}>🔴 Braga — Rua alagada (ALTO RISCO)</Text></View>
              <View style={styles.mapPinItem}><Text style={{color:'#f39c12'}}>🟠 Centro — Bueiro transbordando</Text></View>
              <View style={styles.mapPinItem}><Text style={{color:'#f39c12'}}>🟠 Tamoios — Via parcialmente bloqueada</Text></View>
              <View style={styles.mapPinItem}><Text style={{color:'#e74c3c'}}>🔴 Peró — Acesso interditado</Text></View>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL: ESTATÍSTICAS DO DIA */}
      <Modal animationType="slide" transparent={true} visible={statsVisible} onRequestClose={() => setStatsVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <TouchableOpacity style={styles.btnClose} onPress={() => setStatsVisible(false)}>
              <Text style={styles.btnCloseText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>📊 Estatísticas do Dia</Text>

            <View style={styles.riskMeter}>
              <View style={[styles.riskSeg, {backgroundColor: '#27ae60'}]} />
              <View style={[styles.riskSeg, {backgroundColor: '#f39c12'}]} />
              <View style={[styles.riskSeg, {backgroundColor: '#e74c3c'}]} />
            </View>
            <Text style={styles.riskMeterText}>Risco atual: 62% — Moderado-Alto</Text>

            <View style={styles.statRow}><Text style={styles.statRowLabel}>Denúncias hoje</Text><Text style={[styles.statRowValue, {color:'#1a5fd4'}]}>{denunciasCount}</Text></View>
            <View style={styles.statRow}><Text style={styles.statRowLabel}>Ocorrências ativas</Text><Text style={[styles.statRowValue, {color:'#f39c12'}]}>14</Text></View>
            <View style={styles.statRow}><Text style={styles.statRowLabel}>Bairros afetados</Text><Text style={[styles.statRowValue, {color:'#e74c3c'}]}>4</Text></View>
            <View style={styles.statRow}><Text style={styles.statRowLabel}>Apoios dados hoje</Text><Text style={[styles.statRowValue, {color:'#27ae60'}]}>128</Text></View>
            <View style={styles.statRow}><Text style={styles.statRowLabel}>Nível de chuva (mm)</Text><Text style={styles.statRowValue}>38mm</Text></View>
          </View>
        </View>
      </Modal>

      {/* MODAL: EMERGÊNCIA */}
      <Modal animationType="slide" transparent={true} visible={emergVisible} onRequestClose={() => setEmergVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <TouchableOpacity style={styles.btnClose} onPress={() => setEmergVisible(false)}>
              <Text style={styles.btnCloseText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>🚨 Contatos de Emergência</Text>

            <TouchableOpacity style={styles.emergOption} onPress={() => {setEmergVisible(false); triggerToast('Ligando para 193...');}}>
              <Text style={styles.emergIcon}>🚒</Text>
              <View>
                <Text style={styles.emergTitle}>Corpo de Bombeiros</Text>
                <Text style={styles.emergSub}>Ligar: 193</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emergOption} onPress={() => {setEmergVisible(false); triggerToast('Ligando para 192...');}}>
              <Text style={styles.emergIcon}>🚑</Text>
              <View>
                <Text style={styles.emergTitle}>SAMU</Text>
                <Text style={styles.emergSub}>Ligar: 192</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emergOption} onPress={() => {setEmergVisible(false); triggerToast('Ligando para 199...');}}>
              <Text style={styles.emergIcon}>🏢</Text>
              <View>
                <Text style={styles.emergTitle}>Defesa Civil</Text>
                <Text style={styles.emergSub}>Ligar: 199</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#0f2a5e',
  },
  appBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
    backgroundColor: '#1e4494',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerMenu: {
    padding: 4,
  },
  headerIconText: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    alignItems: 'center',
  },
  headerTitleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  headerSubtitleText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '600',
  },
  headerBell: {
    padding: 4,
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#e74c3c',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  alertCard: {
    backgroundColor: '#f4a200',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  alertTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1a1a1a',
  },
  alertDescription: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    lineHeight: 18,
  },
  riskGauge: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  riskPct: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1a1a1a',
  },
  riskLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#555',
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.12)',
  },
  alertTime: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  alertRefresh: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statsCardGrid: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    width: (width - 40) / 4,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  statIconBlue: { backgroundColor: '#e8f0fe' },
  statIconOrange: { backgroundColor: '#fff3e0' },
  statIconGreen: { backgroundColor: '#e8f5e9' },
  statIconPurple: { backgroundColor: '#f3e5f5' },
  statNum: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1a1a1a',
  },
  statLbl: {
    fontSize: 9,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  actionsCardGrid: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
    width: (width - 40) / 4,
  },
  actionIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  aiBlue: { backgroundColor: '#e8f0fe' },
  aiGreen: { backgroundColor: '#e8f5e9' },
  aiPurple: { backgroundColor: '#f3e5f5' },
  aiRed: { backgroundColor: '#fce8e6' },
  actionLbl: {
    fontSize: 10,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4da6ff',
  },
  occurrencesContainer: {
    marginBottom: 12,
  },
  occCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  occImg: {
    fontSize: 28,
    marginRight: 10,
  },
  occInfo: {
    flex: 1,
  },
  occLoc: {
    marginBottom: 2,
  },
  occLocName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  occDesc: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    lineHeight: 16,
  },
  occTime: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  badgeAlto: {
    backgroundColor: '#fde8e8',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  badgeAltoText: {
    color: '#c0392b',
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
  },
  badgeAtencao: {
    backgroundColor: '#fff3e0',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  badgeAtencaoText: {
    color: '#e67e22',
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
  },
  forecastBanner: {
    backgroundColor: '#162d6a',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  forecastIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  forecastText: {
    flex: 1,
  },
  forecastTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
  },
  forecastSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  forecastLink: {
    color: '#4da6ff',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e8eaf0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#aaa',
    marginTop: 2,
  },
  navAdd: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a5fd4',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
    shadowColor: '#1a5fd4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  navAddText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  toast: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 999,
  },
  toastText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  btnClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  btnCloseText: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 14,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
    marginBottom: 6,
  },
  formInput: {
    borderWidth: 1.5,
    borderColor: '#e0e4ee',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#c5cfe8',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  uploadBoxText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '600',
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: '#1a5fd4',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  mapPlaceholder: {
    backgroundColor: '#d4e4f7',
    height: 150,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mapInfo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 12,
  },
  mapPinList: {
    gap: 8,
  },
  mapPinItem: {
    backgroundColor: '#f7f8fc',
    padding: 10,
    borderRadius: 10,
  },
  riskMeter: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  riskSeg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  riskMeterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  statRowLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
  },
  statRowValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  emergOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f7ff',
    marginBottom: 10,
  },
  emergIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  emergTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  emergSub: {
    fontSize: 12,
    color: '#777',
    fontWeight: '600',
  },
});