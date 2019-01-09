import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
	<Router>
		<Router>
                <div>
                    <Route exact path="/" component={Home} />
                </div>
            </Router>
	</Router>
)

export default App;
