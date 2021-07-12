import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  LayoutAnimation,
  ImageBackground,
} from "react-native";

import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <ImageBackground
          source={require("../assets/bg.png")}
          style={styles.img}
        >
          <Image
            source={require("../assets/LoginLogo.png")}
            style={{
              marginTop: 120,
              alignSelf: "center",
              width: 200,
              height: 120,
            }}
          ></Image>

          <Text style={styles.greeting}>{"LOGIN TO SHINE"}</Text>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>
          <View style={styles.form}>
            <View>
              <Text style={styles.inputTilte}>Email Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              ></TextInput>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputTilte}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}> LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "#414959" }}>
              New User?{" "}
              <Text style={{ fontWeight: "500", color: "#E9446A" }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "300",
    textAlign: "center",
    color: "dodgerblue",
    fontFamily: "sans-serif-condensed",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "red",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  input: {
    height: 40,
    fontSize: 20,
    color: "midnightblue",
    backgroundColor: "whitesmoke",
    borderColor: "midnightblue",
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 30,
    backgroundColor: "midnightblue",
    borderRadius: 8,
    height: 53,
    alignItems: "center",
    justifyContent: "center",
  },
  inputTilte: {
    color: "dodgerblue",
    fontSize: 17,
    fontFamily: "sans-serif-medium",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
