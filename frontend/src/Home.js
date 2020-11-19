import React from 'react';
import {Container, Row, Col, ListGroup}  from 'react-bootstrap';

//Home page
class Home extends React.Component{
	constructor(props)
	{
		super(props);
	}
	
	render()
	{
		var toRender;
		
		toRender = <div>
		<Container>
			<br/>
			<Row className="justify-content-md-center">
				<Col xs lg="2"></Col>
				<Col md="auto"><h1>Social Media Posts Analyzer</h1></Col>
				<Col xs lg="2"></Col>
			</Row>
			<br/>
			<br/>
			<Row>
				<Col>
					<h5>This dashboard retrieves social media posts from Twitter, displays them, and provides overall statistics. Further explanation based on each page available is discussed below...</h5>
					<br/>
					<br/>
					<h5>The Live Feed page allows users to filter on posts retrieved from social media based on:</h5>
					<ListGroup variant="flush">
					  <ListGroup.Item>Disaster Type</ListGroup.Item>
					  <ListGroup.Item>Priority Level</ListGroup.Item>
					</ListGroup>
					<br/>
					<br/>			  
					<h5>The Analytics page shows overall statistics on (Priority Level, Disaster Type) pair based on the retrieved social media posts</h5>
				</Col>
				<Col md="auto"></Col>
				<Col xs lg="2"></Col>
			</Row>
		 </Container>
		</div>;
		
		return toRender;
	}
}

export default Home;