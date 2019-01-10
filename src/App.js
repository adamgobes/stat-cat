import React from 'react';
import { Grommet } from 'grommet';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/presentational/Home';

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px'
        }
    }
};

const App = () => (
    <Router>
        <Router>
            <Grommet theme={theme}>
                <Route exact path="/" component={Home} />
            </Grommet>
        </Router>
    </Router>
);

export default App;
