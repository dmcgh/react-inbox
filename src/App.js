import React, { Component } from 'react';
import Toolbar from './Toolbar.js';
import MessageList from './MessageList.js';
import ComposeMessage from './ComposeMessage.js'
// import seedMessages from './Seed.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

import logo from './logo.svg';
import './App.css';



class App extends Component {
constructor(props) {
    super(props)

    //need to simplfy to not need to initialize data or add a default checked variable
    // let newMessages = seedMessages.messages.map(message => (
    //   message = {...message,selected: message.selected? true : false,  defaultChecked: message.selected
    //   }));
      this.state = { messages: [], compose: false };
    // this.state = { messages: newMessages };
  }

async componentDidMount() {
  const response = await fetch('http://localhost:8008/api/messages');
  const json = await response.json();
  // console.log(json._embedded.messages);
  let serverMessages = json._embedded.messages;

  var newState = {...this.state, messages: []};
  console.log("Component Did Mount::");
  newState.messages = serverMessages.map(message => {
    message = {...message, selected: message.selected? true : false};
    message = {...message, defaultChecked: message.selected }
    // console.log(message);
    return message;
  })
  // console.log(messages);
  this.setState(newState);
}


toggleStar = async(idx, isStarred) => {
  // console.log("Index:" + idx + " " + "isStarred: " + isStarred)
  var newState = {...this.state};
  newState.messages[idx].starred = isStarred;
  let id = newState.messages[idx].id;
  // console.log(newState.messages[idx]);

  const response = await fetch('http://localhost:8008/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({'messageIds': [id], 'command': 'star', 'star': isStarred}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  // console.log(json);
  this.setState(newState);
}

toggleSelect = (idx, isSelected) => {
  // console.log("Index:" + idx + " " + "isSelected: " + isSelected)
  var newState = {...this.state};
  newState.messages[idx].selected = isSelected;
  newState.messages[idx].defaultChecked = isSelected;
  // console.log(newState.messages[idx].defaultChecked);
  this.setState(newState);
}

updateSelectedMessages = (updatedMessages) => {
  // console.log("Updating State")
  var newState = {...this.state};
  newState.messages = updatedMessages;
  this.setState(newState);
  }

markSelectedAsRead = async(updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};
  // newState.messages = updatedMessages;
  const ids = updatedMessages.map(message => {
      if(message.selected)
      return message.id;
  }).filter(value => {
    return value !== null;
  });

  const response = await fetch('http://localhost:8008/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({'messageIds': ids, 'command': 'read', 'read': true}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  // newState.messages.map(message => {
  //   console.log(message)
  // })
  this.setState(newState);
  }

markSelectedAsUnread = async(updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};
  // newState.messages = updatedMessages;

  const ids = updatedMessages.map(message => {
      if(message.selected)
      return message.id;
  }).filter(value => {
    return value !== null;
  });

  const response = await fetch('http://localhost:8008/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({'messageIds': ids, 'command': 'read', 'read': false}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  // newState.messages.map(message => {
  //   console.log(message)
  // })
  this.setState(newState);
  }

deleteSelectedMessages = async(updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};

  const ids = updatedMessages.map(message => {
      if(message.selected)
      return message.id;
  }).filter(value => {
    return value !== null;
  });

  const response = await fetch('http://localhost:8008/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({'messageIds': ids, 'command': 'delete'}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  this.setState(newState);
}

removeSelectedLabels = async(updatedMessages, labelToRemove) => {
  var newState = {...this.state, messages: updatedMessages};

  const ids = updatedMessages.map(message => {
      if(message.selected)
      return message.id;
  }).filter(value => {
    return value !== null;
  });

  var jsonBody = JSON.stringify({'messageIds': ids, 'command': 'removeLabel', 'label': labelToRemove });
  console.log(jsonBody);
  const response = await fetch('http://localhost:8008/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({'messageIds': ids, 'command': 'removeLabel', 'label': labelToRemove }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  this.setState(newState);
}

addSelectedLabels = async(updatedMessages, labelToAdd) => {
  var newState = {...this.state, messages: updatedMessages};

  const ids = updatedMessages.map(message => {
      if(message.selected)
      return message.id;
  }).filter(value => {
    return value !== null;
  });

  const response = await fetch('http://localhost:8008/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({'messageIds': ids, 'command': 'addLabel', 'label': labelToAdd }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  this.setState(newState);
}

handleCompose = () => {
  var newState = {  ...this.state, compose: !this.state.compose };
  this.setState(newState);
}

createNewMessage = async (subject, body) => {
  console.log(subject + " " + body);
  var newState = this.state;
  const response = await fetch('http://localhost:8008/api/messages', {
      method: 'POST',
      body: JSON.stringify({'subject': subject, 'body': body}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const newMessage = await response.json();
    newState.messages.push(newMessage);

  this.setState(newState);
}


  render() {
    return (
      <div>
        <Toolbar messages={this.state.messages} selectAllHandler={this.updateSelectedMessages} composeMessageHandler={this.handleCompose}
                 markAsReadHandler={this.markSelectedAsRead} markAsUnreadHandler={this.markSelectedAsUnread}
                 deleteMessagesHandler={this.deleteSelectedMessages} removeLabelHandler={this.removeSelectedLabels} addLabelHandler={this.addSelectedLabels} />

        <ComposeMessage visible={this.state.compose} createMessageHandler={this.createNewMessage} />
        <MessageList messages={this.state.messages}
                     starHandler={this.toggleStar}
                     selectedHandler={this.toggleSelect} />
      </div>
    );
  }
}

export default App;
