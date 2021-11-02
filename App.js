import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useCallback} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import firestore from '@react-native-firebase/firestore'



import {Container, Card, UserInfo, UserImgWrapper, UserImg,UserInfoText, UserName, PostTime, MessageText, TextSection,} from './styles/MessageStyles';

import {AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet, ScrollView, Button, FlatList} from 'react-native';

const Stack = createNativeStackNavigator();

//https://www.youtube.com/playlist?list=PLQWFhX-gwJbmrCwksjn77tdl36dIWPFAt --> playlist of tutorials (UI is based on 10th vid)
//This is trial data...will be replaced with firebase stuff after



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwPIEBpT-qbns0vHVmCQm_OJ5tNHuDfOE",
    authDomain: "messagingapp-a0a20.firebaseapp.com",
    databaseURL: "https://messagingapp-a0a20-default-rtdb.firebaseio.com",
    projectId: "messagingapp-a0a20",
    storageBucket: "messagingapp-a0a20.appspot.com",
    messagingSenderId: "25634088239",
    appId: "1:25634088239:web:7ddf4c4c7ceabc46dfedda"
};

// Initialize Firebase

let app

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const firestore = firebase.firestore();

const users = []
const messages = []
let currentUser = '';
let currentUserIndex = 0;

function doThing(){
    firestore.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            users.push(doc.data());
        });
    });
    firestore.collection("Messages").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            messages.push(doc.data());
        });
    });
}


doThing()




//both represent collections
const UserProfiles = [
    {
        id: '1',
        username: 'l',
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

//messages collection has to be structured slightly differently --> rn, each chat has the same common incoming and outgoing messages
//no differentiation being made between different users, obv cant be case irl
const Messages = [
    {
        _id: 1, //message ID
        text: 'Hello developer', //message String
        createdAt: new Date(), //date/time sent
        user: {
            _id: 2, //id of user who SENT (2 --> incoming, 1 --> outgoing)
            name: 'React Native', //uh not sure, prob just name of framework bc this method is from the react native gifted chat library
            avatar: 'https://placeimg.com/140/140/any', //user profile pic
        },
    },
    {
        _id: 2,
        text: 'React Native',
        createdAt: new Date(),
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 3,
        text: 'Hello world v3',
        createdAt: new Date(),
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
]

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
               name="Login"
               component={LoginScreen}
               options={{ title: 'Login' }}
          />
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
          data={recentMessages}
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


const LoginScreen = ({ navigation }) => {
    const [text, setText] = useState('');
    return(
        <View>
            <TextInput
                onChangeText={text => setText(text)}
                defaultValue={text}
            />
            <TouchableHighlight
                                onPress={() => {
                                    currentUser = text
                                    setMessages(text)
                                    navigation.navigate('Home')
                              }}>
                <Text >
                    Send
                </Text>
            </TouchableHighlight>
        </View>
    )

}

function setMessages(){
    let newUser = true
    for (let i = 0; i < users.length; i++){
        console.log('check');
        if (users[i].username === currentUser) {
            newUser = false
            currentUserIndex = i;
        }
    }

    if (newUser){
        currentUserIndex = users.length
        firestore
            .collection('Users')
            .doc(String( currentUserIndex + 1))
            .set({
                username: currentUser
            })
            .then(() => {
                console.log('User added!');
            });
    }
}

const ChatScreen = ({ navigation, route }) => {
  // return <Text> This will display chat history with {route.params.username}</Text>;

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(Messages)
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (props) => {
        return(
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#520f76'
                    },
                    left: {
                        backgroundColor: '#0a4b12'
                    }
                }}
                textStyle={{
                    right:{
                       color: '#fdfdfd',
                    },
                    left:{
                        color: '#fdfdfd',
                    }
                }}
                />
        );
    }


    const renderSend = (props) => {
        return(
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name='send-circle'
                        style={{marginBottom: 3, marginRight:5, marginTop: 3}}
                        size={40}
                        color='#520f76'/>
                </View>
            </Send>
        );
    }

    const scrollToBottomComponent = () => {
        return(
            <FontAwesome name='angle-double-down' size={40} color='#520f76' />
        );
    }

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            alwaysShowSend={true}
            renderSend={renderSend}
            scrollToBottom={true}
            scrollToBottomComponent={scrollToBottomComponent}
        />
    )
};


export default App;

