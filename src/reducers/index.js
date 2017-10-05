import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED } from '../actions'
import { TOGGLE_COMPOSE_MESSAGE } from '../actions'
import { CREATE_MESSAGE } from '../actions'
import { TOGGLE_STAR_ON_MESSAGE } from '../actions'
import { TOGGLE_SELECTED_ON_MESSAGE } from '../actions'
import { TOGGLE_MESSAGE_BOX } from '../actions'
import { MARK_AS_READ } from '../actions'
import { MARK_AS_UNREAD } from '../actions'
import { SELECT_ALL } from '../actions'
import { ADD_LABEL } from '../actions'
import { REMOVE_LABEL } from '../actions'
import { DELETE_MESSAGES } from '../actions'


function messages(state = { byId: {}, all: [], compose: "" }, action) {
  var newMessages;
  switch (action.type) {
    case MESSAGES_RECEIVED:
      const messagesById = action.messages.reduce((result, message) => {
        result[message.id] = message
        return result
      }, {})

      return {
        ...state,
        byId: messagesById,
        all: action.messages,
        compose: false
      }

    case CREATE_MESSAGE:
      var newMessages = state.all
      newMessages.push(action.message)

      return{
        ...state,
        all: newMessages
      }



    case TOGGLE_STAR_ON_MESSAGE:
      var messages = state.all //need to set to the messages object not the messages byId object
      newMessages = messages.map(message => {
        if(message.id == action.id)
          message.starred = !message.starred
        return message
      })
        return{
          ...state,
          all: newMessages,
      }

  case TOGGLE_SELECTED_ON_MESSAGE:
    var messages = state.all

    newMessages = messages.map(message => {
      if(message.id == action.id) {
        if(message.selected){
          message = { ...message, selected: false }
        }
        else {
          message = { ...message, selected: true }
        }
      }
      return message
    })
      return{
        ...state,
        all: newMessages,
    }

  case MARK_AS_READ:
    var newMessages = state.all
    newMessages = newMessages.map(message => {
      if(message.selected) {
        message.read = true;
      }
      return message
    })
    console.log(newMessages)
    return{
      ...state,
      all: newMessages,
    }


  case MARK_AS_UNREAD:
    var newMessages = state.all
    newMessages = newMessages.map(message => {
      if(message.selected) {
        message.read = false;
      }
      return message
    })
    console.log(newMessages)
    return{
      ...state,
      all: newMessages,
    }

  case SELECT_ALL:
    var newMessages = state.all
    if(action.allSelected) {
      newMessages = newMessages.map(message => {
        message.selected = false;
        return message
      })
    } else {
      newMessages = newMessages.map(message => {
        message.selected = true;
        return message
      })
    }
    return{
      ...state,
      all: newMessages,
    }

  case ADD_LABEL:
    var newMessages = state.all
    newMessages = newMessages.map(message => {
      let idx = message.labels.indexOf(action.labelToAdd);
      if(message.selected && idx === -1 )
        message.labels.push(action.labelToAdd)

      return message
    })
    return{
      ...state,
      all: newMessages
    }

  case REMOVE_LABEL:
    var newMessages = state.all
    newMessages = newMessages.map(message => {
      let idx = message.labels.indexOf(action.labelToRemove)
      console.log(action.labelToRemove)
      if(message.selected && idx != -1)
        message.labels.splice(idx, 1)

      return message
    })

    return{
      ...state,
      all: newMessages
    }

  case DELETE_MESSAGES:
    var newMessages = state.all
    newMessages = newMessages.filter(message => {
      if(!message.selected)
        return message
    })

    return {
      ...state,
      all: newMessages
    }

  default:
    return state
}
}

function messageBox(state = {visible: false}, action) {
  switch(action.type) {
    case TOGGLE_MESSAGE_BOX:
      return {
        ...state,
        visible: !state.visible
      }

    default:
      return state
  }
}


export default combineReducers({
  messages,
  messageBox
})
