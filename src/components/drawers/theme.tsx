import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Colorful } from '@uiw/react-color';
import {  hsvaToHex, hsvaToHslString, hslStringToHsva } from '@uiw/color-convert';
import ColorContrastChecker from 'color-contrast-checker'; 

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
    ["--shadow", "rgba(225, 217, 184, 0.2)"]
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

// document.documentElement.style.setProperty('--base',this.state.color);
const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);
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
            drawerRef.current.style.animation = "closedrawer_left 0.6s forwards";
        }
    
        setTimeout(() => {
            props.setDrawer(null)
        }, 600);
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

        document.addEventListener("click", handleOutsideClick, false);

        return() => {
          document.removeEventListener("click", handleOutsideClick, false);

        }

    }, [colorful]);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='theme-drawer'>
            <h2>Choose Colors</h2>

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

            <button onClick={() => handleAnimation() }>Go Back</button>

        </div>

        </>
    );
}

export default Drawer;