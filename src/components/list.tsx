"use client";
import { todo } from 'node:test';
import React, { useState, useEffect, useRef } from 'react';
import Creator from './creator';

const List = (props: any) => {

  const [todoList, setTodoList] = useState([]);
  const [showCreator, setCreator] = useState(false);

  const creatorRef = useRef(null);
  const labelInput = useRef(null);
  const linkInput = useRef(null);
  const checkboxRefs = useRef([]);

  let allStorageLists = JSON.parse(localStorage.getItem('lists'));
  let storageList = JSON.parse(localStorage.getItem('lists'))[props.listKey];

  const checkTodo = (e: any, idx: number) => {
    checkboxRefs.current[idx].click();
  }

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

    if (storageList.todoList) {
      key = storageList.todoList.length;
    }

    let storageTodo = {
      "key": key,
      "label": labelInput.current.value,
      "link": linkInput.current.value,
      "checked": false
    }

    let storageTodos = todoList.slice();
    storageTodos.push(storageTodo);
    allStorageLists[props.listKey].todoList = storageTodos;

    setTodoList(storageTodos);
    localStorage.setItem('lists', JSON.stringify(allStorageLists));
    toggleCreator();
  }

  const changeChecked = (e: any, key: number) => {
    let storageTodos = storageList.todoList;

    if (e.target.checked) {
        storageTodos[key].checked = true;

    } else {
        storageTodos[key].checked = false;
    }

    setTodoList(storageTodos);
    allStorageLists[props.listKey].todoList = storageTodos;
    localStorage.setItem('lists', JSON.stringify(allStorageLists));
    
  }

  const handleOutsideClick = (e: any) => {
    if (creatorRef.current && !creatorRef.current.contains(e.target)) {
      setCreator(false);
    }
  }

  useEffect(() => {
    const localTodos = storageList.todoList;

    if (localTodos) {
      setTodoList(localTodos);
    }

    document.addEventListener("click", handleOutsideClick, false);

    return() => {
      document.removeEventListener("click", handleOutsideClick, false);
    }

  }, []);

  return (
    <>
      <ul className='todo-list'>
          {
            todoList.length < 1 ? null :
            todoList.map(todo => (
              <li className='todo-item' key={todo.key}>
                      
                      { todo.checked 
                      
                        ?

                        <div className='row'>
                          <label onClick={(e: any) => checkTodo(e, todo.key)} className={"checkbox " + props.listColor + "a-bg"}>
                              <svg className={props.listColor + "-fill"} width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1862 0.55311C11.7904 -0.0510693 12.77 -0.0510693 13.3742 0.55311L14.2894 1.46829C14.8936 2.07249 14.8935 3.05205 14.2894 3.65622L6.84742 11.0982C6.24325 11.7023 5.26365 11.7024 4.65945 11.0982L0.453135 6.89188C-0.151062 6.28769 -0.151017 5.30813 0.453103 4.70395L1.36825 3.78877C1.97243 3.18456 2.95207 3.18453 3.55625 3.78873L5.75343 5.9859L11.1862 0.55311Z" fill="black"/>
                              </svg>
                          </label>
                          <input ref={(el: any) => checkboxRefs.current[todo.key] = el} type="checkbox" onChange={(e) => changeChecked(e, todo.key)} checked />
                          <label>
                              <a href={todo.link} target="_blank">{todo.label}</a>
                          </label>
                        </div>

                        : 
                        
                        <div className='row'>
                          <label onClick={(e: any) => checkTodo(e, todo.key)} className={"checkbox " + props.listColor + "a-bg"}></label>
                          <input ref={(el: any) => checkboxRefs.current[todo.key] = el} type="checkbox" onChange={(e) => changeChecked(e, todo.key)} />                          <label>
                              <a href={todo.link} target="_blank">{todo.label}</a>
                          </label>
                        </div>
                      }
              </li>
            ))
          }

          <div ref={creatorRef} className='creator-wrapper'>
              <button className='create-button' onClick={toggleCreator}>
                  <svg width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.2143 9.82143H15.1786V1.78571C15.1786 0.799665 14.3789 0 13.3929 0H11.6071C10.6211 0 9.82143 0.799665 9.82143 1.78571V9.82143H1.78571C0.799665 9.82143 0 10.6211 0 11.6071V13.3929C0 14.3789 0.799665 15.1786 1.78571 15.1786H9.82143V23.2143C9.82143 24.2003 10.6211 25 11.6071 25H13.3929C14.3789 25 15.1786 24.2003 15.1786 23.2143V15.1786H23.2143C24.2003 15.1786 25 14.3789 25 13.3929V11.6071C25 10.6211 24.2003 9.82143 23.2143 9.82143Z" fill="#CDC7AF"/>
                  </svg>
              </button>

              <Creator
                creatorState={showCreator}
                handleCreator={(e: any) => { createTodo(e); } } 
                inputGroups={creatorInputs}
                bg="accent3"  
                direction="right"
              /> 
                
          </div>

        </ul>

    </>
  )
}

export default List;