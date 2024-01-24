"use client";
import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';
import Polaroid from './polaroid';
import Note from './note';
import { create } from 'domain';


export default function Stickies() {
  const defaultNote = [{
    "note": "Change my text!",
    "color": "accent" + randomIdx(0, 3),
    "rotation": "sticky-" + randomIdx(1, 10),
    "xpos": -462,
    "ypos": 175
  }];

  const defaultPolaroid = [{
    "note": "Hover over the image!",
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

  const createNote = (e: any) => {
    const storageNotes = JSON.parse(localStorage.getItem('notes'));
    let newNote = {
      "note": "Change my text!",
      "color": "accent" + randomIdx(1, 3),
      "rotation": "sticky-" + randomIdx(1, 10),
      "xpos": -462,
      "ypos": 175
    };

    storageNotes.push(newNote);

    setNotes(storageNotes);
    localStorage.setItem('notes', JSON.stringify(storageNotes));
  }

  const editNote = (update: any, idx: number) => {    
    const storageNotes = JSON.parse(localStorage.getItem('notes'));
    storageNotes[idx] = update;
    
    localStorage.setItem('notes', JSON.stringify(storageNotes));
    setNotes(storageNotes);
  }

  const deleteNote = (idx: number) => { 
    let storageNotes = JSON.parse(localStorage.getItem('notes'));
    storageNotes.splice(idx, 1);

    localStorage.setItem('notes', JSON.stringify(storageNotes));
    setNotes(JSON.parse(localStorage.getItem('notes')));

    setletterKey(randLetter());
  }

  const createPolaroid = (e: any) => {
    let storagePolaroids = JSON.parse(localStorage.getItem('polaroids'));
    let newPolaroid = {
      "note": "Hover over the image!",
      "image": "https://i.makeagif.com/media/11-12-2023/JbwsRE.gif",
      "alignment": "center",
      "rotation": "sticky-" + randomIdx(1, 10),
      "xpos": -155,
      "ypos": 75
    };

    storagePolaroids.push(newPolaroid);

    setPolaroids(storagePolaroids);
    localStorage.setItem('polaroids', JSON.stringify(storagePolaroids));
  }

  const editPolaroid = (update: any, idx: number) => {    
    let storagePolaroids = JSON.parse(localStorage.getItem('polaroids'));
    storagePolaroids[idx] = update;
    
    localStorage.setItem('polaroids', JSON.stringify(storagePolaroids));
    setPolaroids(storagePolaroids);
  }

  const deletePolaroid = (idx: number) => { 
    let storagePolaroids = JSON.parse(localStorage.getItem('polaroids'));
    storagePolaroids.splice(idx, 1);

    localStorage.setItem('polaroids', JSON.stringify(storagePolaroids));
    setPolaroids(JSON.parse(localStorage.getItem('polaroids')));

    setletterKey(randLetter());
  }

  useEffect(() => {
    let storageNotes = JSON.parse(localStorage.getItem('notes'));
    let storagePolaroids = JSON.parse(localStorage.getItem('polaroids'));

    if (storageNotes) {
      setNotes(storageNotes);

    } else {
      localStorage.setItem('notes', JSON.stringify(defaultNote));
    }

    if (storagePolaroids) {
      setPolaroids(storagePolaroids);

    } else {
      localStorage.setItem('polaroids', JSON.stringify(defaultPolaroid));
    }

  }, [localStorage.getItem('notes'), localStorage.getItem('polaroids')]);

  return (
    <>
    <div className='stickies-wrapper'>

        <div className='date accent1-bg'>
            <span>{currentDate.toLocaleString('default', { month: 'short' })}</span>
            <span>{currentDate.getDate()}</span>

            <div className='buttons-container'>
                {/* Create List */}
                <button /*onClick={}*/ className='list-button'>
                    <svg width="15" height="15" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.752 0.827942C2.3353 0.827942 1.92796 0.956009 1.58149 1.19595C1.23502 1.43589 0.96498 1.77692 0.805517 2.17593C0.646054 2.57493 0.604332 3.01399 0.685625 3.43757C0.766919 3.86115 0.967577 4.25023 1.26223 4.55562C1.55687 4.861 1.93228 5.06897 2.34097 5.15323C2.74966 5.23748 3.17328 5.19424 3.55826 5.02897C3.94323 4.8637 4.27228 4.58382 4.50378 4.22472C4.73529 3.86563 4.85885 3.44344 4.85885 3.01156C4.85885 2.43243 4.63688 1.87702 4.24177 1.46751C3.84666 1.058 3.31077 0.827942 2.752 0.827942ZM2.752 8.10668C2.3353 8.10668 1.92796 8.23475 1.58149 8.47469C1.23502 8.71463 0.96498 9.05567 0.805517 9.45467C0.646054 9.85367 0.604332 10.2927 0.685625 10.7163C0.766919 11.1399 0.967577 11.529 1.26223 11.8344C1.55687 12.1397 1.93228 12.3477 2.34097 12.432C2.74966 12.5162 3.17328 12.473 3.55826 12.3077C3.94323 12.1424 4.27228 11.8626 4.50378 11.5035C4.73529 11.1444 4.85885 10.7222 4.85885 10.2903C4.85885 9.71117 4.63688 9.15576 4.24177 8.74625C3.84666 8.33674 3.31077 8.10668 2.752 8.10668ZM2.752 15.3854C2.3353 15.3854 1.92796 15.5135 1.58149 15.7534C1.23502 15.9934 0.96498 16.3344 0.805517 16.7334C0.646054 17.1324 0.604332 17.5715 0.685625 17.9951C0.766919 18.4186 0.967577 18.8077 1.26223 19.1131C1.55687 19.4185 1.93228 19.6265 2.34097 19.7107C2.74966 19.795 3.17328 19.7517 3.55826 19.5865C3.94323 19.4212 4.27228 19.1413 4.50378 18.7822C4.73529 18.4231 4.85885 18.0009 4.85885 17.569C4.85885 16.9899 4.63688 16.4345 4.24177 16.025C3.84666 15.6155 3.31077 15.3854 2.752 15.3854ZM22.416 16.1133H8.37028C8.18402 16.1133 8.00539 16.19 7.87369 16.3265C7.74198 16.463 7.66799 16.6481 7.66799 16.8412V18.2969C7.66799 18.49 7.74198 18.6751 7.87369 18.8116C8.00539 18.9481 8.18402 19.0248 8.37028 19.0248H22.416C22.6022 19.0248 22.7809 18.9481 22.9126 18.8116C23.0443 18.6751 23.1183 18.49 23.1183 18.2969V16.8412C23.1183 16.6481 23.0443 16.463 22.9126 16.3265C22.7809 16.19 22.6022 16.1133 22.416 16.1133ZM22.416 1.55582H8.37028C8.18402 1.55582 8.00539 1.6325 7.87369 1.76901C7.74198 1.90551 7.66799 2.09065 7.66799 2.28369V3.73944C7.66799 3.93248 7.74198 4.11762 7.87369 4.25412C8.00539 4.39063 8.18402 4.46731 8.37028 4.46731H22.416C22.6022 4.46731 22.7809 4.39063 22.9126 4.25412C23.0443 4.11762 23.1183 3.93248 23.1183 3.73944V2.28369C23.1183 2.09065 23.0443 1.90551 22.9126 1.76901C22.7809 1.6325 22.6022 1.55582 22.416 1.55582ZM22.416 8.83456H8.37028C8.18402 8.83456 8.00539 8.91124 7.87369 9.04775C7.74198 9.18425 7.66799 9.36939 7.66799 9.56243V11.0182C7.66799 11.2112 7.74198 11.3964 7.87369 11.5329C8.00539 11.6694 8.18402 11.7461 8.37028 11.7461H22.416C22.6022 11.7461 22.7809 11.6694 22.9126 11.5329C23.0443 11.3964 23.1183 11.2112 23.1183 11.0182V9.56243C23.1183 9.36939 23.0443 9.18425 22.9126 9.04775C22.7809 8.91124 22.6022 8.83456 22.416 8.83456Z" fill="#FFF8E5"/>
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
        </div>

        <div className='stickies-container'>

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