import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Tile from '../navigation/tile';
import Modal from 'react-native-modal';
import { useState } from 'react';
import * as Progress from 'react-native-progress';
import ModalContent from '../navigation/modalContent';
import React, { useEffect } from 'react';

const TileScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTileData, setSelectedTileData] = useState(null);

    const toggleModal = (title) => {
        // console.log("modal toggled");
        setIsModalVisible(!isModalVisible);
        setSelectedTileData(title); // Store clicked tile title (temporary data)
    };

    const restaurantData = [
        {
            diningHallId: 1, // Unique identifier for the dining hall
            diningHallName: "Campus Center",
            restaurants: [
                {
                    restaurantId: 1, // Unique identifier for the restaurant within the dining hall
                    restaurantName: "Nathan's",
                    progressLevel: 0.75, // Progress level (0 to 1)
                },
                {
                    restaurantId: 2,
                    restaurantName: "Ritz",
                    progressLevel: 0.83,
                },
                {
                    restaurantID: 3,
                    restaurantName: "Artesano",
                    progressLevel: .59,
                },
                {
                    restaurantID: 4,
                    restaurantName: "Loaded Latke",
                    progressLevel: .63,
                },
                {
                    restaurantID: 5,
                    restaurantName: "Ben & Jerry's",
                    progressLevel: .91,
                },
                {
                    restaurantID: 6,
                    restaurantName: "Brick City Cafe",
                    progressLevel: .87,
                },
            ],
        },
        {
            diningHallId: 2, // Unique identifier for the dining hall
            diningHallName: "Dormside",
            restaurants: [
                {
                    restaurantId: 7, // Unique identifier for the restaurant within the dining hall
                    restaurantName: "Beanz",
                    progressLevel: 0.75, // Progress level (0 to 1)
                },
                {
                    restaurantId: 8,
                    restaurantName: "Gracie's",
                    progressLevel: 0.2,
                },
                {
                    restaurantID: 9,
                    restaurantName: "The Corner Store",
                    progressLevel: .4,
                },
                {
                    restaurantID: 10,
                    restaurantName: "The Commons",
                    progressLevel: .2,
                },
                {
                    restaurantID: 11,
                    restaurantName: "The College Grind",
                    progressLevel: .2,
                },
            ],
        },
        {
            diningHallId: 3, // Unique identifier for the dining hall
            diningHallName: "Crossroads",
            restaurants: [
                {
                    restaurantID: 12,
                    restaurantName: "Midnight Oil",
                    progressLevel: .65,
                },
                {
                    restaurantId: 16, // Unique identifier for the restaurant within the dining hall
                    restaurantName: "Asian Bar",
                    progressLevel: 0.75, // Progress level (0 to 1)
                },
                {
                    restaurantId: 17,
                    restaurantName: "Grill",
                    progressLevel: 0.73,
                },
                {
                    restaurantID: 18,
                    restaurantName: "Visiting Chef",
                    progressLevel: .52,
                },
                {
                    restaurantID: 19,
                    restaurantName: "Main Entree",
                    progressLevel: .24,
                },
                {
                    restaurantID: 20,
                    restaurantName: "Subs",
                    progressLevel: .66,
                },
            ],
        },
        {
            diningHallId: 4,
            diningHallName: "Global Village",
            restaurants: [
                {
                    restaurantID: 14,
                    restaurantName: "GV Market",
                    progressLevel: .13,
                },
                {
                    restaurantId: 15,
                    restaurantName: "GV Cantina",
                    progressLevel: .34,
                }
            ]
        }
    ];

    const [occupancyData, setOccupancyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/occupancies');
                const data = await response.json();
                setOccupancyData(data.records); // Access the records array directly
            } catch (error) {
                console.error('Error fetching occupancy data:', error);
            }
        };

        fetchData();
    }, []);

    // const mergedData = occupancyData.map((occupancy) => {
    //     const matchingRestaurant = restaurantData.find(
    //         (restaurant) => restaurant.diningHallId === occupancy.diningHallId
    //     );
    //     if (matchingRestaurant) {
    //         return { ...matchingRestaurant, progressLevel: occupancy.progressLevel };
    //     }
    //     return null; // Handle cases where diningHallId doesn't match
    // });

    const processedOccupancyData = occupancyData.map((occupancy) => ({
        restaurantID: occupancy.fields['dining hall_id'],  // Assuming this is the restaurantID in the API response
        progressLevel: occupancy.fields['normalized_occupancy'],
    }));

    const mergedData = restaurantData.map((restaurant) => {
        const occupancy = processedOccupancyData.find(
            (occ) => occ.restaurantID === restaurant.restaurantId  // Matching with restaurantId
        );
        return {
            ...restaurant,
            progressLevel: occupancy ? occupancy.progressLevel : 0, // Default to 0 if no match
        };
    });

    console.log(mergedData);

    const filteredMergedData = mergedData.filter((data) => data !== null);

    function calculateOverallBusyness(restaurants) {
        const totalBusyness = restaurants.reduce((acc, curr) => acc + curr.progressLevel, 0);
        const averageBusyness = totalBusyness / restaurants.length;

        // Round the average busyness to two decimal places
        const roundedBusyness = averageBusyness.toFixed(2);

        return parseFloat(roundedBusyness); // Convert back to a number for progressLevel
    }

    return (
        <View style={styles.pageContainer}>
            <StatusBar style="auto" />
            <Text style={styles.title}>CrowdServe</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {mergedData.map((diningHall) => (
                    <TouchableOpacity
                        key={diningHall.diningHallId}
                        style={styles.touchableOpacity}
                        onPress={() => toggleModal(diningHall.diningHallName)}
                    >
                        <Tile
                            title={diningHall.diningHallName}
                            progressLevel={calculateOverallBusyness(diningHall.restaurants)}
                            restaurants={diningHall.restaurants}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleModal("Gracies")}>
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
                </TouchableOpacity> */
            /* </ScrollView> */}

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