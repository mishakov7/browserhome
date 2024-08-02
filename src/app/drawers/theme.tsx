import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Colorful } from '@uiw/react-color';
import {  hsvaToHex, hsvaToHslString, hslStringToHsva } from '@uiw/color-convert';
// @ts-ignore
import ColorContrastChecker from 'color-contrast-checker'; 
import { browserName, CustomView } from 'react-device-detect';

interface ColorResult {
    h: number;
    s: number;
    v: number;
    a: number;
}

const lightTheme = [
    ["--base-bg", "#F5F1E1"],
    ["--base-container", "#FFF8E5"],
    ["--base-txt", "#1E1A35"],
    ["--secondary-txt", "#867D64"],
    ["--secondary-txt-lt", "#CDC7AF"],
    ["--subtle-border", "rgba(205, 199, 175, 0.15)"],
    ["--shadow", "rgba(197, 192, 172, 0.3)"]
]

const darkTheme = [
    ["--base-bg", "#1C202C"],
    ["--base-container", "#2C3245"],
    ["--base-txt", "#F6F6F6"],
    ["--secondary-txt", "#616A82"],
    ["--secondary-txt-lt", "#949AAA"],
    ["--subtle-border", "rgba(76, 91, 136, 0.15)"],
    ["--shadow", "rgba(8, 13, 30, 0.2)"]
]

