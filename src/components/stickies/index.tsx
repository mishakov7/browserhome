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

  const createNote = (e: any) => {
    // const storageNotes = JSON.parse(String(localStorage.getItem('notes')));
    const storageNotes : any = notes.slice();

    let newNote = {
      "note": "Change what this note says!",
      "color": "accent" + randomIdx(1, 3),
      "rotation": "sticky-" + randomIdx(1, 10),
      "xpos": -1 * randomIdx(0, 1000),
      "ypos": randomIdx(0, 500)
    };

    console.log("Creating note...")
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

  const createPolaroid = (e: any) => {
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

    console.log("creating polaroid");

    storagePolaroids.push(newPolaroid);

    console.log(polaroids);

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

    // console.log(notes.length)
    if (notes.length == 0) {
        // console.log("zeeero!")
        // console.log(storageNotes);

        if (storageNotes) {
          setNotes(storageNotes);
        } else {
          localStorage.setItem('notes', JSON.stringify(defaultNote));
        }

    } else {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // console.log(polaroids.length)
    if (polaroids.length == 0) {
        // console.log("zeeero!")
        // console.log(storagePolaroids);

        if (storagePolaroids) {
          setPolaroids(storagePolaroids);
        } else {
          localStorage.setItem('polaroids', JSON.stringify(defaultPolaroid));
        }

    } else {
        localStorage.setItem('polaroids', JSON.stringify(polaroids));
    }


  }, [/*localStorage.getItem('notes'), localStorage.getItem('polaroids')*/notes, polaroids]);

  return (
    <>
    <button className='more-options-container'>
        More Options
        <div className='buttons-container'>
              {/* Reset Position */}
              <button onClick={resetStickies} className='reset-button'>
                  <svg width="15" height="15" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32.5 27C29.1863 27 26.5 29.6863 26.5 33V36C26.5 39.3137 29.1863 42 32.5 42H35.5C38.8137 42 41.5 39.3137 41.5 36V33C41.5 29.6863 38.8137 27 35.5 27H32.5Z"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M35 0C37.2092 0 39 1.79083 39 4V9.50006C48.7957 11.4885 56.5115 19.2043 58.4999 29H64C66.2092 29 68 30.7908 68 33V35C68 37.2092 66.2092 39 64 39H58.4999C56.5115 48.7957 48.7957 56.5115 39 58.4999V64C39 66.2092 37.2092 68 35 68H33C30.7908 68 29 66.2092 29 64V58.4999C19.2043 56.5115 11.4885 48.7957 9.50006 39H4C1.79083 39 0 37.2092 0 35V33C0 30.7908 1.79083 29 4 29H9.50006C11.4885 19.2043 19.2043 11.4885 29 9.50006V4C29 1.79083 30.7908 0 33 0H35ZM50 34C50 42.8365 42.8365 50 34 50C25.1635 50 18 42.8365 18 34C18 25.1635 25.1635 18 34 18C42.8365 18 50 25.1635 50 34Z" />
                  </svg>
              </button>

              {/* Create Note */}
              <button onClick={createNote} className='note-button'>
                  <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.8314 12.937H20.9355V1.08795C20.9355 0.491004 20.4552 0.0107574 19.8583 0.0107574H1.90513C1.30819 0.0107574 0.827942 0.491004 0.827942 1.08795V19.0411C0.827942 19.638 1.30819 20.1183 1.90513 20.1183H13.7542V14.0142C13.7542 13.4218 14.2389 12.937 14.8314 12.937ZM20.6213 15.4056L16.2228 19.8041C16.0208 20.0061 15.747 20.1183 15.4598 20.1183H15.1905V14.3733H20.9355V14.6471C20.9355 14.9298 20.8233 15.2036 20.6213 15.4056Z" fill="#FEF7E3"/>
                  </svg>
              </button>

              {/* Create Polaroid */}
              <button onClick={createPolaroid} className='polaroid-button'>
                  <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.7542 6.93203L13.7542 0.827957L1.90513 0.827958C1.30819 0.827958 0.827942 1.3082 0.827942 1.90515L0.827944 19.8583C0.827944 20.4552 1.30819 20.9355 1.90513 20.9355H19.8583C20.4552 20.9355 20.9355 20.4552 20.9355 19.8583L20.9355 8.00922H14.8314C14.2389 8.00922 13.7542 7.52448 13.7542 6.93203ZM16.2228 1.14214L20.6213 5.54066C20.8233 5.74263 20.9355 6.01642 20.9355 6.30367V6.57296L15.1905 6.57296V0.827957L15.4642 0.827957C15.747 0.827957 16.0208 0.940164 16.2228 1.14214ZM18.5699 14.2602L16.1292 11.8196C15.6673 11.3576 14.9184 11.3576 14.4565 11.8196L9.4536 16.8223L7.46226 14.8309C7.00037 14.369 6.25145 14.369 5.78956 14.8309L4.37633 16.2441V18.5699H18.5699V14.2602ZM6.15052 11.4731C7.13038 11.4731 7.92472 10.6788 7.92472 9.69893C7.92472 8.71907 7.13038 7.92473 6.15052 7.92473C5.17066 7.92473 4.37633 8.71907 4.37633 9.69893C4.37633 10.6788 5.17066 11.4731 6.15052 11.4731Z" fill="#FFF8E5"/>
                  </svg>
              </button>
        </div>
    </button>
    <div className='stickies-wrapper'>

        <div className='date accent1-fill'>

            <svg ref={props.summonRef} className='sticky-date' width="138" height="140" viewBox="0 0 138 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M88.4366 6C88.4366 2.68629 85.7503 0 82.4366 0H12C5.37258 0 0 5.37475 0 12.0048V127.995C0 134.625 5.37258 140 12 140H126C132.627 140 138 134.625 138 127.995V54.6111C138 51.2974 135.314 48.6111 132 48.6111H100.099C93.6579 48.6111 88.4366 43.3878 88.4366 36.9444V6Z"/>
                <path d="M136.31 34.1747C137.273 37.6519 134.453 40.8333 130.845 40.8333H102.042C98.8219 40.8333 96.2113 38.2217 96.2113 35V6.90347C96.2113 3.34534 99.3088 0.53776 102.759 1.40542C118.996 5.48797 131.852 18.0848 136.31 34.1747Z"/>
            </svg>

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