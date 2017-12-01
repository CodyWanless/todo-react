import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';

import './styles/styles.scss';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
