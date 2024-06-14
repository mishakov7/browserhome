"use client";
import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';
import Polaroid from './polaroid';
import Note from './note';
import { create } from 'domain';


export default function Stickies(props: any) {
  const defaultNote = [{
    "note": "Change what this note says!",
    "color": "accent" + randomIdx(0, 3),
    "rotation": "sticky-" + randomIdx(1, 10),
    "xpos": -462,
    "ypos": 175
  }];

  const defaultPolaroid = [{
    "note": "Say something.. like.. huh?",
    "image": "https://i.makeagif.com/media/11-12-2023/JbwsRE.gif",
    "alignment": "center",
    "rotation": "sticky-" + randomIdx(1, 10),
    "xpos": -155,
    "ypos": 75
  }];

  const [notes, setNotes] = useState([]);
  const [polaroids, setPolaroids] = useState([]);
  const [letterkey, setletterKey] = useState('a');
  const [topSticky, setTopSticky] = useState(0);

  const currentDate = new Date();

  function randomIdx(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  function generateKey(sticky: string, idx:number) {
    return sticky + letterkey + idx;
  }

  function randLetter() {
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var letter = letters[Math.floor(Math.random() * letters.length)];
    return letter;
  }

  const resetStickies = () => {
    // const storageNotes = JSON.parse(String(localStorage.getItem('notes')));
    // const storagePolaroids = JSON.parse(String(localStorage.getItem('polaroids')));
    const storageNotes = notes;
    const storagePolaroids = polaroids;

    storageNotes.forEach((note: any) => {
      note.xpos = defaultNote[0].xpos,
      note.ypos = defaultNote[0].ypos
    });

    storagePolaroids.forEach((polaroid: any) => {
      polaroid.xpos = defaultPolaroid[0].xpos,
      polaroid.ypos = defaultPolaroid[0].ypos
    });

    if (typeof window !== undefined) {
      localStorage.setItem('notes', JSON.stringify(storageNotes));
      localStorage.setItem('polaroids', JSON.stringify(storagePolaroids));  
    }
    
    setNotes(storageNotes);
    setPolaroids(storagePolaroids);
    setletterKey(randLetter());

  }

  const createNote = () => {
    // const storageNotes = JSON.parse(String(localStorage.getItem('notes')));
    const storageNotes : any = notes.slice();

    let newNote = {
      "note": "Change what this note says!",
      "color": "accent" + randomIdx(1, 3),
      "rotation": "sticky-" + randomIdx(1, 10),
      "xpos": -1 * randomIdx(0, 1000),
      "ypos": randomIdx(0, 500)
    };

    storageNotes.push(newNote);

    if (typeof window !== undefined) {
      localStorage.setItem('notes', JSON.stringify(storageNotes));
    }

    setNotes(storageNotes);

  }

  const editNote = (update: any, idx: number) => {    
    // const storageNotes = JSON.parse(String(localStorage.getItem('notes')));
    const storageNotes : any = notes.slice();

    storageNotes[idx] = update;
    
    if (typeof window !== undefined) {
      localStorage.setItem('notes', JSON.stringify(storageNotes));
    }

    setNotes(storageNotes);
  }

  const deleteNote = (idx: number) => { 
    // let storageNotes = JSON.parse(String(localStorage.getItem('notes')));
    let storageNotes = notes.slice();
    storageNotes.splice(idx, 1);

    if (typeof window !== undefined) {
      localStorage.setItem('notes', JSON.stringify(storageNotes));
    }

    setNotes(storageNotes);

    setletterKey(randLetter());
  }

  const createPolaroid = () => {
    // let storagePolaroids = JSON.parse(String(localStorage.getItem('polaroids')));
    let storagePolaroids : any = polaroids.slice();

    let newPolaroid = {
      "note": "Say something.. like.. huh?",
      "image": "https://i.makeagif.com/media/11-12-2023/JbwsRE.gif",
      "alignment": "center",
      "rotation": "sticky-" + randomIdx(1, 10),
      "xpos": -1 * randomIdx(0, 1000),
      "ypos": randomIdx(0, 500)
    };

    storagePolaroids.push(newPolaroid);

    if (typeof window !== undefined) {
      localStorage.setItem('polaroids', JSON.stringify(storagePolaroids));
    }

    setPolaroids(storagePolaroids);

  }

  const editPolaroid = (update: any, idx: number) => {    
    // let storagePolaroids = JSON.parse(String(localStorage.getItem('polaroids')));
    let storagePolaroids : any = polaroids.slice();
    storagePolaroids[idx] = update;
    
    if (typeof window !== undefined) {
      localStorage.setItem('polaroids', JSON.stringify(storagePolaroids));
    }

    setPolaroids(storagePolaroids);
  }

  const deletePolaroid = (idx: number) => { 
    // let storagePolaroids = JSON.parse(String(localStorage.getItem('polaroids')));
    let storagePolaroids = polaroids.slice();
    storagePolaroids.splice(idx, 1);

    if (typeof window !== undefined) {
      localStorage.setItem('polaroids', JSON.stringify(storagePolaroids));
    }

    setPolaroids(storagePolaroids);

    setletterKey(randLetter());
  }

  useEffect(() => {
    let storageNotes = JSON.parse(String(localStorage.getItem('notes')));
    let storagePolaroids = JSON.parse(String(localStorage.getItem('polaroids')));

    if (notes.length == 0) {
        if (storageNotes) {
          setNotes(storageNotes);
        } else {
          localStorage.setItem('notes', JSON.stringify(defaultNote));
        }

    } else {
      setNotes(storageNotes);
      // localStorage.setItem('notes', JSON.stringify(notes));
    }

    if (polaroids.length == 0) {
        if (storagePolaroids) {
          setPolaroids(storagePolaroids);
        } else {
          localStorage.setItem('polaroids', JSON.stringify(defaultPolaroid));
        }

    } else {
      setPolaroids(storagePolaroids);
      // localStorage.setItem('polaroids', JSON.stringify(polaroids));
    }

    if (props.command != 0) {
      switch(props.command) {
        case 1:
          resetStickies();
          break;
  
        case 2:
          createNote();
          break;
  
        case 3:
          createPolaroid();
          break;
  
        default:
          break;
  
      }
      
      props.setCommand(0);
    }



  }, [props.command/*notes, polaroids*/]);

  return (
    <>
    <div ref={props.parentRef} className='stickies-wrapper'>

        <div className='date accent1-bg'>
            <span>{currentDate.toLocaleString('default', { month: 'short' })}</span>
            <span>{currentDate.toLocaleString('default', { day: "2-digit" })}</span>
        </div>

        <div className='stickies-container mobile-hide-flex'>

            {
              notes.map((note, idx) => (
                <Note 
                    key={generateKey("note", idx)}
                    idx={idx}
                    storage={note}
                    isSelected={topSticky == idx ? true : false}
                    changeLayer={setTopSticky}
                    handleChange={editNote}
                    handleDelete={deleteNote}
                />
                
              ))
            }

            {
              polaroids.map((polaroid, idx) => (
                <Polaroid 
                    key={generateKey("polaroid", idx)}
                    idx={idx}
                    notes={notes.length}
                    storage={polaroid}
                    isSelected={topSticky == (idx + notes.length) ? true : false}
                    changeLayer={setTopSticky}
                    handleChange={editPolaroid}
                    handleDelete={deletePolaroid}

                />
              ))
            }

        </div>
    </div>
    </>
  )
}