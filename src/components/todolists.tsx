"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from './creator';
import List from './list';

export default function ToDoLists() {

  const [lists, setLists] = useState([]);
  const [showCreator, setCreator] = useState(false);
  const [selectedList, setSelectedList] = useState(0);

  const titleInput = useRef(null);
  const colorInput1 = useRef(null);
  const colorInput2 = useRef(null);
  const colorInput3 = useRef(null);
  const colorInputs = [colorInput1, colorInput2, colorInput3];

  const currentDate = new Date();

  const creatorInputs = [{
    "ref": titleInput,
    "type": "text",
    "label": "Name of List",
    "name": "list-name"
  }, {
    "type": "radio",
    "label": "Color Accent",
    "name": "list-color",
    "radios": [
      {
        "ref": colorInput1,
        "value": "accent1"
      }, {
        "ref": colorInput2,
        "value": "accent2"
      }, {
        "ref": colorInput3,
        "value": "accent3"
      }
    ]
  }];

  const toggleSelectedList = (e: any, key: number) => {
    if (e.target.classList.contains('selected-list')) {
      setSelectedList(key);
    
    } else {
      setSelectedList(key);
    }
  }

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

    let selectedColor = null;
    colorInputs.forEach(input => {
      if (input.current.checked) {
        selectedColor = input.current.value;
      }
    });

    let storageList = {
      "key": key,
      "color": selectedColor,
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
    <div className='todolists-container'>
        {/* <div className='date'>
            <span>{currentDate.toLocaleString('default', { month: 'short' })}</span>
            <span>{currentDate.getDate()}</span>
        </div> */}

        {/* <div className='list-of-lists'> */}
          
          {
            lists.length < 1 ? null :
            lists.map(list => (
              <div className={selectedList == list.key ? ('list-container selected-list ' + list.color + '-border-hover') : ('list-container ' + list.color + '-border-hover')} key={list.key} onClick={(e: any) => toggleSelectedList(e, list.key)}>
                <h3>{list.title}</h3>
                
                <List 
                    listKey={list.key}
                    listColor={list.color}
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
            bg="accent3"  
            direction="right"
          /> 
            
          : null }

        {/* </div> */}
        
    </div>
    </>
  )
}