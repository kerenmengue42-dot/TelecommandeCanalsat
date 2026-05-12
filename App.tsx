import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Vibration,
  Alert,
} from 'react-native';

const App = () => {
  const [currentChannel, setCurrentChannel] = useState(100);
  const [volume, setVolume] = useState(20);
  const [isMuted, setIsMuted] = useState(false);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [channelInput, setChannelInput] = useState('');

  const vibrate = () => Vibration.vibrate(50);

  const handlePower = () => {
    vibrate();
    setIsPowerOn(!isPowerOn);
  };

  const handleNumber = (num: number) => {
    vibrate();
    const newInput = channelInput + num.toString();
    setChannelInput(newInput);
    if (newInput.length >= 3) {
      setCurrentChannel(parseInt(newInput));
      setChannelInput('');
    }
  };

  const handleChannelUp = () => {
    vibrate();
    setCurrentChannel(prev => prev + 1);
  };

  const handleChannelDown = () => {
    vibrate();
    setCurrentChannel(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleVolumeUp = () => {
    vibrate();
    setVolume(prev => (prev < 100 ? prev + 5 : 100));
  };

  const handleVolumeDown = () => {
    vibrate();
    setVolume(prev => (prev > 0 ? prev - 5 : 0));
  };

  const handleMute = () => {
    vibrate();
    setIsMuted(!isMuted);
  };

  const handleOK = () => {
    vibrate();
    if (channelInput.length > 0) {
      setCurrentChannel(parseInt(channelInput));
      setChannelInput('');
    }
  };

  const handleBack = () => {
    vibrate();
    if (channelInput.length > 0) {
      setChannelInput(channelInput.slice(0, -1));
    }
  };

  const handleMenu = () => {
    vibrate();
    Alert.alert('Menu', 'Menu CanalSat ouvert');
  };

  const handleGuide = () => {
    vibrate();
    Alert.alert('Guide', 'Guide des programmes');
  };

  // Bouton simple
  const Btn = ({
    label,
    onPress,
    style,
    textStyle,
    small,
  }: {
    label: string;
    onPress: () => void;
    style?: object;
    textStyle?: object;
    small?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.btn, small && styles.btnSmall, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles.btnText, small && styles.btnTextSmall, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.brand}>CANAL<Text style={styles.brandPlus}>+</Text></Text>
          <Text style={styles.subBrand}>Cameroun</Text>
          <View style={styles.screenInfo}>
            <Text style={styles.channelDisplay}>
              {channelInput || currentChannel.toString().padStart(3, '0')}
            </Text>
            <Text style={styles.volumeDisplay}>
              {isMuted ? '🔇 Muet' : `🔊 ${volume}`}
            </Text>
          </View>
        </View>

        {/* Télécommande */}
        <View style={[styles.remote, !isPowerOn && styles.remoteOff]}>

          {/* POWER */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.powerBtn, isPowerOn && styles.powerOn]}
              onPress={handlePower}
              activeOpacity={0.7}>
              <Text style={styles.powerText}>⏻</Text>
            </TouchableOpacity>
          </View>

          {/* Volume + Chaîne */}
          <View style={styles.row}>
            <View style={styles.colGroup}>
              <Text style={styles.groupLabel}>VOL</Text>
              <Btn label="+" onPress={handleVolumeUp} style={styles.ctrlBtn} />
              <TouchableOpacity style={styles.muteBtn} onPress={handleMute} activeOpacity={0.7}>
                <Text style={styles.muteBtnText}>{isMuted ? '🔇' : '🔊'}</Text>
              </TouchableOpacity>
              <Btn label="−" onPress={handleVolumeDown} style={styles.ctrlBtn} />
            </View>

            {/* Navigation centrale */}
            <View style={styles.navPad}>
              <Btn label="▲" onPress={handleChannelUp} style={styles.navBtn} />
              <View style={styles.navMiddle}>
                <Btn label="◀" onPress={() => vibrate()} style={styles.navBtn} />
                <TouchableOpacity style={styles.okBtn} onPress={handleOK} activeOpacity={0.7}>
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
                <Btn label="▶" onPress={() => vibrate()} style={styles.navBtn} />
              </View>
              <Btn label="▼" onPress={handleChannelDown} style={styles.navBtn} />
            </View>

            <View style={styles.colGroup}>
              <Text style={styles.groupLabel}>CH</Text>
              <Btn label="+" onPress={handleChannelUp} style={styles.ctrlBtn} />
              <View style={styles.muteBtn} />
              <Btn label="−" onPress={handleChannelDown} style={styles.ctrlBtn} />
            </View>
          </View>

          {/* Menu + Guide + Retour */}
          <View style={styles.row}>
            <Btn label="MENU" onPress={handleMenu} style={styles.funcBtn} textStyle={styles.funcText} />
            <Btn label="GUIDE" onPress={handleGuide} style={styles.funcBtn} textStyle={styles.funcText} />
            <Btn label="← RET" onPress={handleBack} style={styles.funcBtn} textStyle={styles.funcText} />
          </View>

          {/* Pavé numérique */}
          <View style={styles.numpad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <Btn key={n} label={n.toString()} onPress={() => handleNumber(n)} style={styles.numBtn} textStyle={styles.numText} />
            ))}
            <Btn label="⬅" onPress={handleBack} style={styles.numBtn} textStyle={styles.numText} />
            <Btn label="0" onPress={() => handleNumber(0)} style={styles.numBtn} textStyle={styles.numText} />
            <Btn label="OK" onPress={handleOK} style={[styles.numBtn, styles.numOkBtn]} textStyle={styles.numText} />
          </View>

          {/* Boutons colorés */}
          <View style={styles.row}>
            {['🔴', '🟢', '🟡', '🔵'].map((c, i) => (
              <TouchableOpacity key={i} style={styles.colorBtn} onPress={vibrate} activeOpacity={0.7}>
                <Text style={styles.colorBtnText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Chaînes rapides */}
          <Text style={styles.sectionTitle}>Chaînes rapides</Text>
          <View style={styles.quickChannels}>
            {[
              { name: 'A+', ch: 100 },
              { name: 'RFI', ch: 150 },
              { name: 'CNN', ch: 200 },
              { name: 'MTV', ch: 250 },
              { name: 'CANAL+', ch: 300 },
              { name: 'SPORT', ch: 350 },
            ].map(item => (
              <TouchableOpacity
                key={item.ch}
                style={[styles.quickBtn, currentChannel === item.ch && styles.quickBtnActive]}
                onPress={() => { vibrate(); setCurrentChannel(item.ch); }}
                activeOpacity={0.7}>
                <Text style={[styles.quickBtnText, currentChannel === item.ch && styles.quickBtnTextActive]}>
                  {item.name}
                </Text>
                <Text style={styles.quickBtnCh}>{item.ch}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        <Text style={styles.footer}>📡 CanalSat Cameroun · Télécommande Virtuelle</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0a0a0a' },
  scroll: { alignItems: 'center', paddingVertical: 20, paddingBottom: 40 },

  // Header
  header: { alignItems: 'center', marginBottom: 20 },
  brand: { fontSize: 32, fontWeight: '900', color: '#fff', letterSpacing: 4 },
  brandPlus: { color: '#e4002b' },
  subBrand: { color: '#aaa', fontSize: 13, letterSpacing: 6, marginTop: -4 },
  screenInfo: {
    flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#1a1a1a', borderRadius: 12, paddingHorizontal: 20,
    paddingVertical: 10, marginTop: 12, width: 280,
  },
  channelDisplay: { color: '#e4002b', fontSize: 28, fontWeight: '900', letterSpacing: 4 },
  volumeDisplay: { color: '#fff', fontSize: 16, alignSelf: 'center' },

  // Télécommande
  remote: {
    backgroundColor: '#1c1c1c', borderRadius: 30, padding: 20,
    width: 300, alignItems: 'center',
    shadowColor: '#e4002b', shadowOpacity: 0.3, shadowRadius: 20, shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  remoteOff: { opacity: 0.4 },

  // Power
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 8, gap: 10 },
  powerBtn: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#2a2a2a',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#444',
  },
  powerOn: { borderColor: '#e4002b', backgroundColor: '#3a0a0a' },
  powerText: { fontSize: 22 },

  // Contrôles volume/chaîne
  colGroup: { alignItems: 'center', gap: 6 },
  groupLabel: { color: '#888', fontSize: 10, letterSpacing: 2, marginBottom: 2 },
  ctrlBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#2a2a2a',
    borderWidth: 1, borderColor: '#3a3a3a',
  },

  // Mute
  muteBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#2a2a2a',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#3a3a3a',
  },
  muteBtnText: { fontSize: 18 },

  // Navigation
  navPad: { alignItems: 'center', gap: 6 },
  navMiddle: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  navBtn: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: '#2a2a2a',
    borderWidth: 1, borderColor: '#3a3a3a',
  },
  okBtn: {
    width: 54, height: 54, borderRadius: 27, backgroundColor: '#e4002b',
    alignItems: 'center', justifyContent: 'center',
  },
  okText: { color: '#fff', fontWeight: '900', fontSize: 16 },

  // Bouton de base
  btn: {
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 10, backgroundColor: '#2a2a2a',
    borderWidth: 1, borderColor: '#3a3a3a',
    minWidth: 44, minHeight: 44,
  },
  btnSmall: { minWidth: 36, minHeight: 36 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnTextSmall: { fontSize: 13 },

  // Boutons fonction
  funcBtn: {
    paddingHorizontal: 12, paddingVertical: 10,
    borderRadius: 8, backgroundColor: '#2a2a2a',
    borderWidth: 1, borderColor: '#3a3a3a', minWidth: 80,
  },
  funcText: { color: '#ccc', fontSize: 11, fontWeight: '700', letterSpacing: 1 },

  // Pavé numérique
  numpad: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: 8, marginVertical: 8,
    width: 200,
  },
  numBtn: {
    width: 56, height: 50, borderRadius: 10,
    backgroundColor: '#252525', borderWidth: 1, borderColor: '#3a3a3a',
    alignItems: 'center', justifyContent: 'center',
  },
  numOkBtn: { backgroundColor: '#1a3a1a', borderColor: '#2a6a2a' },
  numText: { color: '#fff', fontSize: 18, fontWeight: '700' },

  // Boutons colorés
  colorBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#2a2a2a', alignItems: 'center', justifyContent: 'center',
  },
  colorBtnText: { fontSize: 20 },

  // Chaînes rapides
  sectionTitle: { color: '#888', fontSize: 10, letterSpacing: 3, marginTop: 12, marginBottom: 8 },
  quickChannels: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  quickBtn: {
    alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 10, backgroundColor: '#252525',
    borderWidth: 1, borderColor: '#3a3a3a', minWidth: 70,
  },
  quickBtnActive: { backgroundColor: '#3a0a0a', borderColor: '#e4002b' },
  quickBtnText: { color: '#aaa', fontSize: 12, fontWeight: '700' },
  quickBtnTextActive: { color: '#e4002b' },
  quickBtnCh: { color: '#555', fontSize: 10, marginTop: 2 },

  // Footer
  footer: { color: '#444', fontSize: 11, marginTop: 20, letterSpacing: 1 },
});

export default App;