import { Text, TextProps, StyleSheet } from "react-native";

export function StyledText(props: TextProps) {
  return <Text {...props} style={[styles.text, props.style]} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins",
  },
});