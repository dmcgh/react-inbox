export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8008/api/messages`)
    const json = await response.json()
    console.log(json);
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}

export const CREATE_MESSAGE = 'CREATE_MESSAGE'
export function createNewMessage(subject, body) {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8008/api/messages', {
        method: 'POST',
        body: JSON.stringify({'subject': subject, 'body': body}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      const json = await response.json();
      console.log(json);
    dispatch({
      type: CREATE_MESSAGE,
      message: json
    })
  }
}

export const TOGGLE_MESSAGE_BOX = 'TOGGLE_COMPOSE_MESSAGE'
export function toggleMessageBox(visible) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MESSAGE_BOX,
      compose: visible
    })
  }
}

export const TOGGLE_STAR_ON_MESSAGE = 'TOGGLE_STAR_ON_MESSAGE'
export function toggleMessageStar(id, starred) {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8008/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({'messageIds': [id], 'command': 'star', 'star': !starred}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    dispatch({
      type: TOGGLE_STAR_ON_MESSAGE,
      id: id
    })
  }
}

export const MARK_AS_READ = 'MARK_AS_READ'
export function markSelectedAsRead(ids) {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8008/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({'messageIds': ids, 'command': 'read', 'read': true}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    dispatch({
      type: MARK_AS_READ,
      ids: ids
    })
  }
}

export const MARK_AS_UNREAD = 'MARK_AS_UNREAD'
export function markSelectedAsUnread(ids) {
  return async (dispatch) => {
    const response = await fetch('http://localhost:8008/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({'messageIds': ids, 'command': 'read', 'read': false}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    dispatch({
      type: MARK_AS_UNREAD,
      ids: ids
    })
  }
}

export const TOGGLE_SELECTED_ON_MESSAGE = 'TOGGLE_SELECTED_ON_MESSAGE'
export function toggleSelectMessage(id) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECTED_ON_MESSAGE,
      id: id
    })
  }
}

export const SELECT_ALL = 'SELECT_ALL'
export function selectAllMessages(allSelected) {
  return (dispatch) => {
    dispatch({
      type: SELECT_ALL,
      allSelected: allSelected
    })
  }
}

export const ADD_LABEL = 'ADD_LABEL'
export function addLabelToMessage(labelToAdd, ids) {
  return async (dispatch) => {
    const addResponse = await fetch('http://localhost:8008/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({'messageIds': ids, 'command': 'addLabel', 'label': labelToAdd }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    dispatch({
      type: ADD_LABEL,
      labelToAdd: labelToAdd

    })
  }
}

export const REMOVE_LABEL = 'REMOVE_LABEL'
export function removeLabelFromMessage(labelToRemove, ids) {
  return async (dispatch) => {
    const removeResponse = await fetch('http://localhost:8008/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({'messageIds': ids, 'command': 'removeLabel', 'label': labelToRemove }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    dispatch({
      type: REMOVE_LABEL,
      labelToRemove: labelToRemove
    })
  }
}

export const DELETE_MESSAGES = 'DELETE_MESSAGES'
export function deleteMessages(ids) {
  return async (dispatch) => {
    const removeResponse = await fetch('http://localhost:8008/api/messages', {
        method: 'PATCH',
        body: JSON.stringify({'messageIds': ids, 'command': 'delete' }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    dispatch({
      type: DELETE_MESSAGES,
      ids: ids
    })
  }
}