const Drawer = (props : any) => {

    const drawerRef = useRef<HTMLDivElement>(null);
    const [browserPage, setLink] = useState("");

    const contrastChecker = new ColorContrastChecker();
    const [theme, setTheme] = useState("light");

    const colorfulRef = useRef<HTMLDivElement>(null);
    const [colorful, setColorful] = useState(-1);

    const default1 = "259, 53%, 62%";
    const [hsva1, setHsva1] = useState({ h: 259, s: 0.49, v: 0.821, a: 1 });
    const [accent1, setAccent1] = useState(default1);

    const default2 = "151, 53%, 62%";
    const [hsva2, setHsva2] = useState({ h: 150, s: 0.49, v: 0.821, a: 1 });
    const [accent2, setAccent2] = useState(default2);

    const default3 = "349, 95%, 62%";
    const [hsva3, setHsva3] = useState({ h: 349, s: 0.755, v: 0.9805, a: 1 });
    const [accent3, setAccent3] = useState(default3);

    function cleanHsl(hsl: ColorResult) {
        return hsvaToHslString(hsl).split("(")[1].split(")")[0];
    }

    function setAAText(accent: string, color: ColorResult) {
        let bg = contrastChecker.hexToLuminance(hsvaToHex(color));
        let light = contrastChecker.hexToLuminance("#FFFFFF");
        let dark = contrastChecker.hexToLuminance("#1C202C");

        let lightTxt = contrastChecker.getContrastRatio(bg, light);
        let darkTxt = contrastChecker.getContrastRatio(bg, dark);

        if (darkTxt > lightTxt) {
            document.documentElement.style.setProperty(('--' + accent + '-txt'), "28, 32, 44");
            return "28, 32, 44";

        } else {
            document.documentElement.style.setProperty(('--' + accent + '-txt'), "255, 255, 255");
            return "255, 255, 255";
        }
    }

    function setCSSTheme() {
        let storageSettings = JSON.parse(String(localStorage.getItem('settings')));
        props.dresserRef.classList.remove("light-theme");
        props.dresserRef.classList.remove("dark-theme");

        if (theme == "light") {
            setTheme("dark");
            props.dresserRef.classList.add("dark-theme");
            storageSettings.theme = "dark";

            darkTheme.forEach(item => {
                document.documentElement.style.setProperty(item[0], item[1]); 
            });

        } else {
            setTheme("light");
            props.dresserRef.classList.add("light-theme");
            storageSettings.theme = "light";

            lightTheme.forEach(item => {
                document.documentElement.style.setProperty(item[0], item[1]); 
            });        
        }

        if (typeof window !== undefined) {
            localStorage.setItem('settings', JSON.stringify(storageSettings));
        }
    }

    function setCSSAccent(accent: string) {
        let storageSettings = JSON.parse(String(localStorage.getItem('settings')));
        let color;
        let text;

        switch(accent) {
            case "accent1":
                color = accent1;
                text = setAAText("accent1", hsva1);
                storageSettings["accent1txt"] = text;
                break;
            
            case "accent2":
                color = accent2;
                text = setAAText("accent2", hsva2);
                storageSettings["accent2txt"] = text;
                break;

            case "accent3":
                color = accent3;
                text = setAAText("accent3", hsva3);
                storageSettings["accent3txt"] = text;
                break;

            default:
                color = "0, 0, 0";
        }

        document.documentElement.style.setProperty(('--' + accent), color);
        document.documentElement.style.setProperty(('--' + accent + '-lt'), color.split("%")[0] + "%");
        document.documentElement.style.setProperty(('--' + accent + '-dk'), color.split(",")[0]);
    
        storageSettings[accent] = color;

        if (typeof window !== undefined) {
            localStorage.setItem('settings', JSON.stringify(storageSettings));
        }

    }

    const toggleColorful = (color: number) => {
        if (colorful == color) {
            setColorful(-1);
        } else {
            setColorful(color);
        }
    }

    const handleOutsideClick = (e: any) => {
        if (colorfulRef.current) {
            if (!colorfulRef.current.contains(e.target)) {
                setColorful(-1);
            }
        }
    }

    const handleAnimation = () => {

        if (drawerRef.current) {
            drawerRef.current.style.animation = "closedrawer_left 2s forwards";
            props.contentRef.style.animation = "opencontainer 2s forwards";
        }
    
        setTimeout(() => {
            props.setDrawer(null, 'left')
            props.contentRef.style = [];
        }, 2000);
    }

    const restartTutorial = () => {
        const localSettings = JSON.parse(String(localStorage.getItem('settings')));

        if (localSettings) {
            localSettings.tutorial = 0;
            
            if (typeof window !== undefined) {
                localStorage.setItem('settings', JSON.stringify(localSettings));
            }
        } 

        props.setDrawer("intro", "left");
    }

    useEffect(() => {
        const localSettings = JSON.parse(String(localStorage.getItem('settings')));
            
        if (!localSettings) {
            let defaultSettings = {
                "theme": theme,
                "accent1": default1,
                "accent2": default2,
                "accent3": default3
            }

            localStorage.setItem("settings", JSON.stringify(defaultSettings));
        }

        if (localSettings) {
            setTheme(localSettings.theme);

            setAccent1(localSettings.accent1);
            setHsva1(hslStringToHsva("hsl(" + localSettings.accent1 + ")"));
            
            setAccent2(localSettings.accent2);
            setHsva2(hslStringToHsva("hsl(" + localSettings.accent2 + ")"));
            
            setAccent3(localSettings.accent3);
            setHsva3(hslStringToHsva("hsl(" + localSettings.accent3 + ")"));
        } 

        switch(browserName) {
            case "Chrome":
                setLink("https://support.google.com/chrome/answer/95314?hl=en&co=GENIE.Platform%3DDesktop");
                break;

            case "Firefox":
                setLink("https://support.mozilla.org/en-US/kb/how-to-set-the-home-page");
                break;
        }

        document.addEventListener("click", handleOutsideClick, false);
        return() => {
          document.removeEventListener("click", handleOutsideClick, false);
        }

    }, [colorful]);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='left-drawer theme-drawer'>

            <div className='drawer-organizer'>
                <h2>Color Scheme</h2>

                <div className='row'>
                    <label>Theme</label>
                    <div onClick={() => setCSSTheme()} className={theme + '-toggle toggle'}>
                        <span className="switch"></span>
                    </div>
                </div>

                <div className='row'>
                    <label>Accent Color 1 - </label>
                    <label onClick={(e: any) => { toggleColorful(0) }} className={"radio " + "accent1-bg"}></label>   
                    {
                        colorful == 0 ? 
                        <Colorful style={{position: "absolute"}} ref={colorfulRef} color={hsva1} /*onMouseOut={() => { setCSSAccent("accent1") }}*/ onMouseUp={() => { setCSSAccent("accent1") }} onChange={(color) => { setHsva1(color.hsva); setAccent1(cleanHsl(color.hsva)); }} disableAlpha />    
                        : null
                    }
                </div>

                <div className='row'>
                    <label>Accent Color 2 - </label>
                    <label onClick={(e: any) => { toggleColorful(1)  }} className={"radio " + "accent2-bg"}></label>   
                    {
                        colorful == 1 ? 
                        <Colorful style={{position: "absolute"}} ref={colorfulRef} color={hsva2} /*onMouseOut={() => { setCSSAccent("accent1") }}*/ onMouseUp={() => { setCSSAccent("accent2") }} onChange={(color) => { setHsva2(color.hsva); setAccent2(cleanHsl(color.hsva)); }} disableAlpha />    
                        : null
                    }
                </div>

                <div className='row'>
                    <label>Accent Color 3 - </label>
                    <label onClick={(e: any) => { toggleColorful(2) }} className={"radio " + "accent3-bg"}></label>   
                    {
                        colorful == 2 ? 
                        <Colorful style={{position: "absolute"}} ref={colorfulRef} color={hsva3} /*onMouseOut={() => { setCSSAccent("accent1") }}*/ onMouseUp={() => { setCSSAccent("accent3") }} onChange={(color) => { setHsva3(color.hsva); setAccent3(cleanHsl(color.hsva)); }} disableAlpha />    
                        : null
                    }
                </div>
            </div>

            <div className='drawer-organizer'>
                <h2 className="h2-help" data-after="All the content managed by your homebase is done with your browser&apos;s local storage. You can export the data and import it on a different device.">
                    Manage Data 
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="rgb(var(--accent1-txt))" d="M24.6094 12.5C24.6094 19.1893 19.1874 24.6094 12.5 24.6094C5.81265 24.6094 0.390625 19.1893 0.390625 12.5C0.390625 5.8146 5.81265 0.390625 12.5 0.390625C19.1874 0.390625 24.6094 5.8146 24.6094 12.5ZM12.825 4.39453C10.164 4.39453 8.4668 5.51548 7.13408 7.50771C6.96143 7.76582 7.01919 8.11392 7.26665 8.30156L8.96094 9.58623C9.21509 9.77896 9.5772 9.73311 9.77466 9.48262C10.6469 8.37627 11.245 7.73472 12.5727 7.73472C13.5702 7.73472 14.804 8.37671 14.804 9.34399C14.804 10.0752 14.2003 10.4508 13.2154 11.003C12.0668 11.6469 10.5469 12.4483 10.5469 14.4531V14.6484C10.5469 14.972 10.8092 15.2344 11.1328 15.2344H13.8672C14.1908 15.2344 14.4531 14.972 14.4531 14.6484V14.5833C14.4531 13.1936 18.5149 13.1357 18.5149 9.375C18.5149 6.54287 15.5772 4.39453 12.825 4.39453ZM12.5 16.5039C11.2615 16.5039 10.2539 17.5115 10.2539 18.75C10.2539 19.9885 11.2615 20.9961 12.5 20.9961C13.7385 20.9961 14.7461 19.9885 14.7461 18.75C14.7461 17.5115 13.7385 16.5039 12.5 16.5039Z"/>
                    </svg>
                </h2>

                <button className='data-button'>
                    <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0625 6.64062V0H1.29688C0.647461 0 0.125 0.522461 0.125 1.17188V23.8281C0.125 24.4775 0.647461 25 1.29688 25H17.7031C18.3525 25 18.875 24.4775 18.875 23.8281V7.8125H12.2344C11.5898 7.8125 11.0625 7.28516 11.0625 6.64062ZM14.7954 16.9609L10.0874 21.6338C9.7627 21.9565 9.23828 21.9565 8.91357 21.6338L4.20557 16.9609C3.70996 16.4692 4.05762 15.625 4.75488 15.625H7.9375V11.7188C7.9375 11.2871 8.28711 10.9375 8.71875 10.9375H10.2812C10.7129 10.9375 11.0625 11.2871 11.0625 11.7188V15.625H14.2451C14.9424 15.625 15.29 16.4692 14.7954 16.9609ZM18.5332 5.12695L13.7529 0.341797C13.5332 0.12207 13.2354 0 12.9229 0H12.625V6.25H18.875V5.95215C18.875 5.64453 18.7529 5.34668 18.5332 5.12695Z"/>
                    </svg>
                    Import Data
                </button>

                <button className='data-button'>
                    <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.0625 6.64062V0H1.29688C0.647461 0 0.125 0.522461 0.125 1.17188V23.8281C0.125 24.4775 0.647461 25 1.29688 25H17.7031C18.3525 25 18.875 24.4775 18.875 23.8281V7.8125H12.2344C11.5898 7.8125 11.0625 7.28516 11.0625 6.64062ZM14.2451 17.188H11.0625V21.0942C11.0625 21.5259 10.7129 21.8755 10.2812 21.8755H8.71875C8.28711 21.8755 7.9375 21.5259 7.9375 21.0942V17.188H4.75488C4.05762 17.188 3.70947 16.3437 4.20459 15.8521L8.9126 11.1792C9.2373 10.8564 9.76172 10.8564 10.0864 11.1792L14.7944 15.8521C15.29 16.3437 14.9424 17.188 14.2451 17.188ZM18.5332 5.12695L13.7529 0.341797C13.5332 0.12207 13.2354 0 12.9229 0H12.625V6.25H18.875V5.95215C18.875 5.64453 18.7529 5.34668 18.5332 5.12695Z"/>
                    </svg>
                    Export Data
                </button>

            </div>

            <div className='drawer-organizer'>
                <h2>Help</h2>

                <div className='faq-group'>                
                    <button onClick={() => restartTutorial()} className='faq-button'>
                        Restart tutorial
                    </button>
                    
                    <a className='faq-button' href={browserPage} target="_blank">
                        How do I set my browser home page?
                    </a>

                    <a className='faq-button' href="#feedback">
                        Can I report a bug or provide feedback?
                    </a>

                    <details className='faq-button'>
                        <summary>
                            How can I retain data across devices?
                        </summary>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere laudantium itaque reiciendis excepturi unde facilis, nulla neque autem voluptates incidunt?</p>
                    </details>

                    <details className='faq-button'>
                        <summary>
                            I cleared my cache and lost everything
                        </summary>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere laudantium itaque reiciendis excepturi unde facilis, nulla neque autem voluptates incidunt?</p>
                    </details>

                    <details className='faq-button'>
                        <summary>
                            I&apos;m having storage issues with my browser
                        </summary>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere laudantium itaque reiciendis excepturi unde facilis, nulla neque autem voluptates incidunt?</p>
                    </details>

                    <details className='faq-button'>
                        <summary>
                            How can I retain data across devices?
                        </summary>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere laudantium itaque reiciendis excepturi unde facilis, nulla neque autem voluptates incidunt?</p>
                    </details>
                </div>
            </div>

        </div>

        </>
    );
}

export default Drawer;