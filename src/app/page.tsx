import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head'

// Each section of the site
import Google from '@/components/google';
import Polaroid from '@/components/polaroid';

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
          <Polaroid />
          <Google />
          {/* Insert bills/todo component */}
          {/* Insert bookmarks component */}
        </div>
      </div>

    </div>
    </>
  )
}