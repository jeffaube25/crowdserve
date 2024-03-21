import { StyleSheet, View, Text } from 'react-native'
import * as Progress from 'react-native-progress';

export default function Tile({ title, progress }) {
    return (
        <View style={styles.tile}>
            <Text style={styles.tileTitle}>{title}</Text>
            <Progress.Bar progress={progress} {...progressStyle}/>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        backgroundColor: '#d1d1d1',
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
        fontWeight: 'bold'
    },
});

const progressStyle = {
    color:'#71A2DD',
    width: '',
}