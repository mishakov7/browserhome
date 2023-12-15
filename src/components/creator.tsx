"use client";
import React, { useState, useEffect, useRef } from 'react';

const Creator = (props: any) => {

    const checkRadio = (ref: any, e: any) => {
        ref.current.click();
    }

  return (
    <>
    <div className={'creator ' + props.bg + '-bg ' + props.bg + '-bg-before directed-' + props.direction}>
        {
            props.inputGroups.map(group => (
                    
                    <div className="input-group">

                        <label>{group.label}</label>

                        {
                            group.type == "radio" ? 

                            <div className='row'>
                                { group.radios.map(radio => (
                                    <>
                                        <input ref={radio.ref} type="radio" name={group.name} value={radio.value} />
                                        <label onClick={(e: any) => checkRadio(radio.ref, e)} className={"radio " + radio.value + "-bg"}><span></span></label>
                                    </>
                                ))}  
                            </div>

                            : <input ref={group.ref} type="text" name={group.name} /> 
                        }
                        
                    </div>
            ))
        }

        <button onClick={props.handleCreator}>
            {props.submitlabel}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0C10.8669 0 14 3.13306 14 7C14 10.8669 10.8669 14 7 14C3.13306 14 0 10.8669 0 7C0 3.13306 3.13306 0 7 0ZM3.72581 8.24193H7V10.2431C7 10.5452 7.36694 10.6976 7.57863 10.4831L10.8048 7.23992C10.9375 7.10726 10.9375 6.89556 10.8048 6.7629L7.57863 3.51694C7.36411 3.30242 7 3.45484 7 3.75686V5.75806H3.72581C3.53952 5.75806 3.3871 5.91048 3.3871 6.09677V7.90323C3.3871 8.08952 3.53952 8.24193 3.72581 8.24193Z" fill="#000"/>
            </svg>
        </button>

    </div>
    </>
  )
}

export default Creator;