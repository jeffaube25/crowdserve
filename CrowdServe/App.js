import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.flexContainer}>
        <View style={styles.tile}>
          <Text style={styles.text}>Crossroads</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.text}>Gracie's</Text>
        </View>
        <StatusBar style="auto" />
      </View>

      <View style={styles.flexContainer}>
        <View style={styles.tile}>
          <Text style={styles.text}>Campus Center</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.text}>Global Village</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  tile: {
    backgroundColor: '#808080',
    width: 175,
    height: 350,
    borderRadius: '10%',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
