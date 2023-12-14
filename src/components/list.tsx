"use client";
import { todo } from 'node:test';
import React, { useState, useEffect, useRef } from 'react';

const List = (props: any) => {

  return (
    <>
      <div>
        <h3>{props.listName}</h3>
        <ul className='todo-list'>
          {
            props.todoList.length < 1 ? "Add a todo" :
            props.todoList.map(todo => (
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
      </div>
    </>
  )
}

export default List;