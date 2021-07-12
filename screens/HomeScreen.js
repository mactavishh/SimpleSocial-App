import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
  Image,
} from "react-native";
import Fire from "../Fire";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.ref = Fire.shared.firestore.collection("posts");
    this.useref = this.state = {
      dataSource: [],
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.feedPosts);
  }

  feedPosts = (postSnapShot) => {
    const post = [];
    postSnapShot.forEach((doc) => {
      const { uid, text, timestamp, image } = doc.data();
      let avatar = "dwe";
      let name = "ewfj";
      const data = Fire.shared.firestore
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          post.push({
            avatar: doc.data().avatar,
            name: doc.data().name,
            uid,

            text,
            timestamp,
            image,
          });
          this.setState({
            dataSource: post,
          });
        });
    });
  };

  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image
          source={
            post.avatar
              ? { uri: post.avatar }
              : require("../assets/images/avatar.png")
          }
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name ? post.name : ""}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <Text style={styles.post}>{post.text}</Text>

          <View style={{ flexDirection: "row-reverse" }}>
            <Ionicons
              name="ios-chatbox"
              size={20}
              color="#73788B"
              style={{ marginRight: 18 }}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.dataSource}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.uid}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
  },
  header: {
    paddingTop: 28,
    paddingBottom: 16,
    backgroundColor: "#483d8b",
    alignItems: "center",
    borderBottomWidth: 1,
    justifyContent: "center",
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "aliceblue",
  },
  feed: {
    marginHorizontal: 16,
    color: "aliceblue",
  },
  feedItem: {
    backgroundColor: "snow",
    borderRadius: 5,
    padding: 8,
    paddingVertical: 20,
    flexDirection: "column",
    marginVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 20,
    color: "black",
    fontFamily: "sans-serif-medium",
  },
  postImage: {
    width: 300,
    height: 200,
    borderRadius: 2,
    marginVertical: 16,
    resizeMode: "cover",
  },
});
