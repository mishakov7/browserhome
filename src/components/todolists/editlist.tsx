"use client";
import { todo } from 'node:test';
import React, { useState, useEffect, useRef } from 'react';
import Creator from '../creator';

const EditList = (props: any) => {

  const [todoList, setTodoList] = useState([{"label": "", "link": "", "checked": false}]);
  const [showCreator, setCreator] = useState(false);

  const labelInput = useRef<HTMLInputElement>(null);
  const linkInput = useRef<HTMLInputElement>(null);

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
    "placeholder": "mishalukova.com"
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

    let allStorageLists = JSON.parse(String(localStorage.getItem('lists')));
    let storageTodos = todoList.slice();
    storageTodos.push(storageTodo);
    allStorageLists[props.listKey].todoList = storageTodos;

    setTodoList(storageTodos);
    localStorage.setItem('lists', JSON.stringify(allStorageLists));
    toggleCreator();
  }

  const deleteTodo = (e: any, key: number) => {

    let storageTodos = JSON.parse(String(localStorage.getItem('lists')))[props.listKey].todoList;
    let allStorageLists = JSON.parse(String(localStorage.getItem('lists')));

    storageTodos.splice(key, 1);
    setTodoList(storageTodos);

    allStorageLists[props.listKey].todoList = storageTodos;
    localStorage.setItem('lists', JSON.stringify(allStorageLists));


  }


  useEffect(() => {
    const localTodos = JSON.parse(String(localStorage.getItem('lists')))[props.listKey].todoList;

    if (localTodos) {
      setTodoList(localTodos);
    }

  }, []);

  return (
    <>
      <input ref={props.listTitleRef} type="text" name="list-title" placeholder={props.listTitle} />
      <ul className='todo-list'>
          {
            todoList.length < 1 ? null :
            todoList.map((todo, idx) => (
              <li className='todo-item' key={idx}>
                      
                  <div className='row'>
                    <label onClick={(e: any) => deleteTodo(e, idx)} className={"checkbox " + props.listColor + "a-bg"}>
                        <svg className={props.listColor + "-fill"} width="12" height="5" viewBox="0 0 12 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M0.00501831 1.86048C0.0820692 0.758606 1.03778 -0.0721815 2.13966 0.00486939L10.1202 0.562921C11.2221 0.639972 12.0528 1.59568 11.9758 2.69756C11.8987 3.79944 10.943 4.63023 9.84115 4.55318L1.86063 3.99513C0.758755 3.91807 -0.0720326 2.96236 0.00501831 1.86048Z" fill="#FA3F61"/>
                        </svg>
                    </label>
                    <label>
                        {
                          (todo.link != "") ?
                          <a href={todo.link} target="_blank">{todo.label}</a>
                          :
                          <span>{todo.label}</span>
                        }
                        {/* <a href={todo.link} target="_blank">{todo.label}</a> */}                    </label>
                  </div>

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

export default EditList;