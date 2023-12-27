"use client";
import React, { useState, useEffect, useRef } from 'react';
import Bookmark from './bookmark';
import Creator from './creator';

export default function Bookmarks() {

  const [bookmarkList, setBookmarkList] = useState([]);
  const [showCreator, setCreator] = useState(false);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);

  const creatorInputs = [{
    "ref": input1Ref,
    "type": "text",
    "label": "Image",
    "name": "bookmark-image"
  }, {
    "ref": input2Ref,
    "type": "text",
    "label": "Link",
    "name": "bookmark-link"
  }];

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const createBookmark = (e: any) => {
    let key = 0;

    if (JSON.parse(localStorage.getItem('bookmarks'))) {
      key = JSON.parse(localStorage.getItem('bookmarks')).length;
    }

    let storageBookmark = {
      "key": key,
      "image": input1Ref.current.value,
      "link": input2Ref.current.value
    }

    let storageBookmarks = bookmarkList.slice();
    storageBookmarks.push(storageBookmark);

    // setBookmarkList(bookmarkList, storageBookmark);
    setBookmarkList(storageBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));  
    toggleCreator();
  }

  const deleteBookmark = (e:any, key: number) => {
    let storageBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    storageBookmarks.splice(key, 1);

    setBookmarkList(storageBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));

  }

  const editBookmark = (e:any, key: number, refs: any) => {
    let storageBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    let editedBookmark = {
      "key": key,
      "image": refs[0].current.value,
      "link": refs[1].current.value
    }

    storageBookmarks[key] = editedBookmark;
    setBookmarkList(storageBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(storageBookmarks));
    // currentEdit.current.classList.remove("editing-button");
  }
  

  useEffect(() => {
    const localBookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if (localBookmarks) {
      setBookmarkList(localBookmarks);
    }

  }, []);

  return (
    <>
    <div className='bookmarks-container'>
        <ul className='bookmarks-list'>
            {
              bookmarkList.length < 1 ? "Add a bookmark!" : bookmarkList.map(bookmark => (
                  <li className='bookmark' key={bookmark.key}>
                    <Bookmark 
                      bookmarkKey={bookmark.key}
                      link={bookmark.link}
                      image={bookmark.image}
                      handleDelete={(e: any) => deleteBookmark(bookmark.key)}
                      handleEdit={editBookmark}
                    />
                  </li>
              ))
            }
        </ul>
        
        <div className='creator-wrapper'>
            {
                showCreator ?
                <Creator 
                  toggleCreatorState={toggleCreator}
                  handleCreator={(e: any) => { createBookmark(e); } } 
                  inputGroups={creatorInputs}
                  bg="accent2"
                  direction="below"
                /> 
                : null
            }
              
            <button className='create-button' onClick={toggleCreator}>
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.2143 9.82143H15.1786V1.78571C15.1786 0.799665 14.3789 0 13.3929 0H11.6071C10.6211 0 9.82143 0.799665 9.82143 1.78571V9.82143H1.78571C0.799665 9.82143 0 10.6211 0 11.6071V13.3929C0 14.3789 0.799665 15.1786 1.78571 15.1786H9.82143V23.2143C9.82143 24.2003 10.6211 25 11.6071 25H13.3929C14.3789 25 15.1786 24.2003 15.1786 23.2143V15.1786H23.2143C24.2003 15.1786 25 14.3789 25 13.3929V11.6071C25 10.6211 24.2003 9.82143 23.2143 9.82143Z" fill="#CDC7AF"/>
                </svg>
            </button>
        </div>
    </div>
    </>
  )
}