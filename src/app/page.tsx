"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import Head from 'next/head';
import Drawers from '@/components/utilities/drawers';
import Loader from '@/components/utilities/loader';

// Each section of the site
import Search from '@/components/search';
import Stickies from '@/components/stickies';
import ToDoLists from '@/components/todolists';
import Bookmarks from '@/components/bookmarks';

const lightTheme = [
  ["--base-bg", "#F5F1E1"],
  ["--base-container", "#FFF8E5"],
  ["--base-txt", "#1E1A35"],
  ["--secondary-txt", "#867D64"],
  ["--secondary-txt-lt", "#CDC7AF"],
  ["--subtle-border", "rgba(205, 199, 175, 0.15)"],
  ["--shadow", "rgba(197, 192, 172, 0.3)"]
]

const darkTheme = [
  ["--base-bg", "#1C202C"],
  ["--base-container", "#2C3245"],
  ["--base-txt", "#F6F6F6"],
  ["--secondary-txt", "#616A82"],
  ["--secondary-txt-lt", "#949AAA"],
  ["--subtle-border", "rgba(76, 91, 136, 0.15)"],
  ["--shadow", "rgba(8, 13, 30, 0.2)"]
]

export default function Home() {

  const [LeftDrawer, setDrawerLeft] = useState(null);
  const [RightDrawer, setDrawerRight] = useState(null);
  const [stickyCommand, setStickyCommand] = useState(0);

  const mainContainer = useRef<HTMLDivElement>(null);
  const dresser = useRef<HTMLDivElement>(null);
  const blurLayers = useRef<HTMLDivElement[]>([]);

  const searchRef = useRef(null);
  const bookmarkRef = useRef(null);
  const listRef = useRef(null);
  const moreRef = useRef(null);
  const optionsRef = useRef(null);

  const [searchTutorial, setSearchTutorial] = useState(-1);
  const [bookmarkTutorial, setBookmarkTutorial] = useState(-1);  
  const [listTutorial, setListTutorial] = useState(-1);  
  const [stickyTutorial, setStickyTutorial] = useState(-1);  

  const clickFeature = (ref: any) => {
    window.scrollTo({top: 0, behavior: "smooth"});
    ref.click();
  }

  const hoverFeature = (ref: any) => {
    window.scrollTo({top: 0, behavior: "smooth"});
    ref.classList.add("hovered");
  }

  const highlightFeature = (ref: any, cssclass: string) => {   
    window.scrollTo({top: 0, behavior: "smooth"});

    switch(ref) {
      case searchRef.current:
        blurLayers.current[1].classList.add(cssclass);
        blurLayers.current[2].classList.add(cssclass);
        blurLayers.current[3].classList.add(cssclass);
        break;
      
      case moreRef.current:
        blurLayers.current[0].classList.add(cssclass);
        blurLayers.current[2].classList.add(cssclass);
        blurLayers.current[3].classList.add(cssclass);
        break;

      case listRef.current:
        blurLayers.current[0].classList.add(cssclass);
        blurLayers.current[1].classList.add(cssclass);
        blurLayers.current[3].classList.add(cssclass);
        break;

      case bookmarkRef.current:
        blurLayers.current[0].classList.add(cssclass);
        blurLayers.current[1].classList.add(cssclass);
        blurLayers.current[2].classList.add(cssclass);
        break;
    }

    ref.classList.add("highlight");
  }

  const removeHighlight = (ref: any, timeout: number) => {
    setTimeout(() => {
      blurLayers.current[0].classList.remove("blur");
      blurLayers.current[1].classList.remove("blur");
      blurLayers.current[2].classList.remove("blur");
      blurLayers.current[3].classList.remove("blur");

      blurLayers.current[0].classList.remove("reverse-blur");
      blurLayers.current[1].classList.remove("reverse-blur");
      blurLayers.current[2].classList.remove("reverse-blur");
      blurLayers.current[3].classList.remove("reverse-blur");

      ref.classList.remove("highlight");
      ref.classList.remove("hovered");

    }, timeout);
  }

  // Tutorial
  function finishTutorial(lastStep: Boolean) {
    const localSettings = JSON.parse(String(localStorage.getItem('settings')));
    localSettings.tutorial = 5;

    if (typeof window !== undefined) {
      localStorage.setItem('settings', JSON.stringify(localSettings));
    }

    setSearchTutorial(-1);
    setBookmarkTutorial(-1);
    setListTutorial(-1);
    setStickyTutorial(-1);

    if (lastStep) {
      changeDrawer("theme", "left");
    } else {
      changeDrawer(null, "right");
    }
  }

  // Themes
  function setCSSTheme(theme: string) {
      if (theme == "dark") {
          dresser.current?.classList.add("dark-theme");
          darkTheme.forEach(item => {
              document.documentElement.style.setProperty(item[0], item[1]); 
          });

      } else {
          dresser.current?.classList.add("light-theme");
          lightTheme.forEach(item => {
              document.documentElement.style.setProperty(item[0], item[1]); 
          });        
      }
  }

  function setCSSAccent(accent: string, color: string) {
    document.documentElement.style.setProperty(('--' + accent), color);
    document.documentElement.style.setProperty(('--' + accent + '-lt'), color.split("%")[0] + "%");
    document.documentElement.style.setProperty(('--' + accent + '-dk'), color.split(",")[0]);

  }

  function updateDrawer(drawer: any) {
    let component;
    if (drawer != null) {
      Drawers.map((x: any) => {
        if (x.file == drawer) {
          switch (drawer) {
            case "search":
              component = <x.tag skip={finishTutorial} tutorial={setSearchTutorial} step={searchTutorial} setDrawer={changeDrawer} interact={clickFeature} blurRef={searchRef} blur={highlightFeature} unblur={removeHighlight}/>
              break;
  
            case "bookmark":
              component = <x.tag skip={finishTutorial} tutorial={setBookmarkTutorial} step={bookmarkTutorial} setDrawer={changeDrawer} interact={clickFeature} blurRef={bookmarkRef} blur={highlightFeature} unblur={removeHighlight}/>
              break;

            case "list":
              component = <x.tag skip={finishTutorial} tutorial={setListTutorial} step={listTutorial} setDrawer={changeDrawer} interact={clickFeature} blurRef={listRef} blur={highlightFeature} unblur={removeHighlight}/>
              break;

            case "sticky":
              component = <x.tag skip={finishTutorial} tutorial={setStickyTutorial} step={stickyTutorial} setDrawer={changeDrawer} interact={hoverFeature} hoverRef={optionsRef} blurRef={moreRef} blur={highlightFeature} unblur={removeHighlight}/>
              break;

            default: 
              component = <x.tag setDrawer={changeDrawer} dresserRef={dresser.current} contentRef={mainContainer.current} />
          }
        }

      });
    }

    return component;

  }

  function changeDrawer(drawer: any, direction: string) {
    if (drawer != null) {
      Drawers.map((x: any) => {

        x.element = updateDrawer(drawer);

        if (x.file == drawer && direction == "left") {
          setDrawerLeft(x.element);
          setDrawerRight(null);
          mainContainer.current?.classList.add("opened-left");
          mainContainer.current?.classList.remove("opened-right");

        } else if (x.file == drawer && direction == "right") {
          setDrawerRight(x.element);
          setDrawerLeft(null);
          mainContainer.current?.classList.add("opened-right");
          mainContainer.current?.classList.remove("opened-left");

        }
      });
    
    } else {
      if (direction == "left") {
        setDrawerLeft(null);
        mainContainer.current?.classList.remove("opened-left");
      } else {
        setDrawerRight(null);
        mainContainer.current?.classList.remove("opened-right");
      }
    }
  }

  useEffect(() => {
    const localSettings = JSON.parse(String(localStorage.getItem('settings')));

    if (RightDrawer == null) {
      if (!localSettings) {
        changeDrawer("intro", "left");

        setCSSTheme("light");
        setCSSAccent("accent1", "259, 53%, 62%");
        setCSSAccent("accent2", "151, 53%, 62%");
        setCSSAccent("accent3", "349, 95%, 62%");

        let settings = {
          "theme": "light",
          "accent1": document.documentElement.style.getPropertyValue("--accent1"),
          "accent2": document.documentElement.style.getPropertyValue("--accent2"),
          "accent3": document.documentElement.style.getPropertyValue("--accent3")
        }

        if (typeof window !== undefined) {
          localStorage.setItem('settings', JSON.stringify(settings));
        }

      } else {
        if (!localSettings.tutorial) {
          changeDrawer("intro", "left");

        } else if (localSettings.tutorial < 5) {
          switch(localSettings.tutorial) {
            case 0:
              changeDrawer("intro", "left");
              break;

            case 1:
              changeDrawer("search", "right");
              break;

            case 2:
              changeDrawer("bookmark", "right");
              break;

            case 3:
              changeDrawer("list", "right");
              break;

            case 4:
              changeDrawer("sticky", "right");
              break;
          }
        }

        setCSSTheme(localSettings.theme);
        setCSSAccent("accent1", localSettings.accent1);
        setCSSAccent("accent2", localSettings.accent2);
        setCSSAccent("accent3", localSettings.accent3);
      }
    }

    if (RightDrawer && searchTutorial > 0) {
      setDrawerRight(updateDrawer("search"));
    }
    
    if (RightDrawer && bookmarkTutorial > 0) {
      setDrawerRight(updateDrawer("bookmark"));
    }

    if (RightDrawer && listTutorial > 0) {
      setDrawerRight(updateDrawer("list"));
    }

    if (RightDrawer && stickyTutorial > 0) {
      setDrawerRight(updateDrawer("sticky"));
    }

}, [searchTutorial, bookmarkTutorial, listTutorial, stickyTutorial]); 

  return (
    <>
    <div ref={dresser} id="dresser" className="accent1-bg">
    <Head>
        <title>Home | Misha Lukova</title>
        <meta name="description" content="Misha Lukova's graphic and digital portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { LeftDrawer }

      <div ref={mainContainer} id="main-container" className="accent1-border">

        <Suspense fallback={<Loader />}>
          <div ref={optionsRef} className='options-container'>
              <button className='settings-button' onClick={ () => { if (LeftDrawer == null) { changeDrawer("theme", "left") } else { changeDrawer(null, "left") } }}>
                  <svg className="accent1-fill" width="16" height="37" viewBox="0 0 16 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.0781 9.31566C16.7805 14.1109 16.7805 22.8891 11.0781 27.6843L4.4122e-07 37L0 0L11.0781 9.31566Z"/>
                  </svg>
              </button>
              <div className='buttons-container'>
                    {/* Reset Position */}
                    <button onClick={() => { setStickyCommand(1); stickyTutorial >= 0 ? setStickyTutorial(6) : null }} className='reset-button'>
                        <svg width="15" height="15" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.5 27C29.1863 27 26.5 29.6863 26.5 33V36C26.5 39.3137 29.1863 42 32.5 42H35.5C38.8137 42 41.5 39.3137 41.5 36V33C41.5 29.6863 38.8137 27 35.5 27H32.5Z"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M35 0C37.2092 0 39 1.79083 39 4V9.50006C48.7957 11.4885 56.5115 19.2043 58.4999 29H64C66.2092 29 68 30.7908 68 33V35C68 37.2092 66.2092 39 64 39H58.4999C56.5115 48.7957 48.7957 56.5115 39 58.4999V64C39 66.2092 37.2092 68 35 68H33C30.7908 68 29 66.2092 29 64V58.4999C19.2043 56.5115 11.4885 48.7957 9.50006 39H4C1.79083 39 0 37.2092 0 35V33C0 30.7908 1.79083 29 4 29H9.50006C11.4885 19.2043 19.2043 11.4885 29 9.50006V4C29 1.79083 30.7908 0 33 0H35ZM50 34C50 42.8365 42.8365 50 34 50C25.1635 50 18 42.8365 18 34C18 25.1635 25.1635 18 34 18C42.8365 18 50 25.1635 50 34Z" />
                        </svg>
                    </button>

                    {/* Create Note */}
                    <button onClick={() => { setStickyCommand(2); stickyTutorial >= 0 ? setStickyTutorial(4) : null }} className='note-button'>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.8314 12.937H20.9355V1.08795C20.9355 0.491004 20.4552 0.0107574 19.8583 0.0107574H1.90513C1.30819 0.0107574 0.827942 0.491004 0.827942 1.08795V19.0411C0.827942 19.638 1.30819 20.1183 1.90513 20.1183H13.7542V14.0142C13.7542 13.4218 14.2389 12.937 14.8314 12.937ZM20.6213 15.4056L16.2228 19.8041C16.0208 20.0061 15.747 20.1183 15.4598 20.1183H15.1905V14.3733H20.9355V14.6471C20.9355 14.9298 20.8233 15.2036 20.6213 15.4056Z" fill="#FEF7E3"/>
                        </svg>
                    </button>

                    {/* Create Polaroid */}
                    <button onClick={() => { setStickyCommand(3); stickyTutorial >= 0 ? setStickyTutorial(5) : null }} className='polaroid-button'>
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M13.7542 6.93203L13.7542 0.827957L1.90513 0.827958C1.30819 0.827958 0.827942 1.3082 0.827942 1.90515L0.827944 19.8583C0.827944 20.4552 1.30819 20.9355 1.90513 20.9355H19.8583C20.4552 20.9355 20.9355 20.4552 20.9355 19.8583L20.9355 8.00922H14.8314C14.2389 8.00922 13.7542 7.52448 13.7542 6.93203ZM16.2228 1.14214L20.6213 5.54066C20.8233 5.74263 20.9355 6.01642 20.9355 6.30367V6.57296L15.1905 6.57296V0.827957L15.4642 0.827957C15.747 0.827957 16.0208 0.940164 16.2228 1.14214ZM18.5699 14.2602L16.1292 11.8196C15.6673 11.3576 14.9184 11.3576 14.4565 11.8196L9.4536 16.8223L7.46226 14.8309C7.00037 14.369 6.25145 14.369 5.78956 14.8309L4.37633 16.2441V18.5699H18.5699V14.2602ZM6.15052 11.4731C7.13038 11.4731 7.92472 10.6788 7.92472 9.69893C7.92472 8.71907 7.13038 7.92473 6.15052 7.92473C5.17066 7.92473 4.37633 8.71907 4.37633 9.69893C4.37633 10.6788 5.17066 11.4731 6.15052 11.4731Z" fill="#FFF8E5"/>
                        </svg>
                    </button>
              </div>
          </div>
          
          <div ref={moreRef} id="main-wrapper" >

            <div className='col feature-group'>
              <Search parentRef={(el: any) => (blurLayers.current[0] = el)} summonRef={searchRef} setTutorial={setSearchTutorial} step={searchTutorial} />
              <Stickies parentRef={(el: any) => (blurLayers.current[1] = el)} command={stickyCommand} setCommand={setStickyCommand} setTutorial={setStickyTutorial} step={stickyTutorial} />
              <ToDoLists parentRef={(el: any) => (blurLayers.current[2] = el)} summonRef={listRef} setTutorial={setListTutorial} step={listTutorial} />
            </div>
  
            <Bookmarks parentRef={(el: any) => (blurLayers.current[3] = el)} summonRef={bookmarkRef} setTutorial={setBookmarkTutorial} step={bookmarkTutorial} />
          </div>
        </Suspense>

      </div>

      { RightDrawer }

      <footer>
        <div className='row'>
            <button className="cache-button">
              {/* Be careful when you clear your cache! You could delete all your storage off this site. */}
                <svg width="28" height="28" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.2188 12.1094C24.2188 18.7987 18.7967 24.2188 12.1094 24.2188C5.42202 24.2188 0 18.7987 0 12.1094C0 5.42397 5.42202 0 12.1094 0C18.7967 0 24.2188 5.42397 24.2188 12.1094ZM12.1094 14.5508C10.8689 14.5508 9.86328 15.5564 9.86328 16.7969C9.86328 18.0374 10.8689 19.043 12.1094 19.043C13.3499 19.043 14.3555 18.0374 14.3555 16.7969C14.3555 15.5564 13.3499 14.5508 12.1094 14.5508ZM9.9769 6.47725L10.3391 13.1179C10.3561 13.4286 10.613 13.6719 10.9242 13.6719H13.2946C13.6058 13.6719 13.8627 13.4286 13.8796 13.1179L14.2418 6.47725C14.2602 6.1416 13.9929 5.85938 13.6568 5.85938H10.5619C10.2258 5.85938 9.95859 6.1416 9.9769 6.47725Z" fill="#FFF8E5"/></svg>
            </button>

            <p className='uppercase'>Built by <a href='https://mishalukova.com/' target='_blank'>Misha Lukova</a> </p>

            <a className="kofi-button" href="https://ko-fi.com/mlukova" target="_blank">
              {/*"Get me some Kofi*/}
                <svg width="30" height="20" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M22.8789 4.48969C22.543 2.76169 21.6719 1.67819 20.707 1.03711C19.7461 0.345215 18.5859 0.00100708 17.4297 0.00100708L0.832031 0C0.597656 0 0.417969 0.0967102 0.285156 0.231384C0.09375 0.430695 0.0117188 0.712891 0.0117188 0.889587V1.0874C0.0117188 1.0874 -0.0351562 8.58539 0.0585938 12.6313C0.199219 15 2.51562 15 2.51562 15C2.51562 15 10.0898 15.0005 13.7539 14.9531C13.9492 14.9531 14.0898 14.9531 14.2852 14.9053C15.0938 14.6938 15.6172 14.2637 15.9531 13.7529C16.4805 12.957 16.5508 11.9653 16.5508 11.3027C20.7031 11.4937 23.6484 8.48441 22.8789 4.48969ZM18.1992 8.38531C17.8086 8.42969 17.4492 8.44379 17.168 8.4458C16.8242 8.44821 16.6055 8.43259 16.6055 8.43259V2.86041H17.7148C18.0273 2.86041 18.332 2.9165 18.6172 3.02829C18.9883 3.1738 19.3242 3.41461 19.5938 3.75049C19.9336 4.146 20.1758 4.6875 20.1758 5.47852C20.1758 7.30179 19.2578 8.0415 18.1992 8.38531ZM8.45312 11.8379C8.44141 11.8477 8.35547 11.9312 8.25391 11.9102L8.20312 11.8931L8.16797 11.8748C8.15332 11.8657 8.13965 11.8554 8.12891 11.8442L8.08984 11.8096L8.06641 11.7881C7.63281 11.3945 4.83203 8.83151 4.20703 7.94189C3.53125 6.95651 3.19531 5.2764 4.10938 4.2915L4.14453 4.25589C5.07422 3.3042 7.01953 3.2251 8.30859 4.68649L8.35156 4.63919L8.41016 4.57669C8.78125 4.20901 10.0898 3.082 11.6367 3.74951C13.4219 4.53711 13.3711 6.66019 12.3125 7.94189C12.2461 8.02106 12.1748 8.10345 12.0996 8.18845C12.0234 8.27438 11.9434 8.36301 11.8594 8.45361C11.5938 8.74509 11.293 9.05759 10.9883 9.37061C10.6328 9.7319 10.2695 10.0942 9.92969 10.4253C9.11719 11.2202 8.45312 11.8379 8.45312 11.8379Z" fill="#FFF8E5"/></svg>
            </a>
        </div>

        <div className='readme'>
            <h4 className='uppercase'>Homebase</h4>
            <p>Welcome to your homebase! </p>
            <p>If you&apos;ve gotten ahold of this link, congrats! You are one of my beta testers. If you experience any issues with a feature, please report it.</p>
            <p>Here are some of the fun things you can do here: </p>
            <ul className='guide'>
              <li>
                  <details>
                      <summary>Change your search settings! <button onClick={() => {highlightFeature(searchRef.current, "blur"); clickFeature(searchRef.current); removeHighlight(searchRef.current, 4000);}}>Show me!</button></summary>
                      <p>Currently you can choose between setting your search engine to Google, DuckDuckGo, or Brave. You can also set what type of text you want to see every time you open the page.</p>
                  </details>
              </li>
              <li>
                  <details>
                      <summary>Create a bookmark <button onClick={() => {highlightFeature(bookmarkRef.current, "blur"); clickFeature(bookmarkRef.current); removeHighlight(bookmarkRef.current, 4000);}}>Show me!</button></summary>
                      <p>You can enter as many bookmarks as you want so that you can have easy access to all of your websites. You can also delete and edit them.</p>
                      <p>** More will be planned for this feature in the future!</p>
                  </details>
              </li>
              <li>
                  <details>
                      <summary>Create a list <button onClick={() => {highlightFeature(listRef.current, "blur"); clickFeature(listRef.current); removeHighlight(listRef.current, 4000);}}>Show me!</button></summary>
                      <p>You can create up to five lists, and add as many todos as you want. You can also add links to each todo if you want, but that is not required. </p>
                      <p>** More will be planned for this feature in the future!</p>
                  </details>
              </li>
              <li>
                  <details>
                      <summary>Add a sticky! <button onClick={() => {highlightFeature(moreRef.current, "blur"); hoverFeature(optionsRef.current); removeHighlight(optionsRef.current, 4000); removeHighlight(moreRef.current, 4000);}}>Show me!</button></summary>
                      <p>You can either add polaroids or notes to your homebase, allowing you the ability to personalize to your heart&apos;s content. If you happen to lose a sticky and you can&apos;t click on it, that&apos;s what the reset button is for!</p>
                      <p>** If you are a beta tester, please test polaroids.. I am wondering if I need to set a limit.</p>
                  </details>
              </li>
            </ul>

            <p>This page is intended to be your browser home screen, meaning that every time you click on your browser, this will be the first page that appears. If you need it, here are some guides on how to change your browser startup page:</p>
            <ul>
              <li><a href="https://support.mozilla.org/en-US/kb/how-to-set-the-home-page" target="_blank">Firefox</a></li>
              <li><a href="https://support.google.com/chrome/answer/95314?hl=en&co=GENIE.Platform%3DDesktop" target="_blank">Chrome</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/change-your-browser-home-page-a531e1b8-ed54-d057-0262-cc5983a065c6" target="_blank">Edge</a></li>
            </ul>

            <p>Using the magic of local storage in the browser, this page will remember all changes, deletions, and additions made every session. As the warning indicates, it is possible that you can lose all the progress you&apos;ve made building this out if you clear all your cache. If you want to preserve your data here, I recommend managing your cache instead of clearing it entirely.</p>
          
            <p>I just built this app recently, but I do intend on updating it with some new features in the future. If you have any suggestions, I would love to hear them!</p>
            
        </div>
      </footer>
    </div>
    </>
  )
}
