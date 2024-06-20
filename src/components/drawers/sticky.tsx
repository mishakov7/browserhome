import { setgroups } from 'process';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const gradientRef = useRef<SVGAnimateElement>(null);

    const totalSteps = 4;

    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [step4, setStep4] = useState(false);
    const [step5, setStep5] = useState(false);
    const [step6, setStep6] = useState(false);

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

    const handleBlur = (skip: boolean) => {
        props.blur(props.blurRef.current, "reverse-blur");

        setTimeout(() => {
            props.unblur(props.blurRef.current, 600);
        }, 600);

        setTimeout(() => {

            if (skip) {
                props.skip();
            } else {
                props.setDrawer("conclude", "right");
            }

        }, 1500);
    }


    const animateGradient = () => {
        let finishedSteps = step1 + step2 + step3 + step4 + step5 + step6;

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

                case 4:
                    setStep4(true);
                    animateGradient();
                    break;

                case 5:
                    setStep5(true);
                    animateGradient();
                    break;

                case 6:
                    setStep6(true);
                    animateGradient();
                    break;
            }
        }

    }, [props.step]);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='right-drawer'>
            <span className='tutorial-heading'>
                <h2>Tutorial — Stickies</h2>
                <button onClick={() => handleBlur(true)} className='skip-button'>Skip Tutorial</button>
            </span>


            <p>To get you familiarized here, let's go through this brief tutorial! You'll learn how to use the following features:</p>
            
            <ol>
              <li className={step1 ? "crossed" : ""}>Move around your sticky note or polaroid</li>
              <li className={step2 ? "crossed" : ""}>Edit the text on your sticky note</li>
              <li className={step3 ? "crossed" : ""}>Edit the image on your polaroid</li>
              <li className={step4 ? "crossed" : ""}>Add a new sticky note</li>
              <li className={step5 ? "crossed" : ""}>Add a new polaroid</li>
              <li className={step6 ? "crossed" : ""}>Reset the positions of your stickies</li>
            </ol>

            <button onClick={() => handleBlur(false) } className={'checkmark-button ' + (gradient == 0.0 ? 'ready' : null)}>
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