import { setgroups } from 'process';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const gradientRef = useRef<SVGAnimateElement>(null);

    const totalSteps = 3;

    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);

    const [oldGradient, setOldGradient] = useState(1.0);
    const [gradient, setGradient] = useState(1.0);

    const handleBlur = (skip: boolean) => {
        props.blur(props.blurRef.current, "reverse-blur");

        setTimeout(() => {
            props.unblur(props.blurRef.current, 600);
        }, 600);

        setTimeout(() => {

            if (skip) {
                props.skip();
            } else {
                props.setDrawer("list", "right");
            }

        }, 1500);
    }


    const animateGradient = () => {
        let finishedSteps = (step1 ? 1 : 0) + (step2 ? 1 : 0) + (step3 ? 1 : 0);

        setOldGradient(gradient);
        
        if (finishedSteps == totalSteps - 1) {
            setGradient(0);
            handleBlur(false);

        } else {
            setGradient(gradient - ((100 / totalSteps) / 100));
        }
        
        gradientRef.current?.beginElement();
    }

    useEffect(() => {

        if (props.step == 0) {
            props.blur(props.blurRef.current, "blur");
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

                case 3:
                    setStep3(true);
                    animateGradient();
                    break;
            }
        }

    }, [props.step]);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='right-drawer bookmark-drawer'>
            <span className='tutorial-heading'>
                <h2>Tutorial — Bookmarks</h2>
                <button onClick={() => handleBlur(true)} className='skip-button'>Skip Tutorial</button>
            </span>

            <ol>
              <li className={step1 ? "crossed" : ""}>Create your bookmark</li>
              <li className={step2 ? "crossed" : ""}>Edit your bookmark</li>
              <li className={step3 ? "crossed" : ""}>Click on your bookmark</li>
            </ol>

            <p>Instead of going through a million clicks to get to that one browser-defined bookmark, you can create bookmarks here at your homebase.</p>
            <p>In addition to these features, you can drag and drop the bookmarks to change the placements.</p>
            <p>**If you do not see an icon for your page, you may have entered it incorrectly, or that website does not have a <a href="https://www.w3schools.com/html/html_favicon.asp" target="_blank">favicon</a> set.</p>

            <button onClick={() => handleBlur(false) } className={'checkmark-button ' + (gradient == 0.0 ? 'ready' : '')}>
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