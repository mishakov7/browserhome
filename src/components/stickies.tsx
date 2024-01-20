"use client";
import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';
import Polaroid from './polaroid';
import Note from './note';

const defaultNotes = [{
    "note": "Click on this note to change what it says, click on the date to add a new note!",
    "color": "accent1",
    "rotation": "3deg",
    "xpos": -462,
    "ypos": 175
}];

const defaultPolaroids = [{
    "note": "Do it for him!",
    "image": "https://d2zp5xs5cp8zlg.cloudfront.net/image-83814-800.jpg",
    "alignment": "center center",
    "rotation": "-5deg",
    "xpos": -155,
    "ypos": 75
}];

export default function Stickies() {

  const [notes, setNotes] = useState([]);
  const [polaroids, setPolaroids] = useState([]);

  const editNote = (update, idx) => {    
    let storageStickies = JSON.parse(localStorage.getItem('stickies'));
    storageStickies.notes[idx] = update;
    
    localStorage.setItem('stickies', JSON.stringify(storageStickies));
    setNotes(storageStickies.notes);
  }

  const editPolaroid = (update, idx) => {    
    let storageStickies = JSON.parse(localStorage.getItem('stickies'));
    storageStickies.polaroids[idx] = update;
    
    localStorage.setItem('stickies', JSON.stringify(storageStickies));
    setPolaroids(storageStickies.polaroids);
  }

  useEffect(() => {
    const storageStickies = JSON.parse(localStorage.getItem('stickies'));

    if (storageStickies) {
      setNotes(storageStickies.notes);
      setPolaroids(storageStickies.polaroids);
    }

  }, []);

  return (
    <>
        <div className='stickies-container'>

            {
              notes.map((note, idx) => (
                <Note 
                    key={idx}
                    idx={idx}
                    storage={note}
                    handleChange={editNote}
                    // handleDelete={deleteNote}
                />
                
              ))
            }

            {
              polaroids.map((polaroid, idx) => (
                <Polaroid 
                    key={idx}
                    idx={idx}
                    storage={polaroid}
                    handleChange={editPolaroid}
                    // handleChange={editPolaroid}
                    // handleDelete={deletePolaroid}

                />
              ))
            }
          
        </div>
    </>
  )
}