import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// document.documentElement.style.setProperty('--base',this.state.color);
const Drawer = (props : any) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    const handleAnimation = (drawer: string, direction: string) => {

        if (drawerRef.current) {
            drawerRef.current.style.animation = "closedrawer_left 2s forwards";
            props.contentRef.style.animation = "opencontainer 2s forwards";
        }
    
        setTimeout(() => {
            props.setDrawer(drawer, direction)
            props.contentRef.style = [];
        }, 2000);
    }

    // useEffect(() => {

    // }, []);

    return(
        <>

        <div ref={drawerRef} id="drawer" className='left-drawer intro-drawer'>
            <h2>Welcome to Homebase!</h2>

            <p>To get you familiarized here, let's go through this brief tutorial! You'll learn how to use the following features:</p>
            <ul className='guide'>
              <li>
                  <details>
                      <summary>Search <button onClick={() => handleAnimation("search", "right")}>Show me!</button></summary>
                      <p>Currently you can choose between setting your search engine to Google, DuckDuckGo, or Brave. You can also set what type of text you want to see every time you open the page.</p>
                  </details>
              </li>
              <li>
                  <details>
                      <summary>Bookmarks <button onClick={() => console.log("clicked")/*{highlightFeature(bookmarkRef); clickFeature(bookmarkRef);}*/}>Show me!</button></summary>
                      <p>You can enter as many bookmarks as you want so that you can have easy access to all of your websites. You can also delete and edit them.</p>
                      <p>** More will be planned for this feature in the future!</p>
                  </details>
              </li>
              <li>
                  <details>
                      <summary>Lists <button onClick={() => console.log("clicked")/*{highlightFeature(listRef); clickFeature(listRef);}*/}>Show me!</button></summary>
                      <p>You can create up to five lists, and add as many todos as you want. You can also add links to each todo if you want, but that is not required. </p>
                      <p>** More will be planned for this feature in the future!</p>
                  </details>
              </li>
              <li>
                  <details>
                      <summary>Stickies <button onClick={() => console.log("clicked") /*{highlightFeature(moreRef); hoverFeature(moreRef);}*/}>Show me!</button></summary>
                      <p>You can either add polaroids or notes to your homebase, allowing you the ability to personalize to your heart&apos;s content. If you happen to lose a sticky and you can&apos;t click on it, that&apos;s what the reset button is for!</p>
                      <p>** If you are a beta tester, please test polaroids.. I am wondering if I need to set a limit.</p>
                  </details>
              </li>
            </ul>

            <button className="close-drawer" onClick={() => handleAnimation() }>Go Back</button>

        </div>

        </>
    );
}

export default Drawer;