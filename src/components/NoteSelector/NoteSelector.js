import React from 'react';

export default function NoteSelector(props) {
    return (
        <div 
            key={props.id}
            onClick={() => {props.setCurrentNoteId(props.id)}}
            onBlur={props.handleBlur}
            className="note-container"
        >
            <div
                className={`title flex-row ${
                    props.id === props.currentNote.id ? "selected-note" : ""
                }`}
            >
                <div className="note-description-container">
                    <span className="title">{props.title}</span>
                    <span className="date">{`${props.editTime}`}</span>
                </div>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, props.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    )
}