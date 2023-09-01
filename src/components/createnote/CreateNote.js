import {React, useEffect} from 'react';
import { useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai'
import './CreateNote.css';

function CreateNote(){
    const [notes, setNotes] = useState([]);
    const [newNotes, setNewNotes] = useState("");
    const [editingIndex, setEdittingIndex] = useState(null);
    const [editNotes, setEditNotes] = useState([]);

    useEffect(()=>{
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, [])

    const addNote = () =>{
        if(newNotes.trim() != ''){
            const updatedNotes = [...notes,newNotes];
            setNotes(updatedNotes);
            setNewNotes('');
            localStorage.setItem('notes', JSON.stringify(updatedNotes))
        }
    }

    const deleteNote = (id) =>{
        const updatedNotes =  notes.filter(item => item !== id);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const editNote = (editedNote, index) =>{
         const updatedNotes = [...notes];
         updatedNotes[index] = editedNote;
         setNotes(updatedNotes);
         localStorage.setItem('notes', JSON.stringify(updatedNotes));
         setEdittingIndex(null);
    }

    return(
        <div>
        <h3 className='heading2'>Write your Note here</h3>
        <input 
        className='note_input'
        value={newNotes} 
        onChange={(e)=>setNewNotes(e.target.value)}
        type="text"  
        />
        <br />
        <button className="add_button" onClick={addNote}>Add New Notes</button>
        
        <div className='main_container'>
        <ol >
        { notes.map((note,index)=>(
          <li className='note_card' key={index}>


          {editingIndex === index ? (
             <div>
             <input 
             className='edit_input'
             value={editNotes[index]}
             onChange={(e) =>{
                const updatedEditNotes = [...editNotes];
                updatedEditNotes[index] = e.target.value;
                setEditNotes(updatedEditNotes);
             }}
             />

             <button
             className='save_button'
             onClick={()=>{
                editNote(editNotes[index],index);
                setEditNotes([]);
             }}
             >Save
             </button>
             </div>
          ):(
              <>
              {note}
               <br />
              <AiOutlineDelete className="delete_button" onClick={()=>deleteNote(note)}/>
          <AiOutlineEdit className='edit_button' onClick={()=> {
            setEditNotes([...notes]);
            setEdittingIndex(index);
          }}/>
              </>
          )}
          
          </li>
         ))
        }
        </ol>
        </div>
        
        </div>
    );
}

export default CreateNote;