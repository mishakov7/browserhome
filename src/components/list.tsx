"use client";
import { todo } from 'node:test';
import React, { useState, useEffect, useRef } from 'react';

const List = (props: any) => {

  const [todoList, setTodoList] = useState([]);
  const [showCreator, setCreator] = useState(false);

  const currentDate = new Date();

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const createTodo = (e: any) => {
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

  const changeChecked = (e: any) => {

    let todoKey = e.target.name.split("check")[1];
    let storageTodos = JSON.parse(localStorage.getItem('todos'));

    if (e.target.checked) {
        storageTodos[todoKey].checked = true;

    } else {
        storageTodos[todoKey].checked = false;
    }

    console.log(storageTodos);

    setTodoList(storageTodos);
    localStorage.setItem('todos', JSON.stringify(storageTodos));
  }

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
                        <input type='checkbox' onChange={(e) => props.changeChecked(e)} name={'check' + todo.key} checked/> :
                        <input type='checkbox' onChange={(e) => props.changeChecked(e)} name={'check' + todo.key} />
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
          ref1={input1Ref}
          label1="Label" 
          name1="todo-label"
          ref2={input2Ref} 
          label2="Link" 
          name2="todo-link" 
          submitlabel="Add Todo"
          bg="bred-bg"  
        /> 
          
        : null }
    </>
  )
}

export default List;