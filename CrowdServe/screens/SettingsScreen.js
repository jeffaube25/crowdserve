import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.pageContainer}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Settings</Text>
        </View>
    );
}

export default SettingsScreen

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: 80,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft: 15,
        paddingBottom: 10
    },
    scrollContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100
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