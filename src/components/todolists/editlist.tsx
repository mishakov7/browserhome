"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from '../creator';
import Todo from './todo';

const EditList = (props: any) => {

  const [todoList, setTodoList] : any = useState([/*{"label": "", "link": "", "checked": false}*/]);
  const [showCreator, setCreator] = useState(false);
  const [moveIdx, setMoveIdx] : any | number = useState(null);

  const labelInput = useRef<HTMLInputElement>(null);
  const linkInput = useRef<HTMLInputElement>(null);

  const todoRefs = useRef<HTMLLIElement[]>([]);

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

    let storageTodos : any = todoList.slice();
    storageTodos.push(storageTodo);
    allStorageLists[props.listKey].todoList = storageTodos;

    setTodoList(storageTodos);
    props.setAllLists(allStorageLists);

    if (typeof window !== undefined) {
      localStorage.setItem('lists', JSON.stringify(allStorageLists));
    }

    toggleCreator();

    if (props.step >= 0) {
      props.handleStep(3);
    }

  }

  const moveTodo = (initial: number, target: number) => {
    let storageTodos : any = todoList.slice();
    let todoValue = storageTodos[initial];
    let allStorageLists = props.allLists;

    setMoveIdx(target);
    
    storageTodos.splice(initial, 1)
    storageTodos.splice(target, 0, todoValue)

    allStorageLists[props.listKey].todoList = storageTodos;

    setTodoList(storageTodos);
    props.setAllLists(allStorageLists);

    if (typeof window !== undefined) {
      localStorage.setItem('lists', JSON.stringify(allStorageLists));
    }

    props.setDrag(false);

  }

  const deleteTodo = (key: number) => {

    let storageTodos = JSON.parse(String(localStorage.getItem('lists')))[props.listKey].todoList;
    let allStorageLists = JSON.parse(String(localStorage.getItem('lists')));

    storageTodos.splice(key, 1);
    setTodoList(storageTodos);

    allStorageLists[props.listKey].todoList = storageTodos;
    props.setAllLists(allStorageLists);
    
    if (typeof window !== undefined) {
      localStorage.setItem('lists', JSON.stringify(allStorageLists));
    }

    if (props.step >= 0) {
      props.handleStep(4);
    }
    props.setDrag(false);

  }

  const editTodo = (key: number, refs: any) => {
    let storageTodos : any = todoList.slice();
    let allStorageLists = JSON.parse(String(localStorage.getItem('lists')));
    let storageTodo = storageTodos[key];

    if (refs[0].ref.current) {
      storageTodo.label = refs[0].ref.current.value;
    }
    
    if (refs[1].ref.current) {
        if (refs[1].ref.current.value.startsWith("https://") || refs[1].ref.current.value.startsWith("http://")) {
          refs[1].ref.current.value = refs[1].ref.current.value;
        } else {
          if (refs[1].ref.current.value != "") {
            refs[1].ref.current.value = "https://" + refs[1].ref.current.value;
          }
        }

        storageTodo.link = refs[1].ref.current.value;

    }

    let editedTodo = {
      "label": storageTodo.label,
      "link": storageTodo.link
    }

    storageTodos[key] = editedTodo;
    setTodoList(storageTodos);

    allStorageLists[props.listKey].todoList = storageTodos;
    props.setAllLists(allStorageLists);

    if (typeof window !== undefined) {
      localStorage.setItem('lists', JSON.stringify(allStorageLists));
    }

  }

  useEffect(() => {
    let localTodos;
    if (localStorage.getItem('lists')) {
      localTodos = JSON.parse(String(localStorage.getItem('lists')))[props.listKey].todoList;
      setTodoList(localTodos);
    }

  }, []);

  return (
    <>
      <input ref={props.listTitleRef} type="text" name="list-title" placeholder={props.listTitle} />
      <ul className='todo-list'>
              {
                todoList.length < 1 ? null :
                todoList.map((todo: any, idx: number) => (
                  
                  <Todo 
                      key={"etodo-" + idx}
                      allRefs={todoRefs}
                      idx={idx}
                      isMoving={moveIdx == idx ? true : false}
                      setMoving={setMoveIdx}
                      isChecked={todo.checked}
                      handleMove={moveTodo}
                      handleDelete={deleteTodo}
                      handleCheck={editTodo}
                      handleChange={null}
                      listColor={props.listColor}
                      checkboxes={null}
                      label={todo.label}
                      link={todo.link}

                      isEditing={true}
                      isDragging={props.setDrag}
                  />
                 
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