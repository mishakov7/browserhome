"use client";
import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';

export default function Note(props: any) {

  // const [polaroidImage, setPolaroidImage] = useState("https://d2zp5xs5cp8zlg.cloudfront.net/image-83814-800.jpg");
  // const reader = new FileReader();
  // const uploadButton = useRef();

  // useEffect(() => {

  // }, []);

  return (
    <>
        <div className='note-wrapper' key={props.key}>
          <textarea className="note-text">{props.note}
          </textarea>
        </div>
    </>
  )
}