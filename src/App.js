// App.js
import React from 'react';
import TaskBoard from './component/TaskBoard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center mt-3">Task Tracker</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
