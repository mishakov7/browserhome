"use client";
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function Note(props: any) {

  const [coordinates, setCoordinates] = useState({x: props.storage.xpos, y: props.storage.ypos});
  const [notetext, setNotetext] = useState(props.storage.note);
  const [noteColor, setNoteColor] = useState(props.storage.color);
  // const [topLayer, setLayer] = useState(false);

  const nodeRef = React.useRef(null);

  const toggleColor = (color: string) => {
    let colors = ["accent1", "accent2", "accent3"];
    let selectedColor = color;

    while (selectedColor == color) {
      selectedColor = colors[Math.floor(Math.random() * 3)];
    }

    setNoteColor(selectedColor);
    
  }

  useEffect(() => {

    let updatedNote = {
      "note": notetext,
      "color": noteColor,
      "rotation": props.storage.rotation,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedNote, props.idx);

  }, [coordinates, notetext, noteColor, props.storage.rotation]);

  return (
    <>
    <Draggable 
      nodeRef={nodeRef}
      defaultPosition={{x: coordinates.x, y: coordinates.y}} 
      onStop={(e, ui) => { setCoordinates({x: ui.x, y: ui.y})}}
      onStart={(e) => props.changeLayer(props.idx)}>
        <div onClick={(e) => props.changeLayer(props.idx)} ref={nodeRef} className={'sticky note ' + (props.isSelected ? "top-sticky" : null)}>
            <div className={props.storage.rotation + ' sticky-wrapper sticky-' + noteColor}>
                <textarea onChange={(e) => { setNotetext(e.target.value)}} defaultValue={notetext} className="note-text"></textarea>
                <button onClick={() => toggleColor(noteColor)} className={'color-button'}>
                    <svg className={noteColor + "-fill"} width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.97548 0.244143C5.12196 1.19141 1.21083 5.09278 0.253798 9.93164C-1.55284 19.0625 6.68446 25.8691 12.8905 24.9072C14.9022 24.5947 15.8886 22.2412 14.9657 20.4297C13.8378 18.2129 15.4491 15.625 17.9393 15.625H21.8309C23.579 15.625 24.995 14.1797 24.9999 12.4365C24.9755 4.74121 17.9735 -1.31347 9.97548 0.244143ZM4.68739 15.625C3.82313 15.625 3.12489 14.9268 3.12489 14.0625C3.12489 13.1982 3.82313 12.5 4.68739 12.5C5.55165 12.5 6.24989 13.1982 6.24989 14.0625C6.24989 14.9268 5.55165 15.625 4.68739 15.625ZM6.24989 9.375C5.38563 9.375 4.68739 8.67676 4.68739 7.8125C4.68739 6.94824 5.38563 6.25 6.24989 6.25C7.11415 6.25 7.81239 6.94824 7.81239 7.8125C7.81239 8.67676 7.11415 9.375 6.24989 9.375ZM12.4999 6.25C11.6356 6.25 10.9374 5.55176 10.9374 4.6875C10.9374 3.82324 11.6356 3.125 12.4999 3.125C13.3642 3.125 14.0624 3.82324 14.0624 4.6875C14.0624 5.55176 13.3642 6.25 12.4999 6.25ZM18.7499 9.375C17.8856 9.375 17.1874 8.67676 17.1874 7.8125C17.1874 6.94824 17.8856 6.25 18.7499 6.25C19.6142 6.25 20.3124 6.94824 20.3124 7.8125C20.3124 8.67676 19.6142 9.375 18.7499 9.375Z"/>
                    </svg>
                </button>
            </div>
        </div>
    </Draggable>
    </>
  )
}