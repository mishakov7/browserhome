"use client";
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function Polaroid(props: any) {

  const [image, setImage] = useState(props.storage.image);
  const [coordinates, setCoordinates] = useState({x: props.storage.xpos, y: props.storage.ypos});
  const [notetext, setNotetext] = useState(props.storage.note);
  const [alignment, setAlignment] = useState(props.storage.alignment);  

  const nodeRef = React.useRef(null);
  const reader = new FileReader();
  const uploadButton = useRef();

  function uploadPolaroid(e: any) {
    let polaroid = e.target.files[0];

    reader.addEventListener('load', function() {
      // localStorage.setItem('polaroid', JSON.stringify(reader.result));
      changePolaroid(reader.result);

    });

    if (polaroid) {
      reader.readAsDataURL(polaroid);
    }

  }

  function handleClick(e: any) {
    uploadButton.current.click();
  }

  const changeCoordinates = (coords: any) => {
    setCoordinates(coords);

    let updatedPolaroid = {
      "note": notetext,
      "image": image,
      "alignment": alignment,
      "rotation": props.storage.rotation,
      "xpos": coords.x,
      "ypos": coords.y,
    }

    props.handleChange(updatedPolaroid, props.idx);
  }

  const changePolaroid = (dataimage: any) => {
    setImage(dataimage);

    let updatedPolaroid = {
      "note": notetext,
      "image": dataimage,
      "alignment": alignment,
      "rotation": props.storage.rotation,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedPolaroid, props.idx);
    
  }

  const changeAlignment = (algnment: string) => {
    setAlignment(algnment);

    let updatedPolaroid = {
      "note": notetext,
      "image": image,
      "alignment": algnment,
      "rotation": props.storage.rotation,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedPolaroid, props.idx);
  }

  const changeText = (noteValue: string) => {
    setNotetext(noteValue);

    let updatedPolaroid = {
      "note": noteValue,
      "image": image,
      "alignment": alignment,
      "rotation": props.storage.rotation,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedPolaroid, props.idx);
  }

  return (
    <>
    <Draggable 
      cancel="input[type='text']"
      nodeRef={nodeRef}
      defaultPosition={{x: coordinates.x, y: coordinates.y}} 
      onStop={(e, ui) => { changeCoordinates({x: ui.x, y: ui.y})}}
      onStart={(e) => props.changeLayer(props.idx + props.notes)}>
        <div onClick={(e) => props.changeLayer(props.idx + props.notes)} ref={nodeRef} className={'sticky polaroid ' + (props.isSelected ? "top-sticky" : null)}>
        <div className={'polaroid-wrapper ' + props.storage.rotation}>
              <div className='polaroid-container'>
                    <img className={'img-align-' + alignment} src={image} width="275"/>          
                    <input ref={uploadButton} type="file" onChange={(e) => uploadPolaroid(e)} accept="image/*"/>
                    
                    <button className='upload-button' onClick={handleClick}> 
                        <svg width="20" height="25" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6016 8.55518V0.586426H1.88281C1.10352 0.586426 0.476562 1.21338 0.476562 1.99268V29.1802C0.476562 29.9595 1.10352 30.5864 1.88281 30.5864H21.5703C22.3496 30.5864 22.9766 29.9595 22.9766 29.1802V9.96143H15.0078C14.2344 9.96143 13.6016 9.32861 13.6016 8.55518ZM17.4207 21.212H13.6016V25.8995C13.6016 26.4175 13.182 26.837 12.6641 26.837H10.7891C10.2711 26.837 9.85156 26.4175 9.85156 25.8995V21.212H6.03242C5.1957 21.212 4.77793 20.1989 5.37207 19.6089L11.0217 14.0015C11.4113 13.6142 12.0406 13.6142 12.4303 14.0015L18.0799 19.6089C18.6746 20.1989 18.2574 21.212 17.4207 21.212ZM22.5664 6.73877L16.8301 0.996582C16.5664 0.73291 16.209 0.586426 15.834 0.586426H15.4766V8.08643H22.9766V7.729C22.9766 7.35986 22.8301 7.00244 22.5664 6.73877Z" />
                        </svg>
                    </button>

                    <div className='buttons-container'>
                        {/* Align Top */}
                        <button onClick={(e) => changeAlignment("top")}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.68115 1.34412H15.6812" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1.68115 15.3441H15.6812" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="2.68115" y="4.1441" width="11.2" height="4.8" rx="2" />
                            </svg>
                        </button>

                        {/* Align Middle */}
                        <button onClick={(e) => changeAlignment("center")}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5564 1.34412H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1.5564 15.3441H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="2.5564" y="6.34412" width="11.2" height="4.8" rx="2" />
                            </svg>
                        </button>

                        {/* Align Bottom */}
                        <button onClick={(e) => changeAlignment("bottom")}>
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5564 1.34412H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M1.5564 15.3441H15.5564" strokeWidth="2" strokeLinecap="round"/>
                                <rect x="2.5564" y="7.34412" width="11.2" height="4.8" rx="2"/>
                            </svg>
                        </button>
                    </div>
              </div>

              <input type="text" onChange={(e) => { changeText(e.target.value)}} defaultValue={notetext}/>
              
              <button onClick={() => { props.handleDelete(props.idx)}} className={'remove-button ' + 'accent0-bg'}>
                  <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.78135 17.918C1.80691 18.3464 1.98699 18.7485 2.28495 19.0424C2.5829 19.3363 2.97633 19.4999 3.38515 19.5H11.6151C12.0239 19.4999 12.4173 19.3363 12.7153 19.0424C13.0132 18.7485 13.1933 18.3464 13.2189 17.918L13.9287 6H1.07153L1.78135 17.918Z" />
                      <path d="M10.4464 1.12501H14.4643C14.6064 1.12501 14.7426 1.18427 14.8431 1.28976C14.9436 1.39525 15 1.53832 15 1.68751V2.81251C15 2.96169 14.9436 3.10476 14.8431 3.21025C14.7426 3.31574 14.6064 3.37501 14.4643 3.37501H0.535714C0.393634 3.37501 0.257373 3.31574 0.156907 3.21025C0.0564412 3.10476 0 2.96169 0 2.81251V1.68751C0 1.53832 0.0564412 1.39525 0.156907 1.28976C0.257373 1.18427 0.393634 1.12501 0.535714 1.12501H4.55357L4.8683 0.467584C4.93385 0.326845 5.03582 0.208338 5.16255 0.125642C5.28927 0.0429453 5.43562 -0.000596081 5.58482 6.16384e-06H9.41183C9.56137 -0.000106452 9.70798 0.043598 9.83515 0.126203C9.96233 0.208807 10.065 0.327034 10.1317 0.467584L10.4464 1.12501Z" />
                  </svg>
              </button>
        </div>
        </div>
    </Draggable> 
    </>
  )
}