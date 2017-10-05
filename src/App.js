import React, { Component } from 'react';
import Toolbar from './Toolbar.js';
import MessageList from './MessageList.js';
import ComposeMessage from './ComposeMessage.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { toggleMessageBox } from './actions'

// <Toolbar />
// <ComposeMessage  visible={visible}/>

const App = ({ messages, visible, messagesById}) => (
  ((messages.length > 0) ? (
    <div>
    <Toolbar messages={messages} />
    <MessageList messages={messages} />
    </div>):
    (<div>Loading...</div>))
)

const mapStateToProps = state => ({
  messages: state.messages.all,
  messagesById: state.messages.byId
})

const mapDispatchToProps = dispatch => bindActionCreators({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
