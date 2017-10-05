import React from 'react';
import ComposeMessage from './ComposeMessage.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toggleMessageBox } from './actions'
import { markSelectedAsRead } from './actions'
import { markSelectedAsUnread } from './actions'
import { selectAllMessages } from './actions'
import { addLabelToMessage } from './actions'
import { removeLabelFromMessage } from './actions'
import { deleteMessages } from './actions'

const Toolbar = ({ messages, visible, messageBoxHandler, markAsReadHandler, markAsUnreadHandler,
                   selectAllHandler, addLabelHandler, removeLabelHandler, deleteMessagesHandler }) => {

// console.log("From Toolbar:" + messages[3].read)
 var unreadMessages = messages.filter(message => {
   if(!message.read){
      return message
    }
 })

 var selectedMessages = messages.filter(message => {
   if(message.selected == true)
    return message
 })

 const messageBoxToggled = (e) => {
   messageBoxHandler(visible);
 }

 const markAsRead = (e) => {

   let ids = selectedMessages.map(message => {
     return message.id
   })
   markAsReadHandler(ids)
 }

 const markAsUnread = (e) => {
   let ids = selectedMessages.map(message => {
     return message.id
   })
   markAsUnreadHandler(ids)
 }

 const setSelectAllCheckbox = (messages) => {
  let controlType = "";

// console.log("Num of Selected Messages: " + selectedMessages.length);
  switch(selectedMessages.length) {
    case 0: controlType = "fa fa-square-o"; break;
    case messages.length: controlType = "fa fa-check-square-o"; break;
    default: controlType = "fa fa-minus-square-o";
  }

  return controlType;

}

const deleteMessages = (e) => {
  let ids = selectedMessages.map(message => {
    return message.id
  })
  deleteMessagesHandler(ids)
}

const selectAll = (e) => {
  let allSelected = false;
  if(selectedMessages.length == messages.length)
    allSelected = true;

  selectAllHandler(allSelected);
}

const addLabel = (e) => {
  let ids = selectedMessages.map(message => {
    return message.id
  })
  addLabelHandler(e.target.value, ids)
}

const removeLabel = (e) => {
  let ids = selectedMessages.map(message => {
    return message.id
  })
  removeLabelHandler(e.target.value, ids)
}

return (
  <div className="row toolbar">
  <div className="col-md-12">

  <a className="btn btn-danger" onClick={messageBoxToggled}>
    <i className="fa fa-plus"></i>
  </a>

  <button className="btn btn-default">
    <i className={setSelectAllCheckbox(messages)} onClick={selectAll}></i>
  </button>

  <button className="btn btn-default" onClick={markAsRead} disabled={selectedMessages.length? 0 : 1}>Mark As Read</button>

  <button className="btn btn-default" onClick={markAsUnread} disabled={selectedMessages.length? 0 : 1}>Mark As Unread</button>

  <select className="form-control label-select" onChange={addLabel}>
     <option>Apply label</option>
     <option value="dev">dev</option>
     <option value="personal">personal</option>
     <option value="gschool">gschool</option>
   </select>


   <select className="form-control label-select" onChange={removeLabel}>
     <option>Remove label</option>
     <option value="dev">dev</option>
     <option value="personal">personal</option>
     <option value="gschool">gschool</option>
   </select>

   <button className="btn btn-default" onClick={deleteMessages}>
     <i className="fa fa-trash-o"></i>
   </button>

   <p className="pull-right">
    <span className="badge badge">{unreadMessages.length}</span>
    unread messages
  </p>




  </div>
  <ComposeMessage visible={visible} />
</div>
)
}

const mapStateToProps = state => ({
  visible: state.messageBox.visible
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addLabelHandler: addLabelToMessage,
    removeLabelHandler: removeLabelFromMessage,
    selectAllHandler: selectAllMessages,
    deleteMessagesHandler: deleteMessages,
    markAsReadHandler: markSelectedAsRead,
    markAsUnreadHandler: markSelectedAsUnread,
    messageBoxHandler: toggleMessageBox, }, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)

// export default Toolbar;
