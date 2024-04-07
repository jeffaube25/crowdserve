import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tile from '../navigation/tile';
import Modal from 'react-native-modal';
import { useState } from 'react';

const TileScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTileData, setSelectedTileData] = useState(null);

    const toggleModal = (title) => {
        setIsModalVisible(!isModalVisible);
        setSelectedTileData(title); // Store clicked tile title (temporary data)
    };

    return (
        <View style={styles.pageContainer}>
            <StatusBar style="auto" />
            <Text style={styles.title}>CrowdServe</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('0')}>
                    <Tile title='Crossroads' progressLevel={.45} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('1')}>
                    <Tile title="Gracie's" progressLevel={.23} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('2')}>
                    <Tile title='Campus Center' progressLevel={.69} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('3')}>
                    <Tile title='Global Village' progressLevel={.82} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('4')}>
                    <Tile title='Dorms' progressLevel={.4} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('5')}>
                    <Tile title='Academic' progressLevel={.25} />
                </TouchableOpacity>
            </ScrollView>

            <Modal style={{height:"50%"}} isVisible={isModalVisible}>
                <View style={{ flex: 1, justifyContent: 'center', borderRadius:25, alignItems: 'center', backgroundColor:"white" }}>
                    <Text>{selectedTileData ? `This is the modal content for ${selectedTileData}` : 'No tile selected yet'}</Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Text>Close Modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

export default TileScreen;

const styles = StyleSheet.create({
    pageContainer: {
        paddingTop: 80,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft: 15,
        paddingBottom: 10,
    },
    scrollContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 75,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    //   touchableOpacity: {
    //     display:"none",
    //     width: '100%', // Set width to match content
    //     height: '20%', // Set height to match content
    //   },
});
