"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from './creator';

export default function ToDoList() {

  const [lists, setLists] = useState([]);
  // const [showCreator, setCreator] = useState(false);

  const currentDate = new Date();

  // const input1Ref = useRef(null);
  // const input2Ref = useRef(null);

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const createList = (e: any) => {
    let key = 0;

    if (JSON.parse(localStorage.getItem('todos'))) {
      key = JSON.parse(localStorage.getItem('todos')).length;
    }

    let storageTodo = {
      "key": key,
      "label": input1Ref.current.value,
      "link": input2Ref.current.value,
      "checked": false
    }

    let storageTodos = todoList.slice();
    storageTodos.push(storageTodo);

    setTodoList(storageTodos);
    localStorage.setItem('todos', JSON.stringify(storageTodos));
    toggleCreator();
  }

  useEffect(() => {
    const localLists = JSON.parse(localStorage.getItem('lists'));
  
    if (localLists) {
      setLists(localLists);
    }
  }, []);

  return (
    <>
    <div className='todo-container'>
        <div className='date'>
            <span>{currentDate.toLocaleString('default', { month: 'short' })}</span>
            <span>{currentDate.getDate()}</span>
        </div>

        <div className='list-of-lists'>
          
          <button onClick={(e: any) => createList(e)} className='list-container'></button>

        </div>
        
    </div>
    </>
  )
}