import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Tile from '../navigation/tile';

const TileScreen = ({ navigation }) => {
    return (
        <View style={styles.pageContainer}>
            <StatusBar style="auto" />
            <Text style={styles.title}>CrowdServe</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Tile title='Crossroads' progress={.7}/>
                <Tile title="Gracie's" progress={.7}/>
                <Tile title='Campus Center' progress={.7}/>
                <Tile title='Global Village' progress={.7}/>
                <Tile title='Academic Buildings' progress={.7}/>
                <Tile title='Dorms' progress={.7}/>
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
        paddingBottom: 75
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});