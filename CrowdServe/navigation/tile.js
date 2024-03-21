import { StyleSheet, View, Text } from 'react-native'
import * as Progress from 'react-native-progress';

export default function Tile({ title, progressLevel, busyness }) {
    return (
        <View style={styles.tile}>
            <Text style={styles.tileTitle}>{title}</Text>
            <View style={styles.progressContainer}>
                <Progress.Bar progress={progressLevel} {...progressStyle}/>
                <Text style={styles.progressText}>{busyness}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        backgroundColor: '#E7E7E7',
        width: '45%',
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
    tileTitle: {
        color: '#454545',
        fontSize: 20,
        fontWeight: 'bold',
    },
    progressContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        height: "4%",
        top: 5
    },
    progressText: {
        color: '#454545',
        height: 'auto',
        fontSize: 12,
        fontWeight: 'bold'
    }
});

const progressStyle = {
    color:'#71A2DD',
    width: 120,
    height: 17,
    borderRadius: 15,
}