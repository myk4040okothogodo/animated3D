import React,{useEffect} from 'react';
import {Dimensions, StyleSheet, View, Text} from "react-native";
import { BackgroundGradient } from "./components/BackgroundGradient";
import Animated, {useAnimatedStyle,useSharedValue, withTiming} from "react-native-reanimated";
import { GestureDetector, GestureHandlerRootView, Gesture } from "react-native-gesture-handler";
import {Canvas, useTouchHandler, useValue, runTiming, Extrapolate,interpolate} from "@shopify/react-native-skia";


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEIGHT = 256;
const WIDTH  = SCREEN_WIDTH * 0.9;
const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

const CANVAS_HEIGHT = CARD_HEIGHT;
const CANVAS_WIDTH  = CARD_WIDTH;

const App = () => {

  //const touchedPoint = useValue<{x: number, y: number } | null>(null)

  const rotateX = useValue(0);
  const rotateY = useValue(0);
  const progess = useValue(0);

  const touchHandler = useTouchHandler({

    onStart: (event) => {
      runTiming(progess, 1, {duration: 300 });
      rotateX.value = interpolate(event.y, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP);
      rotateY.value = interpolate(event.x, [0, CARD_HEIGHT], [-10, 10], Extrapolate.CLAMP);
    },
    onActive: (event) => {
      rotateX.value = interpolate(event.y, [0, CARD_WIDTH ],  [-10, 10],  Extrapolate.CLAMP);
      rotateY.value = interpolate(event.x, [0, CARD_HEIGHT], [-10, 10], Extrapolate.CLAMP);
    },
    onEnd: (event) => {
      runTiming(progress, 0, { duration: 300 });
      rotateX.value = null;
      rotateY.value = null;
    }
  })

  const gesture = Gesture.Pan().onUpdate(event => {
    console.log("x :", event.x);
    console.log("Y :", event.y)
    rotateX.value = interpolate(event.y, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP);
    rotateY.value = interpolate(event.x, [0, CARD_HEIGHT], [-10, 10], Extrapolate.CLAMP);
  });
   
  //const rStyle = useAnimatedStyle(() => {
  useEffect(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;
  }, [rotateX.value, rotateY.value]);

  return (
    <View style={styles.container}>
      <BackgroundGradient width={WIDTH} height={HEIGHT}/>
       <Canvas style={{
         width : CANVAS_WIDTH,
         height: CANVAS_HEIGHT,
       }}
       onTouch = {touchHandler}
      >
       <GestureDetector gesture={gesture}>
        <Animated.View
          style = {{
            height: CARD_HEIGHT,
            width : CARD_WIDTH,
            backgroundColor: "black",
            position: "absolute",
            borderRadius: 20,
            zIndex: 300,
            transform: [
              {
                perspective: 300,
              },
              {rotateX: `${rotateX.value}deg` },
              {rotateY: `${rotateY.value}deg` },
            ],
          }}
        >
      </Animated.View>
      </GestureDetector>
     </Canvas>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <App />
    </GestureHandlerRootView>
  )
}
