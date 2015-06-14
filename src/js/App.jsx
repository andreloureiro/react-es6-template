import React from 'react';
import Title from './components/Title';

class App extends React.Component {
	render() {
		return (
			<div>
				<Title text="React ES6" />
			</div>
		);
	}
}

React.render(<App />, document.body);