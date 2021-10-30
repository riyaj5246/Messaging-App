import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useCallback} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import {Container, Card, UserInfo, UserImgWrapper, UserImg,UserInfoText, UserName, PostTime, MessageText, TextSection,} from './styles/MessageStyles';

import {AppRegistry, Text, View, TextInput, TouchableHighlight, StyleSheet, ScrollView, Button, FlatList} from 'react-native';

const Stack = createNativeStackNavigator();

//https://www.youtube.com/playlist?list=PLQWFhX-gwJbmrCwksjn77tdl36dIWPFAt --> playlist of tutorials (UI is based on 10th vid)
//This is trial data...will be replaced with firebase stuff after
//both represent collections
const UserProfiles = [
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
        text: 'Hello world',
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
          data={UserProfiles}
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

