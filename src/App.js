import './App.css';
import {useState} from 'react'
import CreateNote from './components/createnote/CreateNote';

function App() {

  
  return (
    <div className="App">
      <h1 className='main_heading'> Notes App</h1>
         <CreateNote/>
    </div>
  );
}

export default App;
