import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import deriv from 'deriv-browser-client'

const Dashboard = () => {
  const [count, setCount] = useState('???')

  useEffect(() => {
    deriv.on('change', setCount);

    return () => deriv.off('change', setCount);
  }, []);

  return (
    <div>
      <h1>Example 2</h1>

      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/example1/">Example 1</a></li>
        <li>Example 2</li>
      </ul>

      <p>Last count: <strong id="lastCount">{count}</strong></p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <Dashboard />
);
