import React from 'react';
import './App.css';
import Home from './Home';
import LiveFeed from './LiveFeed';
import Analytics from './Analytics';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import {Navbar, Nav}  from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";


// Install the socket io client using:
//    npm install socket.io
//
// Then import socket io and create a socket:
//
import io from 'socket.io-client';
//import jsonDisasterType from './data';
const socket = io('http://localhost:3001');

//
// See: https://socket.io/get-started/chat
//      https://www.npmjs.com/package/socket.io-client

class App extends React.Component {

  constructor(props) {
    super(props);

    // An array of social media posts messages, and we'll increment nextID
    // to maintain a unique ID for each post in our array
    this.state = {posts: [],nextID: 0};

    // We can setup the event handlers for the messages in the constructor...
    socket.on('connect', function(){

      console.log("Connect....");

      // When we receive a social media message, call setState and insert 
      // it into the array of posts
      socket.on('post', 

        function(data) {

          // Can uncomment this to see the raw data coming in...
          // console.log("post: " + JSON.stringify(data));

          // increment the next unique ID, and put post data into the list of 
          // posts... use the '...' syntax to make this insertion easier:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
          this.setState( 
            {posts: [...this.state.posts,
                     {name: data.name, 
                      image: data.image, 
                      content: data.content, 
                      problem: data.problem,
                      priority: data.priority,
                      id: this.state.nextID}]
            ,nextID: this.state.nextID + 1}); 
        }.bind(this));
        // ^^ Like other event handlers, we bind the callback function to the 
        // component so we can use setState        

    }.bind(this));
    // ^^ ... And same with the callback function for when a connection is made

  }
  
  render()
  {
	var toRender;
	
	toRender = 	toRender = <Router>
		<Navbar bg="dark" variant="dark">	
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<LinkContainer to="/home">
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/livefeed">
						<Nav.Link>Live Feed</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/analytics">
						<Nav.Link>Analytics</Nav.Link>
					</LinkContainer>					
				</Nav>
			</Navbar.Collapse>	
		</Navbar>
		<Switch>
			<Route path="/" exact render={() => {return (<Redirect to="/home" />)}} />
			<Route path="/home" exact component={Home} />
			<Route path="/livefeed" exact render={(props) => <LiveFeed {...props} postsFromServer={this.state.posts} /> } />
			<Route path="/analytics" exact render={(props) => <Analytics {...props} postsFromServer={this.state.posts} /> } />
		</Switch>
	</Router>;

	return toRender;
  }
}


export default App;
