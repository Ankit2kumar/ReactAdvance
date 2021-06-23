import React from 'react';
import {
	Form,
	FormControl,
	Button,
	Container,
	Row,
	Col,
	Card,
} from 'react-bootstrap';
import '../styles/SearchPage.css';

class SearchPage extends React.Component {
	state = {
		title: '',
		filteredData: [],
	};

	getTitle = (e) => {
		this.setState({ title: e.target.value });
	};

	getJobs = async () => {
		try {
			const userInput = this.state.title.toLowerCase();
			const response = await fetch('https://fake-careers.herokuapp.com/');
			const data = await response.json();
			const filteredData = data.jobs.filter((job) =>
				job.job_data.title.toLowerCase().includes(userInput)
			);
			this.setState({ filteredData: filteredData });
			console.log(filteredData);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<>
				<Container>
					<Row className="mt-5">
						<Col lg={6} md={6}>
							<Form inline>
								<FormControl
									type="text"
									placeholder="Enter Job title"
									onChange={this.getTitle}
									// className="mr-sm-2"
								/>
							</Form>
						</Col>
						<Col lg={6} md={6}>
							<Button
								onClick={this.getJobs}
								className=""
								variant="outline-success"
							>
								Search
							</Button>
						</Col>
					</Row>
					<Row className="mt-4">
						{this.state.filteredData.map((data) => (
							<Card>
								<Card.Header as="h5">{`${data.job_data.title}`}</Card.Header>
								<Card.Body>
									<Card.Title>{`${data.hiring_company.name}, ${data.hiring_company.country}`}</Card.Title>
									<Card.Text>{`${data.job_data.description}`}</Card.Text>
									<Button variant="primary">Show More</Button>
								</Card.Body>
							</Card>
						))}
					</Row>
				</Container>
			</>
		);
	}
}

export default SearchPage;
