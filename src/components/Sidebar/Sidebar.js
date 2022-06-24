import React from 'react';
import NoteSelector from '../NoteSelector/NoteSelector';

export default function Sidebar(props) {
    function removeWhiteSpace(str) {
        return str.split(' ').filter(n => n).join(' ');
    }

    // Removes the first occurence of a repeating char sequence from a string.
    // occurenceLimit defines how many times the char most occur nefore this behavior stops.
    function removeRepeatingCharFromString(charToRemove, strInput, occurrenceLimit = Infinity) {
        const charToRemoveRegExp = new RegExp(`[^${charToRemove}]`);

        if (strInput[0] === charToRemove) {
            const firstNonQueriedChar = strInput.search(charToRemoveRegExp);
            const queriedCharExists = firstNonQueriedChar >= 0;

            return (
                queriedCharExists && firstNonQueriedChar <= occurrenceLimit ? 
                strInput.slice(firstNonQueriedChar) : 
                strInput
            );
        }
    }

    function getTitle(note) {
        let title = note.body.split("\n")[0];
        
        return removeRepeatingCharFromString('#', title, 4) || removeWhiteSpace(title);
    }

    const noteSelectorArray = props.notes.map(note => {
        return (
            <NoteSelector
                key={note.id}
                id={note.id}
                title={getTitle(note) || "Title"}
                deleteNote={props.deleteNote}
                currentNote={props.currentNote}
                creationDateTime={note.creationDateTime}
                updateNote={props.updateNote}
            />
        )
    });

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteSelectorArray}
        </section>
    );
};