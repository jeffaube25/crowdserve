import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const TileScreen = ({ navigation }) => {
    return (
        <View style={styles.pageContainer}>
            <StatusBar style="auto" />
            <Text style={styles.title}>CrowdServe</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.tile}>
                    <Text style={styles.text}>Crossroads</Text>
                </View>

                <View style={styles.tile}>
                    <Text style={styles.text}>Gracie's</Text>
                </View>

                <View style={styles.tile}>
                    <Text style={styles.text}>Campus Center</Text>
                </View>

                <View style={styles.tile}>
                    <Text style={styles.text}>Global Village</Text>
                </View>

                <View style={styles.tile}>
                    <Text style={styles.text}>Academic Buildings</Text>
                </View>

                <View style={styles.tile}>
                    <Text style={styles.text}>Dorms</Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default TileScreen

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
        // backgroundColor: '#fff',
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
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 10,
        },
        shadowOpacity: .25,
        shadowRadius: 3.5,
        elevation: 5
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});