import React from 'react';
import { Box, Button } from 'grommet';

import Logo from './Logo';

const Home = () => (
	<Box align='center' justify='center' className="container">
		<h1>StatCat</h1>
		<Logo>hello</Logo>
		<Box align='center' direction="row">
			<Button label="Log In" />
			<Button label="Continue as Guest" />
		</Box>
	</Box>
)

export default Home;
