import React from 'react';
import {Container, Row, Col, Table}  from 'react-bootstrap';

const disasterType = [
						{"name":"Fire"}, 
						{"name":"Flood"}, 
						{"name":"Power"}, 
						{"name":"Medical"},
						{"name":"Total"}
					];					
				
const priorityLevel = [
						{"name":"Low"}, 
						{"name":"Medium"}, 
						{"name":"High"}, 
						{"name":"Critical"},
						{"name":"Total"}
					];

//Analytics Page
class Analytics extends React.Component{
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
							<Col md="auto"><h1>Social Media Analytics</h1></Col>
							<Col xs lg="2"></Col>
						</Row>						
					</Container>
					<br/>
					<Table responsieve striped bordered hover>
					  <thead>
						<tr>
						<th></th>
						{this.renderTableHeader()}
						</tr>						
					  </thead>
					  <tbody>
						{this.renderTableData()}
						</tbody>
					</Table>
				</div>
		

		
		return toRender; 
	}
	
	renderTableHeader()
	{
		var toRender;
		var header = disasterType.map(elem => elem.name);
		
		toRender = header.map((key, index) => {
				return <th key={index}>{key} </th>
		});
		
		return toRender;
	}
	
	renderTableData()
	{
		var totalCount = [];
		var posts = this.props.postsFromServer;
		var currCount = 0;
		var totalRowCount = 0;
		var dataCells = [];
		
		//Retrieve the name values from both arrays
		var priorityName = priorityLevel.map(elem => elem.name); 
		var disasterName = disasterType.map(elem => elem.name);
		
		for(var i=0; i< priorityName.length; i++)//dont count the total row
		{
			for (var j=0; j< disasterName.length; j++)//dont count the total column
			{
				//This counts the total row but not the total column
				if((priorityName[i] === "Total") && (disasterName[j] !== "Total"))
				{
					currCount = posts.filter((post) => post.problem === disasterName[j]).length;
					totalRowCount += currCount;
				}
				//This counts the total column but not the total row	
				else if ((disasterName[j] === "Total") && (priorityName[i] !== "Total"))
					currCount = posts.filter((post) => post.priority === priorityName[i]).length;
				//This counts the total row and total column cell
				else if ((disasterName[j] ==="Total") && (priorityName[i] === "Total"))
					currCount = totalRowCount;
				else
					currCount = posts.filter((post) => post.problem === disasterName[j] && post.priority === priorityName[i]).length;				
				
				totalCount.push({row:i, col:j, count:currCount});			
			}

			//dynamically create the table row
			dataCells.push(<tr key={priorityName[i]+"-0"}><td>{priorityName[i]}</td>
				{
					totalCount.map((cell) =>
					{
						return <td key={cell.row+"-"+cell.col}>{cell.count}</td>
					}
					)
				}
				</tr>
			);
			
			
			totalCount = []; //reset array after every iteration

		}
				
		return dataCells;
		
	}
}

export default Analytics;