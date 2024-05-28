import React, { useState, useEffect, useRef } from 'react';

// document.documentElement.style.setProperty('--base',this.state.color);
const Drawer = (props : any) => {
    const [theme, setTheme] = useState("light");
    // const [accent1, setAccent1] = useState("141, 108, 210");
    // const [accent2, setAccent2] = useState("108, 210, 161");
    // const [accent3, setAccent3] = useState("250, 63, 97");
    const [accent1, setAccent1] = useState("223, 78%, 62%");
    const [accent2, setAccent2] = useState("130, 66%, 63%");
    const [accent3, setAccent3] = useState("191, 100%, 63%");

    useEffect(() => {
        const localSettings = JSON.parse(String(localStorage.getItem('settings')));
    
        if (localSettings) {
            setTheme(localSettings.theme);
            setAccent1(localSettings.accent1);
            setAccent2(localSettings.accent2);
            setAccent3(localSettings.accent3);
        
        } else  {
            let defaultSettings = {
                "theme": theme,
                "accent1": accent1,
                "accent2": accent2,
                "accent3": accent3
            }

            localStorage.setItem("settings", JSON.stringify(defaultSettings));
        }

        document.documentElement.style.setProperty('--accent1', accent1);
        document.documentElement.style.setProperty('--accent2', accent2);
        document.documentElement.style.setProperty('--accent3', accent3);

        document.documentElement.style.setProperty('--accent1-lt', localSettings.accent1.split("%")[0] + "%");
        document.documentElement.style.setProperty('--accent2-lt', localSettings.accent2.split("%")[0] + "%");
        document.documentElement.style.setProperty('--accent3-lt', localSettings.accent3.split("%")[0] + "%");
    
    
    }, []);

    return(
        <>

        <div id="drawer">
            
            <h2>Choose Colors</h2>

        </div>

        </>
    );
}

export default Drawer;