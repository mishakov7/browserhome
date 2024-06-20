import { setgroups } from 'process';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const gradientRef = useRef<SVGAnimateElement>(null);

    const totalSteps = 6;

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

    const handleBlur = (navigator: number) => {

        props.blur(props.blurRef.current, "reverse-blur");

        setTimeout(() => {
            props.unblur(props.blurRef.current, 600);
        }, 600);

        setTimeout(() => {
            switch(navigator) {
                case -1:
                    props.tutorial(-1);
                    props.setDrawer("list", "right");
                    break;

                case 0:
                    props.skip();
                    break;

                case 1:
                    props.tutorial(-1);
                    props.setDrawer("conclude", "right");
                    break;
            }

        }, 1500);
    }


    const animateGradient = () => {
        let finishedSteps = step1 + step2 + step3 + step4 + step5 + step6;

        setOldGradient(gradient);
        
        if (finishedSteps == totalSteps - 1) {
            setGradient(0);
            handleBlur(1);

        } else {
            setGradient(gradient - ((100 / totalSteps) / 100));
        }
        
        gradientRef.current?.beginElement();
    }

    useEffect(() => {

        if (props.step == -1) {
            props.blur(props.blurRef.current, "blur");
            props.interact(props.blurRef.current);     
            props.tutorial(0);           
        
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

        <div ref={drawerRef} id="drawer" className='right-drawer sticky-drawer'>
            <span className='tutorial-heading'>
                <h2>Tutorial — Stickies</h2>
                <button onClick={() => handleBlur(0)} className='skip-button'>Skip Tutorial</button>
            </span>
            
            <ol>
              <li className={step1 ? "crossed" : ""}>Move around your sticky note or polaroid</li>
              <li className={step2 ? "crossed" : ""}>Edit the text on your sticky note</li>
              <li className={step3 ? "crossed" : ""}>Edit the image on your polaroid</li>
              <li className={step4 ? "crossed" : ""}>Add a new sticky note</li>
              <li className={step5 ? "crossed" : ""}>Add a new polaroid</li>
              <li className={step6 ? "crossed" : ""}>Reset the positions of your stickies</li>
            </ol>

            <p>We all need to leave a reminder, or have a motivating picture of our loved ones sitting around when you're working. Why not have it digitally?</p>
            <p>Currently, you can have a limit of 2 polaroids and 10 sticky notes.</p>

            <button /*onClick={() => handleBlur(false) }*/ className={'checkmark-button ' + (gradient == 0.0 ? 'ready' : '')}>
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

            <div className='navigation row'>
                <button onClick={() => handleBlur(-1)} className='tutorial-button accent1-fill'>
                    <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.6654 30.1092C16.4807 31.2926 14.5545 31.302 13.3672 30.1071L13.3637 30.1035L0.892359 17.6512C-0.293192 16.4668 -0.302492 14.5397 0.894707 13.3529L0.898049 13.3496L13.3693 0.890832C14.554 -0.292651 16.4804 -0.301972 17.6676 0.893051L17.671 0.896516L19.0902 2.31423C20.2983 3.52109 20.269 5.48269 19.042 6.65793L19.0385 6.66121L14.0223 11.4353H28.7164C30.397 11.4353 31.7568 12.7915 31.7568 14.4741V16.5259C31.7568 18.2085 30.397 19.5647 28.7164 19.5647H14.0223L19.0364 24.3368L19.0374 24.3378C20.276 25.513 20.3063 27.48 19.0879 28.6881L17.6654 30.1092Z"/>
                    </svg>
                </button>

                
                <button onClick={() => handleBlur(1)} className='tutorial-button accent1-fill'>
                    <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.0914 0.890831C15.276 -0.292617 17.2023 -0.30197 18.3895 0.892945L18.3931 0.896515L30.8644 13.3488C32.0499 14.5332 32.0592 16.4603 30.8621 17.6471L30.8587 17.6504L18.3874 30.1092C17.2027 31.2927 15.2764 31.302 14.0892 30.107L14.0857 30.1035L12.6666 28.6858C11.4585 27.4789 11.4878 25.5173 12.7148 24.3421L12.7182 24.3388L17.7344 19.5647H3.04037C1.35975 19.5647 0 18.2085 0 16.5259V14.4741C0 12.7915 1.35975 11.4353 3.04037 11.4353H17.7344L12.7204 6.66323L12.7193 6.66224C11.4807 5.48696 11.4504 3.51997 12.6689 2.3119L14.0914 0.890831Z"/>
                    </svg>
                </button>
            </div> 
        </div>

        </>
    );
}

export default Drawer;