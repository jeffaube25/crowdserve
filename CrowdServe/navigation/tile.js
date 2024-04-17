import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';


const busynessRanges = {
    low: { max: 0.3, text: "Low", color: "#5ebd78" },
    moderate: { max: 0.5, text: "Moderate", color: "#71A2DD" },
    busy: { max: 0.70, text: "Busy", color: "darkorange" },
    "very busy": { max: 1, text: "Very Busy", color: "#f74343" },
};


export default function Tile({ title, progressLevel, restaurants }) {
    const getBusynessText = () => {
        // Find the busyness range based on progressLevel
        for (const key in busynessRanges) {
            if (progressLevel <= busynessRanges[key].max) {
                return busynessRanges[key].text;
            }
        }

        return "Unknown";
    };

    const getBusynessColor = () => {
        // Find the busyness range based on progressLevel
        for (const key in busynessRanges) {
            if (progressLevel <= busynessRanges[key].max) {
                return busynessRanges[key].color;
            }
        }

        return "Unknown";
    };

    const getBusynessPercentage = () => {
        const busynessPercentage = Math.ceil(progressLevel * 100) + "%"; // Round to one decimal place
        return busynessPercentage;
    };

    return (
        <View style={styles.tile}>
            <Text style={styles.tileTitle}>{title}</Text>
            {/* Top Progress Bar for Overall Busyness */}
            <View style={styles.topProgressContainer}>
                <Progress.Bar color={getBusynessColor()} style={styles.progressBar} progress={progressLevel} {...topProgressStyle} />
                <Text>{getBusynessPercentage()}</Text>
            </View>
            <Text style={styles.progressText}>{getBusynessText()}</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, }} />

            {/* Rendering Restaurants Dynamically */}
            {restaurants && restaurants.map((restaurant) => (
                <View key={restaurant.restaurantId} style={styles.restaurantContainer}>
                    <Text style={styles.restaurantName}>{restaurant.restaurantName}</Text>
                    <View style={styles.progressContainer}>
                        <Progress.Bar style={styles.progressBars} progress={restaurant.progressLevel} {...progressStyle} />
                        <Text style={styles.busynessPercentage} >{((restaurant.progressLevel) * 100).toFixed(0) + "%"}</Text>
                    </View>
                </View>
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
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
        height: "60%",
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
    },
    busynessPercentage: {
        fontSize: 11,
        fontWeight: "bold",
        color: '#454545',
    },
});

const topProgressStyle = {
    width: 115,
    height: 17,
    borderRadius: 15,
}

const progressStyle = {
    color: "grey",
    width: 100,
    height: 11.2,
    borderRadius: 15,
}