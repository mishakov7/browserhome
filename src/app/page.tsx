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

    </div>
    </>
  )
}
