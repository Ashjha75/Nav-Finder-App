import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    // <View style={styles.container} className="bg-[#166268]">
    //   <View style={styles.main}>
    //     <Text style={styles.title} className="text-3xl">Hello Bitch👀</Text>
    //     <Text style={styles.subtitle}>This is the first page of your app.</Text>
    //   </View>
    // </View>
    <View className="flex-1 items-center justify-center ">
      <Text className="text-white">Open up App.js to start working on your app!</Text>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   // title: {
//   //   fontSize: 64,
//   //   fontWeight: "bold",
//   // },
//   subtitle: {
//     fontSize: 36,
//     color: "#38434D",
//   },
// });
