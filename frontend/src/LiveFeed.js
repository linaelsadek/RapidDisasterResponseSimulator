import React from 'react';
import {Form, Container, Row, Col, ListGroup, label, Accordion, Card}  from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";

const disasterType = [
						{"name":"Fire", "checked":true}, 
						{"name":"Flood","checked":true}, 
						{"name":"Power","checked":true}, 
						{"name":"Medical","checked":true}
					];					
				
const priorityLevel = [
						{"name":"Low","checked":true}, 
						{"name":"Medium","checked":true}, 
						{"name":"High","checked":true}, 
						{"name":"Critical","checked":true}
					];
					
//Live Feed page
class LiveFeed extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			disasterFilter : disasterType,
			priorityFilter: priorityLevel,
		}

	  }
  
  // Output all the posts into a table
  render() {
	
	var posts;
	var toRender;
		
	posts = this.props.postsFromServer;
	
	//This is needed because the server keeps refreshing and results that do not conform to the
	//current filters are still being shown, so we filter on render as well
	posts = this.filterResult(posts); 
	
	toRender = <div>		
					<Container fluid>
						<br/>
						<Row className="justify-content-md-center">
							<Col xs lg="2"></Col>
							<Col md="auto"><h1>Social Media Live Feed</h1></Col>
							<Col xs lg="2"></Col>
						</Row>
						<br/>						
						<Row className="justify-content-md-start">
							<Col xs lg="3">
								<Accordion defaultActiveKey="0">
								  <Card>
									<Accordion.Toggle as={Card.Header} eventKey="0">
										Filters
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="0">
									  <Card.Body>
									  <label><b>Filter By Disaster Type</b></label>
										{
											this.state.disasterFilter.map(
											(disaster) =>
												<div key={disaster.name}>
												
													<Form.Check
													  id={disaster.name}
													  type='checkbox'
													  label={disaster.name}
													  checked={disaster.checked}
													  onChange={this.handleDisasterTypeChange.bind(this)}
													/>
												</div>
											)
										}
										<br/>
									  <label><b>Filter By Priority Level</b></label>
										{
											this.state.priorityFilter.map(
											(priority) =>
												<Form.Check
												  id={priority.name}
												  type='checkbox'
												  label={priority.name}
												  checked={priority.checked}
												  onChange={this.handlePriorityLevelChange.bind(this)}
												  key={priority.name}
												/> 
											)
										}
									  </Card.Body>
									</Accordion.Collapse>
								  </Card>
								</Accordion>
							</Col>
							
							<Col md="8">
								{posts.map( 
								  ({name,image,content,problem,priority,id}) =>
									<div key={id}>
										<Row className="justify-content-md-center">
											<Col xs lg="4">
											<img src={image} alt="{name}" />
											<ListGroup variant="flush">
											  <ListGroup.Item>{name}</ListGroup.Item>
											  <ListGroup.Item>{problem}</ListGroup.Item>
											  <ListGroup.Item>{priority}</ListGroup.Item>
											  <ListGroup.Item>{content}</ListGroup.Item>
											</ListGroup>
											</Col>
										</Row>
									  <br/>
									</div>		  
								)}
							</Col>
							<Col xs lg="2"></Col>
						</Row>
					</Container>					
				  </div>
				  
	return toRender;	
    
  }
  
  //This function will filter the posts based on Disaster Type and Priority Level
  filterResult(posts)
  {
	//Get the start  
	var nextState = this.state;
	var checkedCheckboxes;
	
	//Filter by Disaster Type first
	var disasterState = nextState.disasterFilter;
	//Retrieve the "name" of the checked disaster types
	checkedCheckboxes = disasterState.filter(({checked}) => checked === true).map(elem => elem.name); 
	posts = posts.filter((post) => checkedCheckboxes.includes(post.problem));
	
	
	//Filter by Priority Level
	var priorityState = nextState.priorityFilter;
	//Retrieve the "name" of the checked priority levels
	checkedCheckboxes = priorityState.filter(({checked}) => checked === true).map(elem => elem.name);
	posts = posts.filter((post) => checkedCheckboxes.includes(post.priority));

	
	return posts;
  }
  
  //This function will store the state of checked disaster filters
  //and filter the state based on it
  handleDisasterTypeChange(e)
  {
	var nextState = this.state.disasterFilter;
	var index = nextState.findIndex((element) => element.name === e.target.id);
	var disasterItem = {...nextState[index]};
	disasterItem.checked = e.target.checked;
	nextState[index] = disasterItem;
	this.setState(nextState);
  }

  //This function will store the state of checked priority filters
  //and filter the state based on it  
  handlePriorityLevelChange(e)
  {
	var nextState = this.state.priorityFilter;
	var index = nextState.findIndex((element) => element.name === e.target.id);
	var priorityItem = {...nextState[index]};
	priorityItem.checked = e.target.checked;
	nextState[index] = priorityItem;
	this.setState(nextState);
  }
}

export default LiveFeed;