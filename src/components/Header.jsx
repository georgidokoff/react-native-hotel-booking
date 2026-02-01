import { Text, View, Image } from "react-native";

export default function Header({
  imageSource,
  title,
  styles = { container, image, text },
}) {
  console.log(styles)
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />

      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
