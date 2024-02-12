"use client";
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function Note(props: any) {

  const [coordinates, setCoordinates] = useState({x: props.storage.xpos, y: props.storage.ypos});
  const [notetext, setNotetext] = useState(props.storage.note);
  const [noteColor, setNoteColor] = useState(props.storage.color);

  const nodeRef = React.useRef(null);
  const textareaRef = useRef();

  const copyNoteText = (e: any) => {
    textareaRef.current.select();
    navigator.clipboard.writeText(textareaRef.current.value);
  }

  const changeCoordinates = (coords: any) => {
    setCoordinates(coords);

    let updatedNote = {
      "note": notetext,
      "color": noteColor,
      "rotation": props.storage.rotation,
      "xpos": coords.x,
      "ypos": coords.y,
    }

    props.handleChange(updatedNote, props.idx);
  }

  const changeColor = (color: string) => {
    let colors = ["accent0", "accent1", "accent2", "accent3"];
    let selectedColor = color;

    for (let i = 0; i < colors.length; i++) {

      if (selectedColor == colors[i]) {
        
        if (i == colors.length - 1) {
          selectedColor = colors[0];
          break;
        
        } else {
          selectedColor = colors[i + 1];
          break;
        
        }

      }

    }

    setNoteColor(selectedColor);

    let updatedNote = {
      "note": notetext,
      "color": selectedColor,
      "rotation": props.storage.rotation,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedNote, props.idx);
    
  }

  const changeText = (noteValue: string) => {
    setNotetext(noteValue);

    let updatedNote = {
      "note": noteValue,
      "color": noteColor,
      "rotation": props.storage.rotation,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedNote, props.idx);
  }

  return (
    <>
    {
    <Draggable 
      cancel=".remove-button, .color-button, textarea"
      nodeRef={nodeRef}
      defaultPosition={{x: coordinates.x, y: coordinates.y}} 
      onStop={(e, ui) => { changeCoordinates({x: ui.x, y: ui.y})}}
      onStart={(e) => props.changeLayer(props.idx)}>
        <div onClick={(e) => props.changeLayer(props.idx)} ref={nodeRef} className={'sticky note ' + (props.isSelected ? "top-sticky" : null)}>
            <div className={props.storage.rotation + ' note-wrapper sticky-' + noteColor}>
                <textarea ref={textareaRef} onInput={(e) => { changeText(e.target.value) }} defaultValue={notetext} className="note-text"></textarea>
                <button onClick={() => changeColor(noteColor)} className={'color-button'}>
                    <svg className={noteColor + "-fill"} width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.97548 0.244143C5.12196 1.19141 1.21083 5.09278 0.253798 9.93164C-1.55284 19.0625 6.68446 25.8691 12.8905 24.9072C14.9022 24.5947 15.8886 22.2412 14.9657 20.4297C13.8378 18.2129 15.4491 15.625 17.9393 15.625H21.8309C23.579 15.625 24.995 14.1797 24.9999 12.4365C24.9755 4.74121 17.9735 -1.31347 9.97548 0.244143ZM4.68739 15.625C3.82313 15.625 3.12489 14.9268 3.12489 14.0625C3.12489 13.1982 3.82313 12.5 4.68739 12.5C5.55165 12.5 6.24989 13.1982 6.24989 14.0625C6.24989 14.9268 5.55165 15.625 4.68739 15.625ZM6.24989 9.375C5.38563 9.375 4.68739 8.67676 4.68739 7.8125C4.68739 6.94824 5.38563 6.25 6.24989 6.25C7.11415 6.25 7.81239 6.94824 7.81239 7.8125C7.81239 8.67676 7.11415 9.375 6.24989 9.375ZM12.4999 6.25C11.6356 6.25 10.9374 5.55176 10.9374 4.6875C10.9374 3.82324 11.6356 3.125 12.4999 3.125C13.3642 3.125 14.0624 3.82324 14.0624 4.6875C14.0624 5.55176 13.3642 6.25 12.4999 6.25ZM18.7499 9.375C17.8856 9.375 17.1874 8.67676 17.1874 7.8125C17.1874 6.94824 17.8856 6.25 18.7499 6.25C19.6142 6.25 20.3124 6.94824 20.3124 7.8125C20.3124 8.67676 19.6142 9.375 18.7499 9.375Z"/>
                    </svg>
                </button>

                <button onClick={() => { props.handleDelete(props.idx)}} className={'remove-button ' + noteColor + '-bg'}>
                    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.78135 17.918C1.80691 18.3464 1.98699 18.7485 2.28495 19.0424C2.5829 19.3363 2.97633 19.4999 3.38515 19.5H11.6151C12.0239 19.4999 12.4173 19.3363 12.7153 19.0424C13.0132 18.7485 13.1933 18.3464 13.2189 17.918L13.9287 6H1.07153L1.78135 17.918Z" />
                        <path d="M10.4464 1.12501H14.4643C14.6064 1.12501 14.7426 1.18427 14.8431 1.28976C14.9436 1.39525 15 1.53832 15 1.68751V2.81251C15 2.96169 14.9436 3.10476 14.8431 3.21025C14.7426 3.31574 14.6064 3.37501 14.4643 3.37501H0.535714C0.393634 3.37501 0.257373 3.31574 0.156907 3.21025C0.0564412 3.10476 0 2.96169 0 2.81251V1.68751C0 1.53832 0.0564412 1.39525 0.156907 1.28976C0.257373 1.18427 0.393634 1.12501 0.535714 1.12501H4.55357L4.8683 0.467584C4.93385 0.326845 5.03582 0.208338 5.16255 0.125642C5.28927 0.0429453 5.43562 -0.000596081 5.58482 6.16384e-06H9.41183C9.56137 -0.000106452 9.70798 0.043598 9.83515 0.126203C9.96233 0.208807 10.065 0.327034 10.1317 0.467584L10.4464 1.12501Z" />
                    </svg>
                </button>

                <button onClick={(e) => { copyNoteText(e)}} className={'copy-button ' + noteColor + '-fill'}>
                    <svg width="22" height="22" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 7C1.79086 7 0 8.79083 0 11V25C0 27.2092 1.79086 29 4 29H18C20.2091 29 22 27.2092 22 25H8C5.79086 25 4 23.2092 4 21V7Z" fill="#8D6CD2"/>
                        <path d="M7 4C7 1.79083 8.79086 0 11 0H18C19.1046 0 20 0.89543 20 2V7C20 8.10457 20.8954 9 22 9H27C28.1046 9 29 9.89543 29 11V18C29 20.2092 27.2091 22 25 22H11C8.79086 22 7 20.2092 7 18V4Z" fill="#8D6CD2"/>
                        <path d="M26.6732 7C27.876 7 28.8222 5.9257 28.3439 4.82209C27.5366 2.95897 26.0411 1.46342 24.1779 0.65608C23.0743 0.17786 22 1.12404 22 2.3268V5C22 6.10457 22.8954 7 24 7H26.6732Z" fill="#8D6CD2"/>
                    </svg>
                </button>

            </div>
        </div>
    </Draggable>
    }
    </>
  )
}