import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    const handleAnimation = () => {

        if (drawerRef.current) {
            drawerRef.current.style.animation = "closedrawer_right 2s forwards";
            props.contentRef.style.animation = "opencontainer 2s forwards";
        }
    
        setTimeout(() => {
            props.setDrawer(null)
            props.contentRef.style = [];
        }, 2000);
    }

    // useEffect(() => {

    // }, []);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='right-drawer'>
            <h2>Tutorial - Search</h2>

            <p>To get you familiarized here, let's go through this brief tutorial! You'll learn how to use the following features:</p>
            <ol>
              <li>Search Something</li>
              <li>Change Search Settings</li>
            </ol>

            <button className="close-drawer" onClick={() => handleAnimation() }>Go Back</button>

        </div>

        </>
    );
}

export default Drawer;