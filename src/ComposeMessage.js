import React from 'react';

const ComposeMessage = ({visible, createMessageHandler}) => {

var subject = "";
var body = "";


const createMessage = (e) => {
  // e.preventDefault();
  console.log("Subject: " + subject + " Message: " + body );
  createMessageHandler(subject, body);
}

const setSubject = (e) => {
  subject = e.target.value;
}

const setBody = (e) => {
  body = e.target.value;
}


  if(visible){
    return(
  <form className="form-horizontal well">
  <div className="form-group" >
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>

  <div className="form-group">
    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
    <div className="col-sm-8">
      <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange={setSubject}/>
    </div>
  </div>

  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
      <textarea name="body" id="body" className="form-control" onChange={setBody}></textarea>
    </div>
  </div>

  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <input type="submit" value="Send" className="btn btn-primary" onClick={createMessage}/>
    </div>
  </div>
</form>
)}
else return null;
}

export default ComposeMessage;
