import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Tile from '../navigation/tile';
import Modal from 'react-native-modal';
import { useState } from 'react';
import ModalContent from '../navigation/modalContent';
import React, { useEffect } from 'react';

const TileScreen = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTileData, setSelectedTileData] = useState(null);

    const toggleModal = (title) => {
        setIsModalVisible(!isModalVisible);
        setSelectedTileData(title); // Store clicked tile title (temporary data)
    };

    const restaurantData = [
        {
            diningHallId: 1, // Unique identifier for the dining hall
            diningHallName: "Campus Center",
            restaurants: [
                {
                    restaurantID: 1, // Unique identifier for the restaurant within the dining hall
                    restaurantName: "Nathan's",
                    progressLevel: 0.75, // Progress level (0 to 1)
                },
                {
                    restaurantID: 2,
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
                    restaurantID: 7, // Unique identifier for the restaurant within the dining hall
                    restaurantName: "Beanz",
                    progressLevel: 0.75, // Progress level (0 to 1)
                },
                {
                    restaurantID: 8,
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
                    restaurantID: 16, // Unique identifier for the restaurant within the dining hall
                    restaurantName: "Asian Bar",
                    progressLevel: 0.83, // Progress level (0 to 1)
                },
                {
                    restaurantID: 17,
                    restaurantName: "Grill",
                    progressLevel: 0.88,
                },
                {
                    restaurantID: 18,
                    restaurantName: "Visiting Chef",
                    progressLevel: .72,
                },
                {
                    restaurantID: 19,
                    restaurantName: "Main Entree",
                    progressLevel: .93,
                },
                {
                    restaurantID: 20,
                    restaurantName: "Subs",
                    progressLevel: .69,
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
                    restaurantID: 15,
                    restaurantName: "GV Cantina",
                    progressLevel: .34,
                },
                {
                    restaurantID: 21,
                    restaurantName: "Bar",
                    progressLevel: .34,
                },
                {
                    restaurantID: 22,
                    restaurantName: "Rotating Menu",
                    progressLevel: .54,
                }
            ]
        }
    ];

    const [occupancyData, setOccupancyData] = useState(null); // Initialize as null
    const [isLoading, setIsLoading] = useState(true);
    const [updatedRestaurantData, setUpdatedRestaurantData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/finaltable');

                if (!response.ok) { // Check for HTTP status errors
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                // console.log("API Response:", data);
                setOccupancyData(data); // Access the records array (adjust if necessary)
            } catch (error) {
                console.error('Error fetching occupancy data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (occupancyData) {
            const updatedData = restaurantData.map((diningHall) => {
                const updatedRestaurants = diningHall.restaurants.map((restaurant) => {
                    const matchingOccupancy = occupancyData.find(
                        (occ) => occ.restaurantID === restaurant.restaurantID
                    );
                    return {
                        ...restaurant,
                        progressLevel: matchingOccupancy ? matchingOccupancy.progressLevel : restaurant.progressLevel,
                    };
                });
                return { ...diningHall, restaurants: updatedRestaurants };
            });
            setUpdatedRestaurantData(updatedData);
        }
    }, [occupancyData]);

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
                {isLoading ? (
                    <ActivityIndicator size="large" color="grey" /> // Loading indicator
                ) : (
                    updatedRestaurantData.map((diningHall) => (
                        <TouchableOpacity
                            key={diningHall.diningHallId}
                            style={styles.touchableOpacity}
                            onPress={() => toggleModal(diningHall)}
                        >
                            <Tile
                                title={diningHall.diningHallName}
                                progressLevel={calculateOverallBusyness(diningHall.restaurants)}
                                restaurants={diningHall.restaurants}
                            />
                        </TouchableOpacity>
                    )))}
            </ScrollView>

            <Modal onBackdropPress={toggleModal} isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{selectedTileData ? selectedTileData.diningHallName : 'No tile selected yet'}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: "red" }}>X</Text>
                    </TouchableOpacity>
                    <View style={{ top: 100, height: "100%", width: "100%" }}>
                        <ScrollView contentContainerStyle={styles.modalScrollContainer}>
                            {selectedTileData && ( // Render only if data is available
                                <ModalContent
                                    restaurants={selectedTileData.restaurants}
                                />
                            )}
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
        // flexDirection: 'row',
        // // flexWrap: 'wrap',
        // // gap: 15,
        // alignItems: 'center',
        // justifyContent: 'center',
        // // paddingBottom: 75,
        // height:"100%",
        // flex:1,
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