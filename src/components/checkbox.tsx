"use client";
import React, { useState, useEffect, useRef } from 'react';

const Checkbox = (props: any) => {

  return (
    <>
        <input type="checkbox" id={props.chId} name={props.chName} value={props.chValue}>
        <label className="checkbox" for={props.chId}><span></span></label>
    </>
    
  )
}

export default Checkbox;