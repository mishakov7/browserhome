"use client";
import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';

export default function Note(props: any) {

  return (
    <>
        <div className='sticky note' key={props.key}>
          <textarea className="note-text">{props.note}
          </textarea>
        </div>
    </>
  )
}