"use client";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrop } from 'react-dnd';
import React, { useState, useEffect, useRef, memo, FC } from 'react';
import { init } from 'next/dist/compiled/webpack/webpack';

const Trashcan = (props: any) => {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'todo',
        drop: () => ({ name: 'trashcan' }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),

    }))

    const isActive = canDrop && isOver;

    return (
        <>
        <button ref={drop} onClick={() => props.handleClick()} className={'remove-button ' + props.color + "-fill " + (isActive ? "trash-animation" : "")} data-testid="trashcan">

            <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.78135 17.918C1.80691 18.3464 1.98699 18.7485 2.28495 19.0424C2.5829 19.3363 2.97633 19.4999 3.38515 19.5H11.6151C12.0239 19.4999 12.4173 19.3363 12.7153 19.0424C13.0132 18.7485 13.1933 18.3464 13.2189 17.918L13.9287 6H1.07153L1.78135 17.918Z" />
                <path d="M10.4464 1.12501H14.4643C14.6064 1.12501 14.7426 1.18427 14.8431 1.28976C14.9436 1.39525 15 1.53832 15 1.68751V2.81251C15 2.96169 14.9436 3.10476 14.8431 3.21025C14.7426 3.31574 14.6064 3.37501 14.4643 3.37501H0.535714C0.393634 3.37501 0.257373 3.31574 0.156907 3.21025C0.0564412 3.10476 0 2.96169 0 2.81251V1.68751C0 1.53832 0.0564412 1.39525 0.156907 1.28976C0.257373 1.18427 0.393634 1.12501 0.535714 1.12501H4.55357L4.8683 0.467584C4.93385 0.326845 5.03582 0.208338 5.16255 0.125642C5.28927 0.0429453 5.43562 -0.000596081 5.58482 6.16384e-06H9.41183C9.56137 -0.000106452 9.70798 0.043598 9.83515 0.126203C9.96233 0.208807 10.065 0.327034 10.1317 0.467584L10.4464 1.12501Z" />
            </svg>

        </button> 
        </>
    )
}

export default Trashcan;