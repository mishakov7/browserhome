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

const Todo = (props: any) => {

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
        }),
        end: () => {
            props.setMoving(null);
        }
    });

    const opacity = isDragging ? 0.3 : 1;
    drag(drop(props.allRefs.current[props.idx]))

    return (
        <>
        <li style={{opacity}} ref={(el: any) => { props.allRefs.current[props.idx] = el; }} data-handler-id={handlerId} className={props.isMoving ? "todo-item dragging-" + props.listColor : "todo-item"} key={props.idx}>
            {
                props.isChecked && !props.isEditing ?

                <div className='row'>
                    <label onClick={(e: any) => props.handleCheck(e, props.idx)} className={"checkbox " + props.listColor + "a-bg"}>
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
                !props.isChecked && !props.isEditing ?
                <div className='row'>
                    <label onClick={(e: any) => props.handleCheck(e, props.idx)} className={"checkbox " + props.listColor + "a-bg"}></label>
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
                    <label onClick={(e: any) => props.handleCheck(e, props.idx)} className={"checkbox " + props.listColor + "a-bg"}>
                        <svg className={props.listColor + "-fill"} width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.00501831 1.86048C0.0820692 0.758606 1.03778 -0.0721815 2.13966 0.00486939L10.1202 0.562921C11.2221 0.639972 12.0528 1.59568 11.9758 2.69756C11.8987 3.79944 10.943 4.63023 9.84115 4.55318L1.86063 3.99513C0.758755 3.91807 -0.0720326 2.96236 0.00501831 1.86048Z" fill="#FA3F61"/>
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
        </>

    )
}

export default Todo;