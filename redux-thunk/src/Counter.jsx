import React, { useState } from 'react';
import { applyMiddleware, createStore } from 'redux';
import reducer from './Reducers';
import { fetchUserData, showError } from './Actions';
import axios from 'axios';
import {thunk} from 'redux-thunk'; 

const store = createStore(reducer, applyMiddleware(thunk));

function fetchData() {
  return function () {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const users = res.data;
        store.dispatch(fetchUserData(users));
      })
      .catch(error => {
        store.dispatch(showError(error.message));
      });
  };
}

export default function Counter() {
  const [data, setData] = useState([]);

  const unsubscribe = store.subscribe(() => {
    setData(store.getState().users);
  });

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <h4>{item.email}</h4>
          </div>
          <hr />
        </div>
      ))}
      <button onClick={() => store.dispatch(fetchData())}>Fetch Data</button>
    </div>
  );
}
