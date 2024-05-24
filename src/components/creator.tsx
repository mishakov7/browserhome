"use client";
import React, { useState, useEffect, useRef, use } from 'react';

const Creator = (props: any) => {
    const creatorRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);
    const [dropdownClicked, setDropdown] = useState(-1);

    const checkRadio = (ref: any, e: any) => {
        ref.current.click();
    }

    const handleOutsideClick = (e: any) => {
        if (creatorRef.current && optionsRef.current) {
            if (!creatorRef.current.contains(e.target) && !optionsRef.current.contains(e.target)) {
                props.toggleCreatorState();
            }
        } else if (creatorRef.current && dropdownRef.current == null) {
            if (!creatorRef.current.contains(e.target)) {
                props.toggleCreatorState();
            }
        }
    }

    const toggleDropdown = (idx: number) => {
        if (dropdownClicked == -1) {
            setDropdown(idx);
        } else {
            setDropdown(-1);  
        }
    }

    const assignSelections = (gdx: number, value: string) => {

        for (let i = 0; i < props.inputGroups[gdx].options.length; i++) {
            if (props.inputGroups[gdx].options[i].value == value) {
                props.inputGroups[gdx].options[i].selected = true;
            } else {
                props.inputGroups[gdx].options[i].selected = false;
            }
        }

    }

    useEffect(() => {
        
        document.addEventListener("click", handleOutsideClick, false);
        return() => {
          document.removeEventListener("click", handleOutsideClick, false);

        }
    
    }, []);

  return (
    <>
    <div onMouseLeave={props.handleMouseLeave} onClick={() => { if (dropdownClicked != -1) { toggleDropdown(-1) } }} ref={creatorRef} className={'creator ' + props.bg + '-bg ' + props.bg + '-bg-before directed-' + props.direction}>
        { props.inputGroups.map((group: any, gdx: number) => (
                    
            <div key={gdx} className="input-group">

                <label>{group.label}</label>

                { group.type == "radio" ? 

                    <div className='row'>
                        { group.radios.map((radio: any, rdx: number) => (
                            <>
                            <div key={gdx + "-" + rdx}>
                                <input ref={radio.ref} type="radio" name={group.name} value={radio.value} />
                                <label onClick={(e: any) => checkRadio(radio.ref, e)} className={"radio " + radio.value + "-bg"}><span></span></label>
                            </div>
                            </>
                        ))}  
                    </div>

                    : null
                }

                { group.type == "dropdown" ? 

                    <div ref={dropdownRef} className='col dropdown'>
                        { group.options.map((option: any, odx: number) => (

                            option.selected ? 
                            <span onClick={() => { toggleDropdown(gdx) }} className='selected-option'>{option.value}</span>
                            : null
                            
                        ))}

                        {
                            dropdownClicked == gdx ? 
                                
                                <ul ref={optionsRef} className='options'>
                                { group.options.map((option: any, odx: number) => (
                                    <li key={"option" + gdx + "-" + odx} className='row option' onClick={() => { assignSelections(gdx, option.value); setDropdown(-1); }}>{option.value}</li>
                                ))}
                                </ul>   

                            : null
                        }
                    </div>

                    : null
                }

                { group.type == "text" ? 

                    <input ref={group.ref} type="text" name={group.name} placeholder={group.placeholder} defaultValue={group.value} onKeyDown={(e: any) => { if (e.key === "Enter") { props.handleCreator(); } }} /> 

                    : null
                }

                { group.type == "alert" ?

                    <div className='alert'>
                        <label>You sure about that?</label>
                        <div className='input-group'>
                            <button onClick={props.toggleCreatorState}>NVM</button>
                            <button onClick={props.handleCreator}>YEP</button>
                        </div>
                    </div>

                    : null
                }

                { group.type == "message" ?

                    <div className='message'>
                        <label>{group.message}</label>
                        <div className='input-group'>
                            <button onClick={props.toggleCreatorState}>OK</button>
                        </div>
                    </div>

                    : null
                }
                
            </div>
        ))}

        {
            !props.isAlert ? 
            <button onClick={(props.isMessage ? props.toggleCreatorState : props.handleCreator )}>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.16586 10.7824L0.460784 6.27559C0.178111 6.00483 0.178111 5.56583 0.460784 5.29504L1.48445 4.31449C1.76712 4.0437 2.22547 4.0437 2.50814 4.31449L5.67771 7.35045L12.4666 0.847723C12.7492 0.576963 13.2076 0.576963 13.4903 0.847723L14.5139 1.82828C14.7966 2.09904 14.7966 2.53804 14.5139 2.80883L6.18956 10.7824C5.90686 11.0532 5.44854 11.0532 5.16586 10.7824Z" fill="white"/>
                </svg>
            </button>

            : null
        }

    </div>
    </>
  )
}

export default Creator;