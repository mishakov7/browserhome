"use client";
import React, { useState, useEffect, useRef } from 'react';

const Bookmark = (props: any) => {

  return (
    <>
    <div className='bookmark'>
        <a href={props.link}>
          <img src={props.image} width="40"/>
        </a>
    </div>
    </>
  )
}

export default Bookmark;