"use client";
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import Bookmark from './bookmark';
import Creator from '../creator';

export default function Bookmarks(props: any) {

  const [bookmarkList, setBookmarkList] = useState([]);
  const [showCreator, setCreator] = useState(false);
  const [listScroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [increment, setIncrement] = useState(0);

  const bookmarksRef = useRef();
  const imageRef = useRef();
  const linkRef = useRef();

  const creatorInputs = [{
    "ref": imageRef,
    "type": "text",
    "label": "Image",
    "name": "bookmark-image",
    "placeholder": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
  }, {
    "ref": linkRef,
    "type": "text",
    "label": "Link",
    "name": "bookmark-link",
    "placeholder": "mishalukova.com"
  }];

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const checkBookmark = (e: any) => {
    let imageLink = "";
    let link = "";

    if (imageRef.current.value.startsWith("https://") || imageRef.current.value.startsWith("http://")) {
      imageLink = imageRef.current.value;
    } else {
      imageLink = "https://" + imageRef.current.value;
    }

    if (linkRef.current.value.startsWith("https://") || linkRef.current.value.startsWith("http://")) {
      link = linkRef.current.value;
    } else {
      link = "https://" + linkRef.current.value;

    }

    let https = require("https");
    https.get(imageRef.current.value, response => {
      
      if (response.statusCode === 200) {
        createBookmark(imageLink, link);

      } else {
        imageRef.current.classList.add("highlight");
        setTimeout(() => {
          imageRef.current.classList.remove("highlight");
        }, 2000);
      }

    }).on('error', (e) => {
        imageRef.current.classList.add("highlight");
        setTimeout(() => {
          imageRef.current.classList.remove("highlight");
        }, 2000);
    });
  }

  const createBookmark = (image: string, link: string) => {

    let storageBookmark = {
      "image": image,
      "link": link
    }

    let storageBookmarks = bookmarkList.slice();
    storageBookmarks.unshift(storageBookmark);

    setBookmarkList(storageBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));  
    toggleCreator();
  }

  const deleteBookmark = (key: number) => {
    let storageBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    storageBookmarks.splice(key, 1);

    setBookmarkList(storageBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));

  }

  const editBookmark = (e:any, key: number, refs: any) => {
    let storageBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarkLink = refs[1].current.value;
    
    if (!bookmarkLink.startsWith("http://") || !bookmarkLink.startsWith("https://")) {
      bookmarkLink = "https://" + bookmarkLink;
    }

    let editedBookmark = {
      "image": refs[0].current.value,
      "link": bookmarkLink
    }

    storageBookmarks[key] = editedBookmark;
    setBookmarkList(storageBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));
    // currentEdit.current.classList.remove("editing-button");
  }
  
  const setDefaults = (e: any) => {
    if (imageRef.current.value == "" || imageRef.current.value == null) {
      imageRef.current.value = imageRef.current.placeholder;
    }

    if (linkRef.current.value == "" || linkRef.current.value == null) {
      linkRef.current.value = linkRef.current.placeholder;
    
    } 

  }

  useEffect(() => {

    const localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if (localBookmarks) {
      setBookmarkList(localBookmarks);
    }

    bookmarksRef.current.scrollTo({left: (listScroll), behavior: "smooth"});

  }, [listScroll]);

  useLayoutEffect(() => {
    if (bookmarksRef.current) {
      setMaxScroll(bookmarksRef.current.scrollLeftMax);
      setIncrement(bookmarksRef.current.clientWidth / 2);
    }
    
  });

  return (
    <>
    <div className='bookmarks-container'>

        <div className='creator-wrapper'>
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
              
            <button ref={props.summonRef} className='create-button' onClick={toggleCreator}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.2143 9.82143H15.1786V1.78571C15.1786 0.799665 14.3789 0 13.3929 0H11.6071C10.6211 0 9.82143 0.799665 9.82143 1.78571V9.82143H1.78571C0.799665 9.82143 0 10.6211 0 11.6071V13.3929C0 14.3789 0.799665 15.1786 1.78571 15.1786H9.82143V23.2143C9.82143 24.2003 10.6211 25 11.6071 25H13.3929C14.3789 25 15.1786 24.2003 15.1786 23.2143V15.1786H23.2143C24.2003 15.1786 25 14.3789 25 13.3929V11.6071C25 10.6211 24.2003 9.82143 23.2143 9.82143Z" fill="#CDC7AF"/>
                </svg>
            </button>
        </div>

        <ul ref={bookmarksRef} className='bookmarks-list'>
            {
              bookmarkList.length > 0 ? 
              bookmarkList.map((bookmark, idx) => (
                  <li className='bookmark' key={idx}>
                    <Bookmark 
                      bookmarkKey={idx}
                      parentElmt={bookmarksRef}
                      link={bookmark.link}
                      image={bookmark.image}
                      handleDelete={() => deleteBookmark(idx)}
                      handleEdit={editBookmark}
                    />
                  </li>
              )) 
              
              : null
            }
        </ul>

        <div className='arrows-container'>

            {
              listScroll <= 0 ? null :
              <button onClick={() => setScroll(bookmarksRef.current.scrollLeft + (-1 * increment))} className='prev-button accent2-fill'>
                  <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.688817 11.4128C-0.229606 10.303 -0.229606 8.69711 0.688817 7.58735L5.79471 1.41773C7.58689 -0.747822 11.1059 0.519469 11.1059 3.33044L11.1059 15.6697C11.1059 18.4806 7.58689 19.7479 5.79471 17.5824L0.688817 11.4128Z" />
                  </svg>
              </button>
            }

            {
              (listScroll >= maxScroll) || (!maxScroll) ? null :
              <button onClick={() => setScroll(bookmarksRef.current.scrollLeft + increment)} className='next-button accent2-fill'>
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