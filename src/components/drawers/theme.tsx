import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Colorful } from '@uiw/react-color';
import { hsvaToHslString } from '@uiw/color-convert';

interface ColorResult {
    h: number;
    s: number;
    v: number;
    a: number;
}

// document.documentElement.style.setProperty('--base',this.state.color);
const Drawer = (props : any) => {
    const [theme, setTheme] = useState("light");

    const colorfulRef = useRef<HTMLDivElement[]>([]);

    const default1 = "141, 108, 210";
    const [hsva1, setHsva1] = useState({ h: 259, s: 0.49, v: 0.821, a: 1 });
    const [accent1, setAccent1] = useState(default1);
    const [colorful1, setColorful1] = useState(false);

    const default2 = "108, 210, 161";
    const [hsva2, setHsva2] = useState({ h: 150, s: 0.49, v: 0.821, a: 1 });
    const [accent2, setAccent2] = useState(default2);
    const [colorful2, setColorful2] = useState(false);

    const default3 = "250, 63, 97";
    const [hsva3, setHsva3] = useState({ h: 349, s: 0.755, v: 0.9805, a: 1 });
    const [accent3, setAccent3] = useState(default3);
    const [colorful3, setColorful3] = useState(false);

    function cleanHsl(hsl: ColorResult) {
        return hsvaToHslString(hsl).split("(")[1].split(")")[0];
    }

    function setCSSVar(accent: string) {
        let storageSettings = JSON.parse(String(localStorage.getItem('settings')));
        let color;

        switch(accent) {
            case "accent1":
                color = accent1;
                break;
            
            case "accent2":
                color = accent2;
                break;

            case "accent3":
                color = accent3;
                break;

            default:
                color = "0, 0, 0";
        }

        document.documentElement.style.setProperty(('--' + accent), color);
        document.documentElement.style.setProperty(('--' + accent + '-lt'), color.split("%")[0] + "%");
        
        storageSettings[accent] = color;
        if (typeof window !== undefined) {
            localStorage.setItem('settings', JSON.stringify(storageSettings));
        }

    }

    const handleOutsideClick = (e: any) => {

        if (colorfulRef.current[0]) {
            if (!colorfulRef.current[0].contains(e.target) ) {
                setColorful1(false);
            }
        } 

        if (colorfulRef.current[1]) {
            if (!colorfulRef.current[1].contains(e.target) ) {
                setColorful2(false);
            }
        } 

        if (colorfulRef.current[2]) {
            if (!colorfulRef.current[2].contains(e.target) ) {
                setColorful3(false);
            }
        } 
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
            setAccent2(localSettings.accent2);
            setAccent3(localSettings.accent3);
        } 

        document.addEventListener("click", handleOutsideClick, false);

        return() => {
          document.removeEventListener("click", handleOutsideClick, false);

        }

    }, [colorful1, colorful2, colorful3]);

    return(
        <>

        <div id="drawer" className='theme-drawer'>
            
            <h2>Choose Colors</h2>

            <div className='row'>
                <label>Accent Color 1 - </label>
                <label onClick={(e: any) => { if (colorful1) { setColorful1(false) } else { setColorful1(true) }} } className={"radio " + "accent1-bg"}></label>   
                {
                    colorful1 ? 
                    <Colorful style={{position: "absolute"}} ref={(el: any) => colorfulRef.current[0] = el} color={hsva1} /*onMouseOut={() => { setCSSVar("accent1") }}*/ onMouseUp={() => { setCSSVar("accent1") }} onChange={(color) => { setHsva1(color.hsva); setAccent1(cleanHsl(color.hsva)); }} disableAlpha />    
                    : null
                }
            </div>

            <div className='row'>
                <label>Accent Color 2 - </label>
                <label onClick={(e: any) => { if (colorful2) { setColorful2(false) } else { setColorful2(true) }} } className={"radio " + "accent2-bg"}></label>   
                {
                    colorful2 ? 
                    <Colorful style={{position: "absolute"}} ref={(el: any) => colorfulRef.current[1] = el} color={hsva2} /*onMouseOut={() => { setCSSVar("accent1") }}*/ onMouseUp={() => { setCSSVar("accent2") }} onChange={(color) => { setHsva2(color.hsva); setAccent2(cleanHsl(color.hsva)); }} disableAlpha />    
                    : null
                }
            </div>

            <div className='row'>
                <label>Accent Color 3 - </label>
                <label onClick={(e: any) => { if (colorful3) { setColorful3(false) } else { setColorful3(true) }} } className={"radio " + "accent3-bg"}></label>   
                {
                    colorful3 ? 
                    <Colorful style={{position: "absolute"}} ref={(el: any) => colorfulRef.current[2] = el} color={hsva3} /*onMouseOut={() => { setCSSVar("accent1") }}*/ onMouseUp={() => { setCSSVar("accent3") }} onChange={(color) => { setHsva3(color.hsva); setAccent3(cleanHsl(color.hsva)); }} disableAlpha />    
                    : null
                }
            </div>

        </div>

        </>
    );
}

export default Drawer;