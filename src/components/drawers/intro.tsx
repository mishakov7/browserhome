import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// document.documentElement.style.setProperty('--base',this.state.color);
const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    const handleAnimation = (drawer: any, direction: string) => {

        if (drawerRef.current) {
            drawerRef.current.style.animation = "closedrawer_left 2s forwards";
            props.contentRef.style.animation = "opencontainer 2s forwards";
        }
    
        setTimeout(() => {
            props.setDrawer(drawer, direction)
            props.contentRef.style = [];
        }, 2000);
    }

    // useEffect(() => {

    // }, []);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='left-drawer intro-drawer'>
            <h2>Welcome to Homebase!</h2>

            <p>This site is intended to be your browser “home screen”. You can do many things here! Lemme show you.</p>

            <button onClick={() => handleAnimation("search", "right")} className='tutorial-button'>
                <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0914 0.890831C15.276 -0.292617 17.2023 -0.30197 18.3895 0.892945L18.3931 0.896515L30.8644 13.3488C32.0499 14.5332 32.0592 16.4603 30.8621 17.6471L30.8587 17.6504L18.3874 30.1092C17.2027 31.2927 15.2764 31.302 14.0892 30.107L14.0857 30.1035L12.6666 28.6858C11.4585 27.4789 11.4878 25.5173 12.7148 24.3421L12.7182 24.3388L17.7344 19.5647H3.04037C1.35975 19.5647 0 18.2085 0 16.5259V14.4741C0 12.7915 1.35975 11.4353 3.04037 11.4353H17.7344L12.7204 6.66323L12.7193 6.66224C11.4807 5.48696 11.4504 3.51997 12.6689 2.3119L14.0914 0.890831Z" fill="#8E6DD3"/>
                </svg>
            </button>

        </div>

        </>
    );
}

export default Drawer;