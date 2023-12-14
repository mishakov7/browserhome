import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'

// Each section of the site
import Search from '@/components/search';
import Polaroid from '@/components/polaroid';
import ToDo from '@/components/todo';
import Bookmarks from '@/components/bookmarks';

export default function Home() {

  return (
    <>
    <div id="dresser" className="blurple-bg">
      <Head>
        <title>Home | Misha Lukova</title>
        <meta name="description" content="Misha Lukova's graphic and digital portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="main-container" className="blurple-border">
        <div id="main-wrapper">

          <div className='grid-row'>
            <Polaroid />
            <Search />
            <ToDo />
          </div>

          <Bookmarks />

        </div>
      </div>

    </div>
    </>
  )
}