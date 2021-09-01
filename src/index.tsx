import ReactDOM from 'react-dom';
import React from 'react';

import module from './styles/module.css'

const App = () => {
    return <h1 className={module.temp}>This is my React app!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));