import { Canvas,SweepGradient,RoundedRect,BlurMask, vec } from "@shopify/react-native-skia";
import React from "react";
import {StyleSheet} from "react-native";

type BackgroundGradientProps = {
  width: number;
  height: number;

};

const BackgroundGradient: React.FC<BackgroundGradientProps> = React.memo(({width, height}) => {
  
  const canvasPadding = 40
  
  return (
  <Canvas style={{width: width+canvasPadding, height: height+canvasPadding}}>
    <RoundedRect 
      x = {canvasPadding / 2}
      y = {canvasPadding / 2}
      width={width}
      height = {height}
      color = {'white'}
      r = {20}>
      <SweepGradient
        c = {vec((width + canvasPadding)/2, (height+ canvasPadding)/2)}
        colors = {['cyan','magenta','yellow','cyan']}
      />
      <BlurMask blur={15} style={'solid'}/>
    </RoundedRect>
  </Canvas>
  );
 },
);


export { BackgroundGradient };
