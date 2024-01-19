"use client";
import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

export default function Note(props: any) {

  const nodeRef = React.useRef(null);

  return (
    <>
    <Draggable 
      nodeRef={nodeRef}
      defaultPosition={{x: props.x, y: props.y}} >
        <div ref={nodeRef} className='sticky note'>
        <div className={'sticky-wrapper sticky-1 sticky-' + props.color}>
            <textarea defaultValue={props.note} rows="8" cols="22" className="note-text"></textarea>
        </div>
        </div>
    </Draggable>
    </>
  )
}