import React from 'react';
import Editor from "./Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import Sidebar from '../Sidebar/Sidebar';
import './App.css';

function App() {
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []);

    const [currentNoteId, setCurrentNoteId] = React.useState((notes[0] && notes[0].id) || "");
    
    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes]);
    
    function createNewNote() {
        const DATE_TIME_OPTIONS = {
            month: 'long', 
            day: 'numeric', 
            year: 'numeric', 
            hour: 'numeric', 
            'minute': 'numeric', 
            'second': 'numeric'
        }

        const creationDateTimeFormat =  new Intl.DateTimeFormat('en-US', DATE_TIME_OPTIONS);
        const currentTime = Date.now();
        const creationDateTime = creationDateTimeFormat.format(currentTime);

        const newNote = {
            id: nanoid(),
            title: "Title",
            body: "Title\n",
            creationDateTime
        }

        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
            const newArray = []

            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i];

                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: `${text}`});
                } else {
                    newArray.push(oldNote);
                }
            }
            return newArray
        })
    }
    
    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

export default App