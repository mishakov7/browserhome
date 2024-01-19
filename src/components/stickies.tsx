"use client";
import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';
import Polaroid from './polaroid';
import Note from './note';

const defaultNotes = [{
    "note": "Click on this note to change what it says, click on the date to add a new note!",
    "color": "accent1",
    /*"xpos": "",
    "ypos": ""*/
}];

const defaultPolaroids = [{
    "note": "Do it for him!",
    "image": "https://d2zp5xs5cp8zlg.cloudfront.net/image-83814-800.jpg",
    "alignment": "center center",
    /*"xpos": "",
    "ypos": ""*/
}];

export default function Stickies() {

  const [notes, setNotes] = useState(defaultNotes);
  const [polaroids, setPolaroids] = useState(defaultPolaroids);

  useEffect(() => {
    const storageStickies = JSON.parse(localStorage.getItem('stickies'));

    if (storageStickies) {
        setNotes(storageStickies.notes);
        setPolaroids(storageStickies.polaroids);
    
    } else {
      let defaultStickies = {"notes": defaultNotes, "polaroids": defaultPolaroids};
      localStorage.setItem('stickies', JSON.stringify(defaultStickies));
    }

  }, []);

  return (
    <>
        <div className='stickies-container'>
            {
              polaroids.map((polaroid, idx) => (
                <Polaroid 
                    key={idx}
                    image={polaroid.image}
                    note={polaroid.note}
                />
              ))
            }

            {
              notes.map((note, idx) => (
                <Note 
                    key={idx}
                    note={note.note}
                />
              ))
            }
          
        </div>
    </>
  )
}