import * as React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [textInput, setTextInput] = React.useState("")
  const [editTextInput, setEditTextInput] = React.useState("")
  const [userID, setUserID] = React.useState(uuidv4())
  const [CRUDdata, setCRUDdata] = React.useState([]);

  React.useEffect(() => {
    read();
  }, [])


  React.useEffect(() => {
    read();
  }, [userID])

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  async function create(text) {
    var uuid = uuidv4();
    var requestBody = {
      value: text,
      userid: userID,
      id: uuid
    }

    var url = "http://localhost:5000/create"
    var result = await axios.post(url, requestBody).then(res => { return res.data })
    read()
    setTextInput("")
  }

  async function read() {
    var requestBody = {
      value: textInput,
      userid: userID,
    }

    var url = "http://localhost:5000/read"
    var result = await axios.post(url, requestBody).then(res => { return res.data })

    setCRUDdata(result)
  }

  async function update(value, index) {
    var requestBody = {
      id: CRUDdata[index].id,
      userid: CRUDdata[index].userid,
      value: value
    }

    var url = "http://localhost:5000/update"
    await axios.post(url, requestBody).then(res => { return res.data })
    read()
    document.getElementById("CRUD-wrapper").style.display = "none";
    setEditTextInput("")
  }

  function edit(index){
    document.getElementById("CRUD-wrapper").style.display = "block";
    document.getElementsByClassName("CRUD-update")[0].id = index+""

  }

  async function _delete(index) {
    var requestBody = {
      id: CRUDdata[index].id,
      userid: CRUDdata[index].userid,
    }

    var url = "http://localhost:5000/delete"
    var result = await axios.post(url, requestBody).then(res => { return res.data })
    read()
    setTextInput("")
  }
  return (
    <div className="App">

      <div className='CRUD'>
        <div className='CRUD-create'>
          <input type={"text"} id="input" value={textInput} onChange={(e) => { setTextInput(e.target.value) }} />
          <button onClick={() => { create(document.getElementById("input").value) }}>Click me!</button>
        </div>

        <div className='CRUD-read'>
          {CRUDdata.map((value, index) => {
            return (
              <div className='CRUD-item' id={"CRUD-item" + index}>
                <div className='CRUD-itemText'>
                  <span>{CRUDdata[index]?.value}</span>
                </div>
                <div className='CRUD-itemIcons'>
                  <span class="material-symbols-outlined" id={index} onClick={(e) => {edit(index) }}>edit</span>
                  <span class="material-symbols-outlined" id={index} onClick={(e) => { _delete(index) }}>delete</span>
                </div>
              </div>
            )
          })}
        </div >

        <div id='CRUD-wrapper'>
          <p className='CRUD-updateHeader'>Update:</p>
          <div className='CRUD-update' id="xx">
            <input type={"text"} id="editInput" value={editTextInput} onChange={(e) => { setEditTextInput(e.target.value) }} />
            <button onClick={() => { update(document.getElementById("editInput").value, document.getElementsByClassName("CRUD-update")[0].id) }}>Update</button>
          </div>
        </div>

        <span>CurrentID:</span><input value={userID} placeholder="New Value" onChange={(e) => { setUserID(e.target.value) }} />
      </div>
    </div>
  );
}

export default App;
