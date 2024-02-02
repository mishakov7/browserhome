import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'

// Each section of the site
import Search from '@/components/search';
import Stickies from '@/components/stickies';
import ToDoLists from '@/components/todolists';
import Bookmarks from '@/components/bookmarks';

export default function Home() {

  // const [drawer, setDrawer] = useState();

  return (
    <>
    <div id="dresser" className="accent1-bg">
      <Head>
        <title>Home | Misha Lukova</title>
        <meta name="description" content="Misha Lukova's graphic and digital portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

{/*
      <Drawer 

      />
*/}
      <div id="main-container" className="accent1-border">
        <div id="main-wrapper">

          <div className='col feature-group'>
            <Search />
            <Stickies />
            <ToDoLists />
          </div>

          <Bookmarks />

        </div>
      </div>
      <footer className='row'>
          <div>
            <p><svg width="16" height="16" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.2188 12.1094C24.2188 18.7987 18.7967 24.2188 12.1094 24.2188C5.42202 24.2188 0 18.7987 0 12.1094C0 5.42397 5.42202 0 12.1094 0C18.7967 0 24.2188 5.42397 24.2188 12.1094ZM12.1094 14.5508C10.8689 14.5508 9.86328 15.5564 9.86328 16.7969C9.86328 18.0374 10.8689 19.043 12.1094 19.043C13.3499 19.043 14.3555 18.0374 14.3555 16.7969C14.3555 15.5564 13.3499 14.5508 12.1094 14.5508ZM9.9769 6.47725L10.3391 13.1179C10.3561 13.4286 10.613 13.6719 10.9242 13.6719H13.2946C13.6058 13.6719 13.8627 13.4286 13.8796 13.1179L14.2418 6.47725C14.2602 6.1416 13.9929 5.85938 13.6568 5.85938H10.5619C10.2258 5.85938 9.95859 6.1416 9.9769 6.47725Z" fill="#FFF8E5"/></svg>Be careful when you clear your cache! You could delete all your storage off this site.</p>
            <h4>Homebase</h4>
            <ul>
              <li>Change your search settings</li>
              <li>Create a list</li>
              <li>Create a note</li>
              <li>Create a polaroid</li>
              <li>Create a bookmark</li>
            </ul>
          </div>

          <div>
            <p>Built by Misha Lukova</p>
            <p>Get me some Kofi!</p>
          </div>
      </footer>
    </div>
    </>
  )
}
