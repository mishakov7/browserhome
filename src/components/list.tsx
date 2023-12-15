"use client";
import { todo } from 'node:test';
import React, { useState, useEffect, useRef } from 'react';
import Creator from './creator';

const List = (props: any) => {

  const [todoList, setTodoList] = useState([]);
  const [showCreator, setCreator] = useState(false);

  const labelInput = useRef(null);
  const linkInput = useRef(null);
  let allStorageLists = JSON.parse(localStorage.getItem('lists'));
  let storageList = JSON.parse(localStorage.getItem('lists'))[props.listKey];

  const creatorInputs = [{
    "ref": labelInput,
    "label": "To-Do Label",
    "name": "todo-label"
  }, {
    "ref": linkInput,
    "label": "To-Do Link",
    "name": "todo-link"
  }];

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const createTodo = (e: any) => {
    let key = 0;

    if (JSON.parse(localStorage.getItem('lists'))[props.listKey].todoList) {
      key = JSON.parse(localStorage.getItem('lists'))[props.listKey].todoList.length;
    }

    let storageTodo = {
      "key": key,
      "label": labelInput.current.value,
      "link": linkInput.current.value,
      "checked": false
    }

    let storageTodos = todoList.slice();
    storageTodos.push(storageTodo);
    setTodoList(storageTodos);

    let storageLists = JSON.parse(localStorage.getItem('lists'));
    storageLists[props.listKey].todoList = storageTodos;

    localStorage.setItem('lists', JSON.stringify(storageLists));
    toggleCreator();
  }

  const changeChecked = (e: any, key: number) => {

    // let storageTodos = JSON.parse(localStorage.getItem('lists'))[props.listKey].todoList;
    let storageTodos = storageList.todoList;

    console.log("todo list key: " + props.listKey);
    console.log("todo item: " + storageTodos[key]);

    if (e.target.checked) {
        storageTodos[key].checked = true;

    } else {
        storageTodos[key].checked = false;
    }

    console.log(storageTodos);

    setTodoList(storageTodos);
    // localStorage.setItem('todos', JSON.stringify(storageTodos));
    allStorageLists[props.listKey].todoList = storageTodos;
    // let storageLists = JSON.parse(localStorage.getItem('lists'));
    // storageLists[props.listKey].todoList.push(storageTodos);
    localStorage.setItem('lists', JSON.stringify(allStorageLists));
    
  }

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('lists'))[props.listKey].todoList;

    if (localTodos) {
      setTodoList(localTodos);
    }
  }, []);

  return (
    <>
      <ul className='todo-list'>
          {
            todoList.length < 1 ? "Add a todo" :
            todoList.map(todo => (
              <li className='todo-item' key={todo.key}>
                  <div className='input-group'>
                      
                      {
                        todo.checked ?
                        <input type='checkbox' onChange={(e) => changeChecked(e, todo.key)} checked/> :
                        <input type='checkbox' onChange={(e) => changeChecked(e, todo.key)} />
                      }

                      <label>
                          <a href={todo.link} target="_blank">{todo.label}</a>
                      </label>
                  </div>
              </li>
            ))
          }
        </ul>

        <button className='create-button' onClick={toggleCreator}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.2143 9.82143H15.1786V1.78571C15.1786 0.799665 14.3789 0 13.3929 0H11.6071C10.6211 0 9.82143 0.799665 9.82143 1.78571V9.82143H1.78571C0.799665 9.82143 0 10.6211 0 11.6071V13.3929C0 14.3789 0.799665 15.1786 1.78571 15.1786H9.82143V23.2143C9.82143 24.2003 10.6211 25 11.6071 25H13.3929C14.3789 25 15.1786 24.2003 15.1786 23.2143V15.1786H23.2143C24.2003 15.1786 25 14.3789 25 13.3929V11.6071C25 10.6211 24.2003 9.82143 23.2143 9.82143Z" fill="#CDC7AF"/>
            </svg>
        </button>

        { showCreator ?

        <Creator 
          handleCreator={(e: any) => { createTodo(e); } } 
          inputGroups={creatorInputs}
          submitlabel="Add To-Do Item"
          bg="accent1-bg"  
        /> 
          
        : null }
    </>
  )
}

export default List;