"use client";
import { todo } from 'node:test';
import React, { useState, useEffect, useRef } from 'react';
import Creator from '../creator';

const List = (props: any) => {

  const [todoList, setTodoList] = useState([{"label": "", "link": "", "checked": false}]);
  const [showCreator, setCreator] = useState(false);

  const labelInput = useRef<HTMLInputElement>(null);
  const linkInput = useRef<HTMLInputElement>(null);
  const checkboxRefs = useRef<HTMLInputElement[]>([]);

  // let allStorageLists = JSON.parse(String(localStorage.getItem('lists')));
  // let storageList = JSON.parse(String(localStorage.getItem('lists')))[props.listKey];

  const checkTodo = (e: any, idx: number) => {
    if (checkboxRefs.current[idx]) {
      checkboxRefs.current[idx].click();
    }
  }

  const creatorInputs = [{
    "ref": labelInput,
    "type": "text",
    "label": "To-Do Label",
    "name": "todo-label",
    "placeholder": "To-Do #1"
  }, {
    "ref": linkInput,
    "type": "text",
    "label": "To-Do Link",
    "name": "todo-link",
    "placeholder": ""
  }];

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const createTodo = (e: any) => {
    let storageTodo = { "label": "", "link": "", "checked": false };
    let allStorageLists = props.allLists;

    if (labelInput.current) {
      storageTodo.label = labelInput.current.value;
    }
    
    if (linkInput.current) {
        if (linkInput.current.value.startsWith("https://") || linkInput.current.value.startsWith("http://")) {
          linkInput.current.value = linkInput.current.value;
        } else {
          if (linkInput.current.value != "") {
            linkInput.current.value = "https://" + linkInput.current.value;
          }
        }

        storageTodo.link = linkInput.current.value;

    }

    let storageTodos = todoList.slice();
    storageTodos.push(storageTodo);
    allStorageLists[props.listKey].todoList = storageTodos;

    setTodoList(storageTodos);
    props.setAllLists(allStorageLists);

    if (typeof window !== undefined) {
      localStorage.setItem('lists', JSON.stringify(allStorageLists));
    }

    toggleCreator();
  }

  const changeChecked = (e: any, key: number) => {
    let allStorageLists = props.allLists;
    let storageTodos = allStorageLists[props.listKey].todoList;

    if (e.target.checked) {
        storageTodos[key].checked = true;
        console.log("checked")

    } else {
        storageTodos[key].checked = false;
        console.log("unchecked")
    }

    allStorageLists[props.listKey].todoList = storageTodos;
    setTodoList(storageTodos);

    if (typeof window !== undefined) {
      localStorage.setItem('lists', JSON.stringify(allStorageLists));
      props.setAllLists(JSON.parse(String(localStorage.getItem('lists'))));

    }
    
  }

  useEffect(() => {
    const localTodos = JSON.parse(String(localStorage.getItem('lists')))[props.listKey].todoList;

    if (localTodos) {
      setTodoList(localTodos);
    }

  }, [props.allLists]);

  return (
    <>
      <h3>{props.listTitle}</h3>
      <ul className='todo-list'>
          {
            todoList.length < 1 ? null :
            todoList.map((todo, idx) => (
              <li className='todo-item' key={idx}>
                      
                      { todo.checked 
                      
                        ?

                        <div className='row'>
                          <label onClick={(e: any) => checkTodo(e, idx)} className={"checkbox " + props.listColor + "a-bg"}>
                              <svg className={props.listColor + "-fill"} width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.1862 0.55311C11.7904 -0.0510693 12.77 -0.0510693 13.3742 0.55311L14.2894 1.46829C14.8936 2.07249 14.8935 3.05205 14.2894 3.65622L6.84742 11.0982C6.24325 11.7023 5.26365 11.7024 4.65945 11.0982L0.453135 6.89188C-0.151062 6.28769 -0.151017 5.30813 0.453103 4.70395L1.36825 3.78877C1.97243 3.18456 2.95207 3.18453 3.55625 3.78873L5.75343 5.9859L11.1862 0.55311Z" fill="black"/>
                              </svg>
                          </label>
                          <input ref={(el: any) => checkboxRefs.current[idx] = el } type="checkbox" onChange={(e) => changeChecked(e, idx)} defaultChecked />
                          <label>
                              {
                                (todo.link != "") ?
                                <a href={todo.link} target="_blank">{todo.label}</a>
                                :
                                <span onClick={(e: any) => checkTodo(e, idx)}>{todo.label}</span>
                              }
                          </label>
                        </div>

                        : 
                        
                        <div className='row'>
                          <label onClick={(e: any) => checkTodo(e, idx)} className={"checkbox " + props.listColor + "a-bg"}></label>
                          <input ref={(el: any) => checkboxRefs.current[idx] = el } type="checkbox" onChange={(e) => changeChecked(e, idx)} />                          
                          <label>
                              {
                                (todo.link != "") ?
                                <a href={todo.link} target="_blank">{todo.label}</a>
                                :
                                <span onClick={(e: any) => checkTodo(e, idx)}>{todo.label}</span>
                              }
                              {/* <a href={todo.link} target="_blank">{todo.label}</a> */}
                          </label>
                        </div>
                      }
              </li>
            ))
          }

      </ul>
      <div className='creator-wrapper'>

        <button className='create-button' onClick={toggleCreator}>
            <svg width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.2143 9.82143H15.1786V1.78571C15.1786 0.799665 14.3789 0 13.3929 0H11.6071C10.6211 0 9.82143 0.799665 9.82143 1.78571V9.82143H1.78571C0.799665 9.82143 0 10.6211 0 11.6071V13.3929C0 14.3789 0.799665 15.1786 1.78571 15.1786H9.82143V23.2143C9.82143 24.2003 10.6211 25 11.6071 25H13.3929C14.3789 25 15.1786 24.2003 15.1786 23.2143V15.1786H23.2143C24.2003 15.1786 25 14.3789 25 13.3929V11.6071C25 10.6211 24.2003 9.82143 23.2143 9.82143Z" fill="#CDC7AF"/>
            </svg>
        </button>
          {
              showCreator ?
              <Creator
                toggleCreatorState={toggleCreator}
                handleCreator={(e: any) => { createTodo(e); } } 
                inputGroups={creatorInputs}
                bg={props.listColor}  
                direction="below"
              /> 
              : null 
          }
            
      </div>
    </>
  )
}

export default List;