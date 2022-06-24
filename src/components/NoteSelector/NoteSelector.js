import React from 'react';

export default function NoteSelector(props) {
    return (
        <div 
            key={props.id}
            onClick={(event) => props.handleClick(event, props.id)}
            onBlur={props.handleBlur}
        >
            <div
                className={`title flex-row ${
                    props.id === props.currentNote.id ? "selected-note" : ""
                }`}
            >
                <div className="note-description-container">
                    <span className="title">{props.title}</span>
                    <span className="date">{`${props.creationDateTime}`}</span>
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