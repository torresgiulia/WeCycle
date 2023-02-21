import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import Svg, {Path} from 'react-native-svg';

//{/* style={styles.svgGapFiller} */}  

const TabBarButton = props => {
    const {children, accessibilityState, onPress} = props;
    if(accessibilityState.selected){
        return(
            <View style={styles.btnContainer}>
                <View style={{flexDirection: 'row'}}>
                    <View >                      
                        <Svg width={71} height={58} viewBox="0 0 75 61">
                            <Path 
                                d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                                fill={"white"}
                            />
                        </Svg>                       
                    </View>
                </View>
                <TouchableOpacity onPress={onPress} style={styles.btnActive}>
                    <Text>{children}</Text>
                </TouchableOpacity>
            </View>
            
        );
    }
    else{
        return(
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onPress} style={styles.btnInactive}>
                    <Text>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
};

export default TabBarButton;
const styles = StyleSheet.create({
    btnActive:{
        flex: 1,
        position: 'absolute',
        width: 50,
        height: 50,
        top: -22,
        borderRadius: 50 / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5 
    },
    btnInactive:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer:{
        flex: 1,
        alignItems: 'center'
    },
    svgGapFiller:{
        flex: 1,
        backgroundColor: 'white'
    }
})