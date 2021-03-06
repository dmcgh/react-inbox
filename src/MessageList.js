import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleMessageStar } from './actions'
import { toggleSelectMessage } from './actions'


const MessageList = ({ messages, selectMessage, starHandler, selectedHandler }) => {

  const messageStatus = (message) => {
    let read;
    let selected;

    // console.log("From MessageList: " + message.defaultChecked)
    // console.log(message.read)
    if(!message.read)
      read = "unread";
    else
      read = "read";

    if(message.selected){
      selected = "selected";
      message.defaultChecked = true;
    }

    else {
      selected = " ";
      message.defaultChecked = false;
    }

    console.log("From MessageList: " + "row message " + read + " " + selected)
    return "row message " + read + " " + selected;
  }

  const messageStarred = (message) => {
     if(message.starred) {
      return "star fa fa-star";
    } else
      return "star fa fa-star-o";
  }


  const toggleStarred = (e) => {
    e.preventDefault();
    let isStarred = false;
    if(e.target.className.includes('-o')) {
      isStarred = true;
    }
    console.log(isStarred);
    starHandler(e.target.id, isStarred)
  }

  const toggleSelected = (e) => {
    // console.log("DefaultChecked: " + e.target.defaultChecked + " " + "Checked: " + e.target.checked)
    selectedHandler(e.target.id, e.target.checked)
  }

  return (
    <div>
  {messages.map((message, idx) => {
    return (
      <div id={idx} key={idx} className={messageStatus(message)} >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input id={message.id} key={idx} type="checkbox" checked={message.defaultChecked} onChange={toggleSelected}/>
          </div>
          <div className="col-xs-2">
            <i id={message.id} key={idx} className={messageStarred(message)} onClick={toggleStarred}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
      {message.labels.map((label, labelIdx) => (
        <span id={idx} key={labelIdx} className="label label-warning">{label}</span>
      ))}
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>)
})}
  </div>)
}

const mapStateToProps = state => ({
  messages: state.messages.all
})

const mapDispatchToProps = dispatch => bindActionCreators({
  starHandler: toggleMessageStar,
  selectedHandler: toggleSelectMessage, }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList)
