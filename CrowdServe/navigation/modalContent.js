import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';


const busynessRanges = {
    low: { max: 0.3, text: "Low", color: "#5ebd78", message: "Low - Estimated wait time: 0-5 minutes" },
    moderate: { max: 0.5, text: "Moderate", color: "#71A2DD", message: "Moderate - Estimated wait time: 5-10 minutes" },
    busy: { max: 0.70, text: "Busy", color: "darkorange", message: "Busy - Estimated wait time: 10-15 minutes" },
    "very busy": { max: 1, text: "Very Busy", color: "#f74343", message: "Very Busy - Estimated wait time: 15-20+ minutes" },
};

export default function ModalContent({ diningHallName, restaurants }) {
    if (!Array.isArray(restaurants)) {
        return null;
    }

    // const getBusynessText = () => {
    //     // Check for custom busyness prop first
    //     if (busyness) {
    //         return busyness;
    //     }

    //     // Find the busyness range based on progressLevel
    //     for (const key in busynessRanges) {
    //         if (progressLevel <= busynessRanges[key].max) {
    //             return busynessRanges[key].text;
    //         }
    //     }

    //     return "Unknown";
    // };

    // const getBusynessColor = () => {
    //     // Check for custom busyness prop first
    //     if (busyness) {
    //         return busyness;
    //     }

    //     // Find the busyness range based on progressLevel
    //     for (const key in busynessRanges) {
    //         if (progressLevel <= busynessRanges[key].max) {
    //             return busynessRanges[key].color;
    //         }
    //     }

    //     return "Unknown";
    // };

    // const getBusynessPercentage = () => {
    //     busynessPercentage = (progressLevel * 100 + "%");
    //     return busynessPercentage;
    // };

    function calculateOverallBusyness(restaurants) {
        const totalBusyness = restaurants.reduce((acc, curr) => acc + curr.progressLevel, 0);
        const averageBusyness = totalBusyness / restaurants.length;
        return Math.round(averageBusyness * 100); // Round to nearest whole number
    }

    const overallBusyness = (calculateOverallBusyness(restaurants) / 100);

    const getBusynessColor = (progressLevel) => {
        for (const key in busynessRanges) {
            if (progressLevel <= busynessRanges[key].max) {
                let color = busynessRanges[key].color;
                return color;
            }
        }
        return "Unknown";
    };

    const getBusynessMessage = (progressLevel) => {
        for (const key in busynessRanges) {
            if (progressLevel <= busynessRanges[key].max) {
                return busynessRanges[key].message;
            }
        }
        return "Estimated wait time: Unknown"; // Default message if no match
    };

    return (
        <View style={styles.modalContent}>
            <View style={styles.topProgressContainer}>
                <Progress.Bar
                    color={getBusynessColor(overallBusyness)} // Use getBusynessColor with overallBusyness
                    style={styles.progressBar}
                    progress={overallBusyness} // Convert back to 0-1 range
                    {...topProgressStyle}
                />
                <Text style={styles.topBusynessPercentage}>{overallBusyness * 100}%</Text>
            </View>
            <Text style={styles.diningHallTitle}>{getBusynessMessage(overallBusyness)}</Text>
            {/* <View style={{ borderBottomColor: 'black', width:"80%", borderBottomWidth: StyleSheet.hairlineWidth, }} /> */}
            {restaurants.map((restaurant) => (
                <View key={restaurant.restaurantID} style={styles.restaurantContainer}>
                    <View style={{ borderBottomColor: 'black', paddingBottom: 10, borderBottomWidth: StyleSheet.hairlineWidth, }} />
                    <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
                    <View style={styles.progressContainer}>
                        <Progress.Bar
                            color={getBusynessColor(restaurant.progressLevel)}
                            style={styles.progressBars}
                            progress={restaurant.progressLevel}
                            {...progressStyle}
                        />
                        <Text style={styles.busynessPercentage}>
                            {Math.ceil(restaurant.progressLevel * 100)}%
                        </Text>
                    </View>
                    <Text style={styles.restaurantBusynessText}>{getBusynessMessage(restaurant.progressLevel)}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    restaurantContainer: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        maxHeight: 90,
    },
    tile: {
        backgroundColor: '#E7E7E7',
        width: '100%',
        height: 340,
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
    topProgressContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "7%",
        top: 5,
    },
    progressContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // height: "20%",
        top: 4,
    },
    progressBar: {
        height: "70%",
    },
    // progressBars: {
    //     height: "50%",
    // },
    progressText: {
        color: '#454545',
        height: 'auto',
        fontSize: 12,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    restaurantName: {
        paddingTop: 12,
        fontWeight: "bold",
        color: '#454545',
        fontSize: 18,
    },
    busynessPercentage: {
        fontSize: 15,
        fontWeight: "bold",
        color: '#454545',
    },
    topBusynessPercentage: {
        fontSize: 17,
        fontWeight: "bold",
        color: '#454545',
        right: 15,
    },
    diningHallTitle: {
        left: 20,
        fontSize: 15,
        fontWeight: "bold",
        top:2,
        paddingRight:20
    },
    restaurantBusynessText: {
        left:1,
        paddingTop:10,
        paddingBottom:30,
    },
});

const topProgressStyle = {
    width: 250,
    height: 30,
    borderRadius: 15,
    left: 20,
}

const progressStyle = {
    // color: "grey",
    width: 225,
    height: 16,
    borderRadius: 15,
}
//     tile: {
//         backgroundColor: '#E7E7E7',
//         width: '100%',
//         height: 340,
//         borderRadius: '10%',
//         padding: 10,
//         shadowColor: 'black',
//         shadowOffset: {
//             width: 5,
//             height: 10,
//         },
//         shadowOpacity: .25,
//         shadowRadius: 3.5,
//         elevation: 5
//     },
//     tileTitle: {
//         color: '#454545',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     topProgressContainer: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         height: "7%",
//         top: 5,
//     },
//     progressContainer: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         height: "3.5%",
//         top: 5,
//     },
//     progressBar: {
//         height: "60%",
//     },
//     // progressBars: {
//     //     height: "50%",
//     // },
//     progressText: {
//         color: '#454545',
//         height: 'auto',
//         fontSize: 12,
//         fontWeight: 'bold',
//         paddingBottom: 5
//     },
//     restaurantName: {
//         paddingTop: 12,
//         fontWeight: "bold",
//         color: '#454545',
//     },
//     busynessPercentage: {
//         fontSize: 11,
//         fontWeight: "bold",
//         color: '#454545',
//     },
// });