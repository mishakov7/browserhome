"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from './creator';
import List from './list.tsx';

export default function ToDoList() {

  const [lists, setLists] = useState([]);
  const [showCreator, setCreator] = useState(false);

  const titleInput = useRef(null);
  const currentDate = new Date();

  const creatorInputs = [{
    "ref": titleInput,
    "label": "Name of List",
    "name": "list-name"
  }];

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const createList = (e: any) => {
    let key = 0;

    if (JSON.parse(localStorage.getItem('lists'))) {
      key = JSON.parse(localStorage.getItem('lists')).length;
    }

    let storageList = {
      "key": key,
      "title": titleInput.current.value,
      "todoList": []
    }

    let storageLists = lists.slice();
    storageLists.push(storageList);

    setLists(storageLists);
    localStorage.setItem('lists', JSON.stringify(storageLists));
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
          
          {
            lists.length < 1 ? null :
            lists.map(list => (
              <div className='list-container' key={list.key}>
                <h3>{list.title}</h3>
                
                <List 
                    listKey={list.key}
                />

              </div>
            )) 
          }
          
          <button onClick={toggleCreator} className='list-container'></button>

          { showCreator ?

          <Creator 
            handleCreator={(e: any) => { createList(e); } } 
            inputGroups={creatorInputs}
            submitlabel="Create List"
            bg="bred-bg"  
          /> 
            
          : null }

        </div>
        
    </div>
    </>
  )
}