import LottieView from "lottie-react-native";
import React from "react";

const Done = ({ onAnimationFinish }) => {
  return (
    <LottieView
      loop={false}
      autoPlay
      onAnimationFinish={onAnimationFinish}
      source={require("../assets/animations/done.json")}
    />
  );
};

export default Done;
