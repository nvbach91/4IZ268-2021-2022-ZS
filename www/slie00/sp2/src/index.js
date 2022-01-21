import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

render(
	<BrowserRouter basename="/~slie00/sp2/build/">
		<App/>
	</BrowserRouter>,
	document.getElementById('root')
);
