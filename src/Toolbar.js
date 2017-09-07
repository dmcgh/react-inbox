import React from 'react';

const Toolbar = ({messages, selectAllHandler, markAsReadHandler, markAsUnreadHandler, deleteMessagesHandler, removeLabelHandler, addLabelHandler}) => {


  let selectedMessages = messages.filter(message => {
    // console.log(message);
    return message.selected === true;
  });
  // console.log(selectedMessages.length)

  let currentNumMessages = messages.length;
  let unreadMessages = messages.filter(message => {
    return message.read === false;
  })

  // console.log(unreadMessages.length);

const setSelectAllCheckbox = (messages) => {
  let controlType = "";

// console.log("Num of Selected Messages: " + selectedMessages.length);
  switch(selectedMessages.length) {
    case 0: controlType = "fa fa-square-o"; break;
    case currentNumMessages: controlType = "fa fa-check-square-o"; break;
    default: controlType = "fa fa-minus-square-o";
  }

  return controlType;

}

const selectAllMessages = (e) => {
  e.preventDefault();
  let updatedMessages = [];
  // console.log("Selected Messages: " + selectedMessages.length);
  switch(selectedMessages.length) {
    case currentNumMessages: updatedMessages = messages.map(message => (message = {...message, selected: false, defaultChecked: false,})); break;
    default: updatedMessages = messages.map(message => (message = {...message, selected: true, defaultChecked: true,}))
  }

  // updatedMessages.map(message => {
  //   console.log(message)
  // })
  // selectedMessages.map(message => {
  //   console.log(message)
  // })
  selectAllHandler(updatedMessages)
}

const markAsRead = (e) => {
  e.preventDefault();
  let newMessages = messages.map(message => {
    if((message.selected === true) && (!message.read))
      message = { ...message, read: true}
    return message;
  })

  // newMessages.map(message => {
  //   console.log(message);
  // })

  markAsReadHandler(newMessages);
}

const markAsUnread = (e) => {
  e.preventDefault();
  let newMessages = messages.map(message => {
    if((message.selected === true) && (message.read))
      message = { ...message, read: false}
    return message;
  })

  // newMessages.map(message => {
  //   console.log(message);
  // })

  markAsUnreadHandler(newMessages);
}

const deleteMessages = (e) => {
  e.preventDefault();
  let newMessages = messages.filter(message => {
    console.log(message.selected);
    return message.selected === false;
  });
  console.log(newMessages.length);
  deleteMessagesHandler(newMessages);
}

const removeLabel = (e) => {
  let newMessages = messages.map(message => {
    let idx = message.labels.indexOf(e.target.value);
    // console.log(idx)
    if(idx != -1 && message.selected) {
      message.labels.splice(idx, 1);
      message = {...message, labels: message.labels}
    }
    else
      message = {...message}

    return message;
  })
  removeLabelHandler(newMessages);
}

const addLabel = (e) => {
  let newMessages = messages.map(message => {
    let idx = message.labels.indexOf(e.target.value);
    if(idx === -1 && message.selected) {
      message.labels.push(e.target.value);
      message = {...message, labels: message.labels};
      }
    else {
      message = {...message};
    }
    return message;
  })
  addLabelHandler(newMessages);
}


return(
  <div className="row toolbar">
  <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{unreadMessages.length}</span>
      unread messages
    </p>

    <a className="btn btn-danger">
      <i className="fa fa-plus"></i>
    </a>

    <button className="btn btn-default">
      <i className={setSelectAllCheckbox(messages)} onClick={selectAllMessages}></i>
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
  </div>
</div>
)
}

export default Toolbar;
