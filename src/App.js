import React, { Component } from 'react';
import Toolbar from './Toolbar.js';
import MessageList from './MessageList.js';
import ComposeMessage from './ComposeMessage.js'
import seedMessages from './Seed.js'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

import logo from './logo.svg';
import './App.css';



class App extends Component {
constructor(props) {
    super(props)
    let newMessages = seedMessages.messages.map(message => (
      message = {...message,selected: message.selected? true : false,  defaultChecked: message.selected
      }));

    this.state = { messages: newMessages };
  }

toggleStar = (idx, isStarred) => {
  // console.log("Index:" + idx + " " + "isStarred: " + isStarred)
  var newState = {...this.state};
  newState.messages[idx].starred = isStarred;
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

markSelectedAsRead = (updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};
  // newState.messages = updatedMessages;

  // newState.messages.map(message => {
  //   console.log(message)
  // })
  this.setState(newState);
  }

markSelectedAsUnread = (updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};
  // newState.messages = updatedMessages;

  // newState.messages.map(message => {
  //   console.log(message)
  // })
  this.setState(newState);
  }

deleteSelectedMessages = (updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};
  this.setState(newState);
}

removeSelectedLabels = (updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};
  this.setState(newState);
}

addSelectedLabels = (updatedMessages) => {
  var newState = {...this.state, messages: updatedMessages};
  this.setState(newState);
}


  render() {
    return (
      <div>
        <Toolbar messages={this.state.messages} selectAllHandler={this.updateSelectedMessages}
                 markAsReadHandler={this.markSelectedAsRead} markAsUnreadHandler={this.markSelectedAsUnread}
                 deleteMessagesHandler={this.deleteSelectedMessages} removeLabelHandler={this.removeSelectedLabels} addLabelHandler={this.addSelectedLabels} />
        <ComposeMessage />
        <MessageList messages={this.state.messages}
                     starHandler={this.toggleStar}
                     selectedHandler={this.toggleSelect} />
      </div>
    );
  }
}

export default App;
