"use client";
import React, { useState, useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import Bookmark from './bookmark';
import Creator from '../creator';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import { init } from 'next/dist/compiled/webpack/webpack';

export default function Bookmarks(props: any) {

  const [bookmarkList, setBookmarkList] = useState([]);
  const [showCreator, setCreator] = useState(false);
  const [listScroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [letterkey, setletterKey] = useState('a');
  const [moveLeftIdx, setMoveLeft] : any | number = useState(null);
  const [moveRightIdx, setMoveRight] : any | number = useState(null);

  const bookmarksRef = useRef<HTMLUListElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const creatorInputs = [{
    "ref": linkRef,
    "type": "text",
    "label": "Link",
    "name": "bookmark-link",
    "placeholder": "mishalukova.com"
  }];

  function generateKey(idx:number) {
    return "bookmark-" + letterkey + idx;
  }

  function randLetter() {
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var letter = letters[Math.floor(Math.random() * letters.length)];
    return letter;
  }

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const checkBookmark = (e: any) => {
    let link = "";

    if (linkRef.current) {
      if (linkRef.current.value.startsWith("https://") || linkRef.current.value.startsWith("http://")) {
        link = linkRef.current.value;
      } else {
        link = "https://" + linkRef.current.value;
      }
    }


    let imageLink = "https://api.faviconkit.com/" + link.split("//")[1] + "/144";
    createBookmark(imageLink, link);

  }

  const createBookmark = (image: string, link: string) => {

    let storageBookmark : any = {
      "image": image,
      "link": link
    }

    let storageBookmarks : any = bookmarkList.slice();
    storageBookmarks.unshift(storageBookmark);

    setBookmarkList(storageBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));  
    toggleCreator();

    props.setTutorial(1);
  }

  const deleteBookmark = (key: number) => {
    let storageBookmarks = bookmarkList.slice();
    storageBookmarks.splice(key, 1);
    
    if (typeof window !== undefined) {
      localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));
    }

    setBookmarkList(storageBookmarks);
    // props.setTutorial(3);
  }

  const editBookmark = (e:any, key: number, refs: any) => {
    let storageBookmarks : any = bookmarkList.slice();
    let bookmarkLink = refs.current.value;

    if (!bookmarkLink.startsWith("http://") && !bookmarkLink.startsWith("https://")) {
      bookmarkLink = "https://" + bookmarkLink;
    }

    let editedBookmark = {
      "image": "https://api.faviconkit.com/" + bookmarkLink.split("//")[1] + "/144",
      "link": bookmarkLink
    }

    storageBookmarks[key] = editedBookmark;

    if (typeof window !== undefined) {
      localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));
    }

    setBookmarkList(storageBookmarks);
    props.setTutorial(2);
  }

  const moveBookmark = (initial: number, target: number) => {
    let storageBookmarks : any = bookmarkList.slice();
    let bookmarkValue = storageBookmarks[initial];

    if (initial > target) {
        setMoveLeft(target);
        setMoveRight(null);

    }

    if (initial < target) {
        setMoveRight(target);
        setMoveLeft(null);

    }

    storageBookmarks.splice(initial, 1)
    storageBookmarks.splice(target, 0, bookmarkValue)

    if (typeof window !== undefined) {
      localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));
    }

    setBookmarkList(storageBookmarks);

  }
  
  const setDefaults = (e: any) => {
    if (linkRef.current) {
      if (linkRef.current.value == "" || linkRef.current.value == null) {
        linkRef.current.value = linkRef.current.placeholder;
      }   
    }

  }

  useEffect(() => {
    const localBookmarks = JSON.parse(String(localStorage.getItem('bookmarks')));

    if (localBookmarks) {
      setBookmarkList(localBookmarks);
    }

    if (bookmarksRef.current && !scrolling) {
      bookmarksRef.current.scrollTo({left: (listScroll), behavior: "smooth"});
    }

  }, [listScroll]);

  useLayoutEffect(() => {

    window.addEventListener("resize", function() {
      if (bookmarksRef.current) {
        setMaxScroll(bookmarksRef.current.scrollWidth - bookmarksRef.current.offsetWidth);
        setIncrement(bookmarksRef.current.clientWidth);
      }
    })

    if (bookmarksRef.current) {
      setMaxScroll(bookmarksRef.current.scrollWidth - bookmarksRef.current.offsetWidth);
      setIncrement(bookmarksRef.current.clientWidth);

      bookmarksRef.current.addEventListener("scroll", function() {
        if (bookmarksRef.current) { setScroll(bookmarksRef.current.scrollLeft); }
        setScrolling(true);
      })
    }
    
    return () => {
      window.removeEventListener("resize", function() {
        if (bookmarksRef.current) {
          setMaxScroll(bookmarksRef.current.scrollWidth - bookmarksRef.current.offsetWidth);
          setIncrement(bookmarksRef.current.scrollWidth / 3);
        }
      })

      if (bookmarksRef.current) {
        setScrolling(false);

        bookmarksRef.current.removeEventListener("scroll", function() {
          if (bookmarksRef.current) { setScroll(bookmarksRef.current.scrollLeft); }
          setScrolling(true);
        })
      }
    }
  }, [scrolling]);

  return (
    <>
    <div ref={props.parentRef} className='bookmarks-container'>

        <div className='creator-wrapper'>
            <button ref={props.summonRef} className='create-button' onClick={toggleCreator}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.2143 9.82143H15.1786V1.78571C15.1786 0.799665 14.3789 0 13.3929 0H11.6071C10.6211 0 9.82143 0.799665 9.82143 1.78571V9.82143H1.78571C0.799665 9.82143 0 10.6211 0 11.6071V13.3929C0 14.3789 0.799665 15.1786 1.78571 15.1786H9.82143V23.2143C9.82143 24.2003 10.6211 25 11.6071 25H13.3929C14.3789 25 15.1786 24.2003 15.1786 23.2143V15.1786H23.2143C24.2003 15.1786 25 14.3789 25 13.3929V11.6071C25 10.6211 24.2003 9.82143 23.2143 9.82143Z" />
                </svg>
            </button>
            {
                showCreator ?
                <Creator 
                  toggleCreatorState={toggleCreator}
                  handleCreator={(e: any) => { setDefaults(e); checkBookmark(e); } } 
                  inputGroups={creatorInputs}
                  bg="accent2"
                  direction="below"
                /> 
                : null
            }
        </div>

				<DndProvider backend={HTML5Backend}>
        <ul ref={bookmarksRef} className='bookmarks-list'>
            {
              bookmarkList.length > 0 ? 
              bookmarkList.map((bookmark: any, idx: number) => (
                  <Bookmark 
                    key={generateKey(idx)}
                    bookmaryKey={generateKey(idx)}
                    bookmarkIdx={idx}
                    parentElmt={bookmarksRef}
                    link={bookmark.link}
                    image={bookmark.image}
                    isMovingLeft={moveLeftIdx == idx ? true : false}
                    isMovingRight={moveRightIdx == idx ? true : false}
                    setMovingLeft={setMoveLeft}
                    setMovingRight={setMoveRight}
                    handleDelete={() => deleteBookmark(idx)}
                    handleEdit={editBookmark}
                    handleMove={moveBookmark}

                    step={props.step}
                    handleStep={props.setTutorial}
                  />
              )) 
              
              : null
            }
        </ul>
        </DndProvider>

        <div className='arrows-container'>

            {
              listScroll <= 0 ? null :
              <button onClick={() => { if (bookmarksRef.current) { setScroll(bookmarksRef.current.scrollLeft + (-1 * increment)) }}} className='prev-button accent2-fill'>
                  <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.688817 11.4128C-0.229606 10.303 -0.229606 8.69711 0.688817 7.58735L5.79471 1.41773C7.58689 -0.747822 11.1059 0.519469 11.1059 3.33044L11.1059 15.6697C11.1059 18.4806 7.58689 19.7479 5.79471 17.5824L0.688817 11.4128Z" />
                  </svg>
              </button>
            }

            {
              (listScroll >= maxScroll) || (!maxScroll) ? null :
              <button onClick={() => { if (bookmarksRef.current) { setScroll(bookmarksRef.current.scrollLeft + increment) }}} className='next-button accent2-fill'>
                  <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4171 7.58735C11.3355 8.69711 11.3355 10.303 10.4171 11.4128L5.31118 17.5824C3.519 19.7479 -1.22871e-07 18.4806 0 15.6697L5.39365e-07 3.33044C6.62236e-07 0.519467 3.519 -0.747821 5.31118 1.41773L10.4171 7.58735Z" />
                  </svg>
              </button>
            }

        </div>
        
        
    </div>
    </>
  )
}