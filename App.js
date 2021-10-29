import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
} from './styles/MessageStyles';

import {
    AppRegistry,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    Button,
    FlatList
} from 'react-native';

// export default class App extends Component {
//   state = {
//     recipient: ' ',
//     message: ' ',
//     messageSent: false,
//   }
//
//   render() {
//     return (
//         <View style={styles.container}>
//
//           <View style={styles.bar}>
//
//             <View style={styles.titleBox}>
//
//               <Text style={styles.titleText}>
//                 New Message2
//               </Text>
//
//             </View>
//
//             <View style={styles.cancelBox}>
//
//               <Text style={styles.blueText}>
//                 Cancel
//               </Text>
//
//             </View>
//           </View>
//           <View style={styles.bar}>
//             <View style={styles.recipientBox}>
//               <Text style={styles.recipientText}>
//                 To:
//               </Text>
//             </View>
//             <TextInput style={styles.recipientInput}
//                        onChangeText={(recipient) => this.setState({recipient})}
//                        value={this.state.recipient}
//             />
//           </View>
//
//           <View style={styles.whiteBox}>
//             <Text>
//               {this.state.message}
//             </Text>
//           </View>
//
//           <View style={styles.bar}>
//             <TextInput style={styles.messageInput}
//                        onChangeText={(message) => this.setState({message})}
//                        value={this.state.message}
//             />
//             <TouchableHighlight style={styles.sendBox}
//                                 onPress={() => {
//                                   this.state.messageSent = true
//                                   alert(this.state.recipient + ' received your message: ' + this.state.message)
//                                 }}>
//               <Text style={styles.blueText}>
//                 Send
//               </Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   bar: {
//     flexDirection: 'row',
//     width: 415,
//    //height: 125,
//     backgroundColor: '#edeceb',
//   },
//   titleBox: {
//     width: 300,
//     height: 125,
//     justifyContent: 'center',
//     backgroundColor: '#edeceb',
//   },
//   titleText: {
//     textAlign: 'center',
//     paddingTop: 40,
//     paddingLeft: 55,
//     fontSize: 30,
//     fontFamily: 'Arial',
//   },
//   cancelBox: {
//     height: 100,
//     width: 115,
//     justifyContent: 'center',
//     paddingTop: 70,
//     paddingRight: 20,
//     backgroundColor: '#edeceb',
//   },
//   blueText: {
//     color: 'blue',
//     fontSize: 20,
//     fontFamily: 'Arial',
//     textAlign: 'center',
//   },
//   recipientBox: {
//     height: 50,
//     width: 50,
//     backgroundColor: '#edeceb',
//     justifyContent: 'center',
//     borderTopColor: '#a19f9d',
//     borderTopWidth: 5,
//   },
//   recipientText: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontFamily: 'Arial',
//     color: '#a19f9d',
//   },
//   recipientInput: {
//     height: 50,
//     width: 375,
//     fontSize: 16,
//     backgroundColor: '#edeceb',
//     borderTopColor: '#a19f9d',
//     borderTopWidth: 5,
//   },
//   whiteBox: {
//     height: 650,
//   },
//   messageInput: {
//     height: 40,
//     width: 325,
//     fontSize: 20,
//     borderColor: '#a19f9d',
//     borderWidth: 1,
//     borderRadius: 10,
//     marginLeft: 10,
//     marginTop: 5,
//   },
//   sendBox: {
//     marginLeft: 15,
//     height: 50,
//     width: 50,
//     justifyContent: 'center',
//   },
// });
const Stack = createNativeStackNavigator();

//LEFT OFF AT 9:41...starting to work on individual chat ui
//This is trial data...will be replaced with firebase stuff after
const Messages = [
    {
        id: '1',
        username: 'Jenny Doe',
        userImg: require('./assets/favicon.png'),
        messageTime: '4 min ago',
        messageText: 'Hey there, this is a test for React Native',
    },
    {
        id: '2',
        username: 'John Doe',
        userImg: require('./assets/favicon.png'),
        messageTime: '2 min ago',
        messageText: 'Bye, this is test 2 for React Native',
    },
    {
        id: '3',
        username: 'Riya Jain',
        userImg: require('./assets/favicon.png'),
        messageTime: '4 min ago',
        messageText: 'Text 3',
    },
    {
        id: '4',
        username: 'Arjun Gopal',
        userImg: require('./assets/favicon.png'),
        messageTime: '2 min ago',
        messageText: 'Text 4',
    }
]


const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Messages' }}
          />
          <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={({route})=>({
                  title: route.params.username,
                  headerBackTitleVisible: false
              })}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
      <Container>
          <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({item}) =>(
              <Card onPress={() =>
                  navigation.navigate('Chat', {username:item.username})
              }>
                  <UserInfo>
                      <UserImgWrapper>
                          <UserImg source={item.userImg}/>
                      </UserImgWrapper>
                      <TextSection>
                          <UserInfoText>
                              <UserName> {item.username}</UserName>
                              <PostTime> {item.messageTime}</PostTime>
                          </UserInfoText>
                          <MessageText>
                              {item.messageText}
                          </MessageText>
                      </TextSection>
                  </UserInfo>
              </Card>

          )}
      />
      </Container>
  )
};

const ChatScreen = ({ navigation, route }) => {
  return <Text> This will display chat history with {route.params.username}</Text>;
};

export default App;

