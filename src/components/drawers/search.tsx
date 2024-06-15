import { setgroups } from 'process';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const gradientRef = useRef<SVGAnimateElement>(null);

    const totalSteps = 2;

    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);

    const [oldGradient, setOldGradient] = useState(1.0);
    const [gradient, setGradient] = useState(1.0);

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

    const animateGradient = () => {
        let finishedSteps = (step1 ? 1 : 0) + (step2 ? 1 : 0);

        setOldGradient(gradient);
        
        if (finishedSteps == totalSteps - 1) {
            setGradient(0);
            props.blurRef.current.classList.add("reverse-blur");
            
            setTimeout(() => {
                props.unblur(props.blurRef.current);
                props.setDrawer("bookmark", "right")
            }, 5000);

        } else {
            setGradient(gradient - ((100 / totalSteps) / 100));
        }
        
        gradientRef.current?.beginElement();
    }

    useEffect(() => {
        if (props.step == 0) {
            props.blur(props.blurRef.current);
            props.interact(props.blurRef.current);                
        
        } else {
            switch(props.step) {
                case 1:
                    setStep1(true);
                    animateGradient();
                    break;
    
                case 2:
                    setStep2(true);
                    animateGradient();
                    break;
            }
        }

    }, [props.step]);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='right-drawer'>
            <span className='tutorial-heading'>
                <h2>Tutorial — Search</h2>
                <button onClick={() => props.skip()} className='skip-button'>Skip Tutorial</button>
            </span>

            <p>To get you familiarized here, let's go through this brief tutorial! You'll learn how to use the following features:</p>
            
            <ol>
              <li className={step1 ? "crossed" : ""}>Search Something</li>
              <li className={step2 ? "crossed" : ""}>Change Search Settings</li>
            </ol>

            <button onClick={() => props.setDrawer("bookmark", "right") } className={'checkmark-button ' + (gradient == 0.0 ? 'ready' : '')}>
                <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill={"url(#dynamic-gradient)"} fillRule="evenodd" clipRule="evenodd" d="M4.47731 10.8532L1.81425 13.5164C0.0984672 15.2323 0.0982755 18.0145 1.81427 19.7305L14.0548 31.971C15.7708 33.6871 18.553 33.6869 20.2689 31.9711L41.9254 10.3146C43.6412 8.59864 43.6413 5.81655 41.9253 4.10055L39.2622 1.43735C37.5462 -0.278596 34.764 -0.278596 33.0481 1.43735L17.1619 17.3235L10.6915 10.8531C8.97556 9.13713 6.19325 9.1372 4.47731 10.8532Z" />
                    <defs>
                        <linearGradient id="dynamic-gradient" x1="21.8698" y1="0.150391" x2="21.8698" y2="33.258" gradientUnits="userSpaceOnUse">
                        <stop stopColor={"hsl(" + document.documentElement.style.getPropertyValue("--accent1-lt") + ", 80%)"}/>
                        <stop offset={oldGradient} stopColor={"hsl(" + document.documentElement.style.getPropertyValue("--accent1-lt") + ", 80%)"}>
                            <animate id="gradientRef" ref={gradientRef} attributeName='offset' dur="0.6s" to={gradient} repeatCount="0" begin="indefinite" fill="freeze"/>
                        </stop>
                        <stop offset="0" stopColor={"hsl(" + document.documentElement.style.getPropertyValue("--accent1") + ""}/>
                        </linearGradient>
                    </defs>
                </svg>
            </button>

        </div>

        </>
    );
}

export default Drawer;