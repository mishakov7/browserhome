"use client";
import React, { useState, useEffect, useRef } from 'react';

const Bookmark = (props: any) => {

  return (
    <>
      <a href={props.link} target="_blank">
        <img src={props.image} width="40"/>
      </a>
    </>
  )
}

export default Bookmark;