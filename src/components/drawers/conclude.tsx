import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { browserName, CustomView } from 'react-device-detect';

// document.documentElement.style.setProperty('--base',this.state.color);
const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [settingPage, setLink] = useState("");

    useEffect(() => {
        switch(browserName) {
            case "Chrome":
                setLink("chrome://settings/appearance");
                break;

            case "Firefox":
                setLink("about:preferences#home");
                break;
        }
    }, []);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='left-drawer conclusion-drawer'>
            <h2>What now?</h2>

            <p>Add this as your browser home screen! Depending on which browser you're using, the way to set that might differ.</p>

            <a href={settingPage} target="_blank">
                Take me to my browser settings
            </a>

            <button onClick={() => props.finish(true)}>
                Click this button to check out some extra personalization features!
            </button>

        </div>

        </>
    );
}

export default Drawer;