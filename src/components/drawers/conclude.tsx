import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { browserName, CustomView } from 'react-device-detect';

// document.documentElement.style.setProperty('--base',this.state.color);
const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [settingPage, setLink] = useState("");

    useEffect(() => {
        switch(browserName) {
            case "Chrome":
                setLink("https://support.google.com/chrome/answer/95314?hl=en&co=GENIE.Platform%3DDesktop");
                break;

            case "Firefox":
                setLink("https://support.mozilla.org/en-US/kb/how-to-set-the-home-page");
                break;
        }
    }, []);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='left-drawer conclusion-drawer'>
            <h2>What now?</h2>

            <p>Add this as your browser home page! Depending on which browser you're using, the way to set that might differ.</p>

            <a className='drawer-button' href={settingPage} target="_blank">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.6094 12.5C24.6094 19.1893 19.1874 24.6094 12.5 24.6094C5.81265 24.6094 0.390625 19.1893 0.390625 12.5C0.390625 5.8146 5.81265 0.390625 12.5 0.390625C19.1874 0.390625 24.6094 5.8146 24.6094 12.5ZM12.825 4.39453C10.164 4.39453 8.4668 5.51548 7.13408 7.50771C6.96143 7.76582 7.01919 8.11392 7.26665 8.30156L8.96094 9.58623C9.21509 9.77896 9.5772 9.73311 9.77466 9.48262C10.6469 8.37627 11.245 7.73472 12.5727 7.73472C13.5702 7.73472 14.804 8.37671 14.804 9.34399C14.804 10.0752 14.2003 10.4508 13.2154 11.003C12.0668 11.6469 10.5469 12.4483 10.5469 14.4531V14.6484C10.5469 14.972 10.8092 15.2344 11.1328 15.2344H13.8672C14.1908 15.2344 14.4531 14.972 14.4531 14.6484V14.5833C14.4531 13.1936 18.5149 13.1357 18.5149 9.375C18.5149 6.54287 15.5772 4.39453 12.825 4.39453ZM12.5 16.5039C11.2615 16.5039 10.2539 17.5115 10.2539 18.75C10.2539 19.9885 11.2615 20.9961 12.5 20.9961C13.7385 20.9961 14.7461 19.9885 14.7461 18.75C14.7461 17.5115 13.7385 16.5039 12.5 16.5039Z"/>
                </svg>

                How do I set my browser home page?
            </a>

            <button className='drawer-button' onClick={() => props.finish(true)}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.6094 12.5C24.6094 19.1893 19.1874 24.6094 12.5 24.6094C5.81265 24.6094 0.390625 19.1893 0.390625 12.5C0.390625 5.8146 5.81265 0.390625 12.5 0.390625C19.1874 0.390625 24.6094 5.8146 24.6094 12.5ZM12.825 4.39453C10.164 4.39453 8.4668 5.51548 7.13408 7.50771C6.96143 7.76582 7.01919 8.11392 7.26665 8.30156L8.96094 9.58623C9.21509 9.77896 9.5772 9.73311 9.77466 9.48262C10.6469 8.37627 11.245 7.73472 12.5727 7.73472C13.5702 7.73472 14.804 8.37671 14.804 9.34399C14.804 10.0752 14.2003 10.4508 13.2154 11.003C12.0668 11.6469 10.5469 12.4483 10.5469 14.4531V14.6484C10.5469 14.972 10.8092 15.2344 11.1328 15.2344H13.8672C14.1908 15.2344 14.4531 14.972 14.4531 14.6484V14.5833C14.4531 13.1936 18.5149 13.1357 18.5149 9.375C18.5149 6.54287 15.5772 4.39453 12.825 4.39453ZM12.5 16.5039C11.2615 16.5039 10.2539 17.5115 10.2539 18.75C10.2539 19.9885 11.2615 20.9961 12.5 20.9961C13.7385 20.9961 14.7461 19.9885 14.7461 18.75C14.7461 17.5115 13.7385 16.5039 12.5 16.5039Z"/>
                </svg>
                How can I personalize my home page?
            </button>

        </div>

        </>
    );
}

export default Drawer;