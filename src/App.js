import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state={
      currentItem: '',
      username: '',
      items: [],
      photo: '',
      caption: '',
      picturefeeds: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
  }

  handleSubmit(e) {
  e.preventDefault();
  const itemsRef = firebase.database().ref('items');
  const item = {
    title: this.state.currentItem,
    user: this.state.username,
  }

  const captionsRef = firebase.database().ref('picturefeed');
  const picture = {
    photo: this.state.photo,
    caption: this.state.caption,
  }


  itemsRef.push(item);
  this.setState({
    currentItem: '',
    username: '',
  });


  captionsRef.push(picture);
  this.setState ({
    photo: '',
    caption: '',
  });
  }

  componentDidMount() {
  const itemsRef = firebase.database().ref('items');
  const captionsRef = firebase.database().ref('picturefeeds');


  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      newState.push({
        id: item,
        title: items[item].title,
        user: items[item].user,
      });
    }
    this.setState({
      items: newState
    });
  });

   captionsRef.on('value', (snapshot) => {
    let picturefeeds = snapshot.val();
    let picState = [];
    for (let picf in picturefeeds) {
      picState.push({
        id: picf,
        photo: picturefeeds[picf].photo,
        caption: picturefeeds[picf].caption,
      });
    }
    this.setState({
      picturefeeds: picState
    });
  });


  }

  removeItem(itemId) {
  const itemRef = firebase.database().ref(`/items/${itemId}`);
  itemRef.remove();
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>InviteDinner (Project 1 by Blue Team)</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                      <div class="btn-group btn-group-justified" role="group" aria-label="...">
                      <div class="btn-group" role="group">
                        <button id="before_event" type="button" class="btn btn-default" onClick={function() { document.getElementById('before_event').style.opacity="1"; document.getElementById('after_event').style.opacity="0.8"; document.getElementById("post_picture").hidden=true; document.getElementById("dinner_photo").type="hidden"; document.getElementById("caption").type="hidden"; document.getElementById("rsvp").hidden=false; document.getElementById("username").type="text"; document.getElementById("currentItem").type="text";}}>Before Event</button>
                        <button id="after_event" type="button" class="btn btn-default" onClick={function() { document.getElementById('before_event').style.opacity="0.8"; document.getElementById('after_event').style.opacity="1"; document.getElementById("post_picture").hidden=false; document.getElementById("dinner_photo").type="file"; document.getElementById("caption").type="text"; document.getElementById("rsvp").hidden=true; document.getElementById("username").type="hidden"; document.getElementById("currentItem").type="hidden"; document.getElementById("item_list").hidden=true; }}>After Event</button>
                      </div>
                    </div>
                <input type="text" id="username" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                <input type="text" id="currentItem" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                <button id="rsvp">RSVP to Invite Dinner</button>
                <input type="hidden" id="dinner_photo" name="dinner_photo" onChange={this.handleChange} value={this.state.photo} />
                <input type="hidden" id="caption" name="caption" placeholder="Want to add a caption?" onChange={this.handleChange} value={this.state.caption} />
                <button id="post_picture" hidden>Post Picture</button>
              </form>
          </section>
          <section className='display-item'>
            <div id="item_list" className='wrapper'>
              <ul>
                {this.state.items.map((item) => {
                return (
                  <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>brought by: {item.user}</p>
                    <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                  </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;