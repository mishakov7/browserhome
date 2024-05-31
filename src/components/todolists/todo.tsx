"use client";
import type { Identifier, XYCoord } from "dnd-core";
import React, { useState, useEffect, useRef } from 'react';
import Creator from '../creator';
import { useDrag, useDrop } from 'react-dnd';
import { init } from 'next/dist/compiled/webpack/webpack';

interface DragItem {
    idx: number;
    id: string;
    type: string;
}

interface DropResult {
    name: string
}

const Todo = (props: any) => {
    const [showCreator, setCreator] = useState(-1);
    const labelInput = useRef<HTMLInputElement>(null);
    const linkInput = useRef<HTMLInputElement>(null);
    const checkboxRefs = useRef<HTMLElement[]>([]);

    const editorInputs = [{
        "ref": labelInput,
        "type": "text",
        "label": "To-Do Label",
        "name": "todo-label",
        "placeholder": "To-Do #1",
        "value": props.label
      }, {
        "ref": linkInput,
        "type": "text",
        "label": "To-Do Link",
        "name": "todo-link",
        "placeholder": "",
        "value": props.link
    }];

    const toggleCreator = (index: number) => {
        if (index == -1) {
          setCreator(-1);
    
        } else {
          setCreator(index);

          if (labelInput.current) {
              labelInput.current.value = props.label;
          }

          if (linkInput.current) {
              linkInput.current.value = props.link;
          }

        }
    }

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'todo',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!props.allRefs.current[props.idx]) {
                return;
            }
            const dragIndex = item.idx;
            const hoverIndex = props.idx;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = props.allRefs.current[props.idx].getBoundingClientRect();
            const hoverMiddle = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddle) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddle) {
                return;
            }

            props.handleMove(dragIndex, hoverIndex);
            item.idx = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'todo',
        item: () => {
            let idx = props.idx;
            let key = props.idx;
            return { key, idx };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
        end: (item: any, monitor: any) => {
            if (monitor.getDropResult() && monitor.getDropResult().name == "trashcan") {
                props.handleDelete(item.idx);
            }
            
            props.setMoving(null);

        }
    });

    const opacity = isDragging ? 0.3 : 1;
    drag(drop(props.allRefs.current[props.idx]))

    return (
        <>
        <li style={{opacity}} ref={(el: any) => { props.allRefs.current[props.idx] = el; }} data-handler-id={handlerId} className={"todo-item " + (showCreator == props.idx ? "editing-todo" : "" ) + (props.isMoving ? "dragging-" + props.listColor : "")} key={props.idx}>
            {
                !props.isEditing && props.isChecked ?

                <div className='row'>
                    <label onClick={(e: any) => props.handleCheck(e, props.idx)} className={"checkbox " + props.listColor + "-bg"}>
                        <svg className={props.listColor + "-fill"} width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.1862 0.55311C11.7904 -0.0510693 12.77 -0.0510693 13.3742 0.55311L14.2894 1.46829C14.8936 2.07249 14.8935 3.05205 14.2894 3.65622L6.84742 11.0982C6.24325 11.7023 5.26365 11.7024 4.65945 11.0982L0.453135 6.89188C-0.151062 6.28769 -0.151017 5.30813 0.453103 4.70395L1.36825 3.78877C1.97243 3.18456 2.95207 3.18453 3.55625 3.78873L5.75343 5.9859L11.1862 0.55311Z" fill="black"/>
                        </svg>
                    </label>
                    <input ref={(el: any) => props.checkboxes.current[props.idx] = el } type="checkbox" onChange={(e) => props.handleChange(e, props.idx)} defaultChecked />
                    <label>
                        {
                        (props.link != "") ?
                        <a href={props.link} target="_blank">{props.label}</a>
                        :
                        <span onClick={(e: any) => props.handleCheck(e, props.idx)}>{props.label}</span>
                        }
                    </label>
                </div>

                : null               
            }

            {
                !props.isEditing && !props.isChecked ?
                <div className='row'>
                    <label onClick={(e: any) => props.handleCheck(e, props.idx)} className={"checkbox " + props.listColor + "-bg"}></label>
                    <input ref={(el: any) => props.checkboxes.current[props.idx] = el } type="checkbox" onChange={(e) => props.handleChange(e, props.idx)} />                          
                    <label>
                        {
                        (props.link != "") ?
                        <a href={props.link} target="_blank">{props.label}</a>
                        :
                        <span onClick={(e: any) => props.handleCheck(e, props.idx)}>{props.label}</span>
                        }
                    </label>
                </div>
                : null
            }

            {
                props.isEditing ? 
                <div className='row'>
                    <label onClick={(e: any) => toggleCreator(props.idx) } className={"checkbox " + props.listColor + "-bg"}>
                        <svg className={props.listColor + "-fill"} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.8406 15.1529L21.7606 13.9517C21.9705 12.8189 21.9705 11.6568 21.7606 10.524L23.8406 9.3228C24.0799 9.18608 24.1873 8.90288 24.1092 8.63921C23.5672 6.90093 22.6443 5.32866 21.4383 4.02007C21.2527 3.81987 20.95 3.77104 20.7156 3.90776L18.6356 5.10893C17.7615 4.35698 16.7557 3.77592 15.6668 3.39507V0.997604C15.6668 0.724167 15.4764 0.484909 15.2078 0.426315C13.4158 0.0259247 11.5799 0.0454559 9.87579 0.426315C9.60723 0.484909 9.4168 0.724167 9.4168 0.997604V3.39995C8.33282 3.78569 7.32696 4.36675 6.44805 5.11382L4.37286 3.91264C4.1336 3.77592 3.83575 3.81987 3.6502 4.02495C2.44415 5.32866 1.52129 6.90092 0.979303 8.64409C0.896295 8.90776 1.0086 9.19096 1.24786 9.32768L3.32794 10.5289C3.11797 11.6617 3.11797 12.8238 3.32794 13.9566L1.24786 15.1578C1.0086 15.2945 0.901178 15.5777 0.979303 15.8414C1.52129 17.5796 2.44415 19.1519 3.6502 20.4605C3.83575 20.6607 4.13848 20.7095 4.37286 20.5728L6.45294 19.3716C7.32696 20.1236 8.33282 20.7046 9.42169 21.0855V23.4878C9.42169 23.7613 9.61212 24.0005 9.88067 24.0591C11.6727 24.4595 13.5086 24.44 15.2127 24.0591C15.4813 24.0005 15.6717 23.7613 15.6717 23.4878V21.0855C16.7557 20.6998 17.7615 20.1187 18.6404 19.3716L20.7205 20.5728C20.9598 20.7095 21.2576 20.6656 21.4432 20.4605C22.6492 19.1568 23.5721 17.5845 24.1141 15.8414C24.1873 15.5728 24.0799 15.2896 23.8406 15.1529ZM12.5418 16.1441C10.3885 16.1441 8.63555 14.3912 8.63555 12.2378C8.63555 10.0845 10.3885 8.33159 12.5418 8.33159C14.6951 8.33159 16.4481 10.0845 16.4481 12.2378C16.4481 14.3912 14.6951 16.1441 12.5418 16.1441Z" fill="black"/>
                        </svg>
                    </label>
                    <label>
                        {
                        (props.link != "") ?
                        <a href={props.link} target="_blank">{props.label}</a>
                        :
                        <span>{props.label}</span>
                        }
                    </label>
                </div>
                : null
            }

        </li>

        {
            showCreator == props.idx ? 

            <div className='creator-wrapper'>
                <Creator
                    toggleCreatorState={toggleCreator}
                    handleCreator={(e: any) => { props.handleCheck(props.idx, editorInputs); toggleCreator(-1); } } 
                    inputGroups={editorInputs}
                    bg={props.listColor}  
                    direction="right"
                /> 
            </div>

            : null
        }

        </>

    )
}

export default Todo;