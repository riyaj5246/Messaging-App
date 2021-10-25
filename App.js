import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

export default class App extends Component {
  state = {
    recipient: ' ',
    message: ' ',
  }

  render() {
    return (
        <View style={styles.container}>

          <View style={styles.bar}>

            <View style={styles.titleBox}>

              <Text style={styles.titleText}>
                New Message
              </Text>

            </View>

            <View style={styles.cancelBox}>

              <Text style={styles.blueText}>
                Cancel
              </Text>

            </View>
          </View>
          <View style={styles.bar}>
            <View style={styles.recipientBox}>
              <Text style={styles.recipientText}>
                To:
              </Text>
            </View>
            <TextInput style={styles.recipientInput}
                       onChangeText={(recipient) => this.setState({recipient})}
                       value={this.state.recipient}
            />
          </View>

          <View style={styles.whiteBox}>
          </View>

          <View style={styles.bar}>
            <TextInput style={styles.messageInput}
                       onChangeText={(message) => this.setState({message})}
                       value={this.state.message}
            />
            <TouchableHighlight style={styles.sendBox}
                                onPress={() => {
                                  alert(this.state.recipient + ' received your message: ' + this.state.message)
                                }}>
              <Text style={styles.blueText}>
                Send
              </Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bar: {
    flexDirection: 'row',
    width: 415,
   //height: 125,
    backgroundColor: '#edeceb',
  },
  titleBox: {
    width: 300,
    height: 125,
    justifyContent: 'center',
    backgroundColor: '#edeceb',
  },
  titleText: {
    textAlign: 'center',
    paddingTop: 40,
    paddingLeft: 55,
    fontSize: 30,
    fontFamily: 'Arial',
  },
  cancelBox: {
    height: 100,
    width: 115,
    justifyContent: 'center',
    paddingTop: 70,
    paddingRight: 20,
    backgroundColor: '#edeceb',
  },
  blueText: {
    color: 'blue',
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  recipientBox: {
    height: 50,
    width: 50,
    backgroundColor: '#edeceb',
    justifyContent: 'center',
    borderTopColor: '#a19f9d',
    borderTopWidth: 5,
  },
  recipientText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Arial',
    color: '#a19f9d',
  },
  recipientInput: {
    height: 50,
    width: 375,
    fontSize: 16,
    backgroundColor: '#edeceb',
    borderTopColor: '#a19f9d',
    borderTopWidth: 5,
  },
  whiteBox: {
    height: 650,
  },
  messageInput: {
    height: 40,
    width: 325,
    fontSize: 20,
    borderColor: '#a19f9d',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 5,
  },
  sendBox: {
    marginLeft: 15,
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
});
