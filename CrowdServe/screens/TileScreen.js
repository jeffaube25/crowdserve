import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tile from '../navigation/tile';
import Modal from 'react-native-modal';
import { useState } from 'react';
import * as Progress from 'react-native-progress';
import ModalContent from '../navigation/modalContent';

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
                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('Crossroads')}>
                    <Tile title='Crossroads' progressLevel={.45} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal("Gracies")}>
                    <Tile title="Gracie's" progressLevel={.23} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('Campus Center')}>
                    <Tile title='Campus Center' progressLevel={.69} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('Global Village')}>
                    <Tile title='Global Village' progressLevel={.82} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('Dorms')}>
                    <Tile title='Dorms' progressLevel={.4} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal('Academic Side')}>
                    <Tile title='Academic' progressLevel={.25} />
                </TouchableOpacity>
            </ScrollView>

            <Modal onBackdropPress={this.toggleModal} isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{selectedTileData ? `${selectedTileData}` : 'No tile selected yet'}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: "red" }}>X</Text>
                    </TouchableOpacity>
                    <View style={{ top: 100, height: "100%", width: "100%" }}>
                        <ScrollView contentContainertyle={styles.modalScrollContainer}>
                            <ModalContent restaurantID={0}></ModalContent>
                        </ScrollView>
                    </View>
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
    modalContainer: {
        flex: .9, // Occupy full height of modal
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        backgroundColor: 'white',
        borderRadius: 25,
    },
    closeButton: {
        position: 'absolute', // Position absolutely to place it in the top right corner
        top: 35, // Adjust top padding for placement
        right: 25, // Adjust right padding for placement
        backgroundColor: 'transparent', // Remove button background color
    },

    progressBar: {
        // height: "60%",
    },
    modalScrollContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        // flexWrap: 'wrap',
        // gap: 15,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingBottom: 75,
    },
    modalContent: {

    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft: 15,
        paddingBottom: 10,
        position: 'absolute', // Position absolutely to place it in the top right corner
        top: 30, // Adjust top padding for placement
        left: 5,
    },
});