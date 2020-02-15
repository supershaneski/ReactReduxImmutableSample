import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer);

// Initial data
store.dispatch({
    type: 'ADD',
    id: 'id202002150233',
    text: "Harry's Birthday Party",
    content: 'Explorations hydrogen atoms Apollonius of Perga vel illum qui dolorem eum fugiat quo voluptas nulla pariatur courage of our questions a very small stage in a vast cosmic arena?',
})
store.dispatch({
    type: 'ADD',
    id: 'id202002150234',
    text: 'Dinner with Jenny',
    content: 'Two ghostly white figures in coveralls and helmets are soflty dancing dispassionate.',
})
store.dispatch({
    type: 'ADD',
    id: 'id202002150235',
    text: 'Movie Night',
    content: 'Extraterrestrial observer bits of moving fluff gathered by gravity qui dolorem ipsum quia dolor.',
})

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
