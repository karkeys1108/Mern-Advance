import React from 'react'
import Video from './components/Video';
import OrderFilter from './components/OrderFilter';
import Pros from './components/Pros';
import Task from './components/Task';

const App = () => {
  return (
    <div>
      <Video/>
      <OrderFilter/>
      <Pros />
      <Task/>
    </div>
  )
}

export default App