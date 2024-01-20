"use client";
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function Note(props: any) {

  const [coordinates, setCoordinates] = useState({x: props.storage.xpos, y: props.storage.ypos});
  const [notetext, setNotetext] = useState(props.storage.note);
  const nodeRef = React.useRef(null);

  useEffect(() => {

    let updatedNote = {
      "note": notetext,
      // "color": notecolor,
      "color": props.storage.color,
      "xpos": coordinates.x,
      "ypos": coordinates.y,
    }

    props.handleChange(updatedNote, props.idx);

  }, [coordinates, notetext]);

  return (
    <>
    <Draggable 
      nodeRef={nodeRef}
      defaultPosition={{x: coordinates.x, y: coordinates.y}} 
      onStop={(e, ui) => { setCoordinates({x: ui.x, y: ui.y})}}>
        <div ref={nodeRef} className='sticky note'>
        <div className={'sticky-wrapper sticky-1 sticky-' + props.storage.color}>
            <textarea onChange={(e) => { setNotetext(e.target.value)}} defaultValue={notetext} rows="8" cols="22" className="note-text"></textarea>
        </div>
        </div>
    </Draggable>
    </>
  )
}