"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from '../creator';

const Bookmark = (props: any) => {
  const [showCreator, setCreator] = useState(false);
  const edit1Ref = useRef(null);
  const edit2Ref = useRef(null);
  const editButton = useRef(null);

  let storageBookmark = JSON.parse(localStorage.getItem("bookmarks"))[props.bookmarkKey];

  const editorInputs = [{
    "ref": edit1Ref,
    "type": "text",
    "label": "Image",
    "name": "bookmark-image",
    "value": storageBookmark.image
  }, {
    "ref": edit2Ref,
    "type": "text",
    "label": "Link",
    "name": "bookmark-link",
    "value": storageBookmark.link
  }];

  const toggleCreator = () => {

    if (showCreator) {
      setCreator(false);
      editButton.current.classList.remove("editing-button");

    } else {
      setCreator(true);
      editButton.current.classList.add("editing-button");
    }

  }

  useEffect(() => {
    if (showCreator) {
      props.parentElmt.current.classList.add("bookmarks-list-creator");

    } else {
      props.parentElmt.current.classList.remove("bookmarks-list-creator");
    }

  }, [])

  return (
    <>
      <div className='creator-wrapper'>
        {
          showCreator ?
          <Creator 
              toggleCreatorState={toggleCreator}
              handleCreator={(e: any) => { props.handleEdit(e, props.bookmarkKey, [edit1Ref, edit2Ref]); toggleCreator(); }} 
              inputGroups={editorInputs}
              bg="accent2"
              direction="below"
          />
          : null
        }
      </div>

      <button ref={editButton} onClick={(e: any) => { toggleCreator(); }} className='edit-button'>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.88837 2.83838L11.1615 6.11168L4.05401 13.2195L1.13573 13.5417C0.745059 13.5849 0.414982 13.2545 0.458447 12.8638L0.783154 9.94339L7.88837 2.83838ZM13.186 2.35105L11.6491 0.814118C11.1697 0.334707 10.3922 0.334707 9.9128 0.814118L8.46696 2.26002L11.7401 5.53331L13.186 4.08741C13.6653 3.60774 13.6653 2.83046 13.186 2.35105Z"/>
          </svg>
      </button>

      <a href={props.link} target="_blank">
        <img src={props.image} width="40"/>
      </a>

      <button onClick={props.handleDelete} className='remove-button'>

          <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.78135 17.918C1.80691 18.3464 1.98699 18.7485 2.28495 19.0424C2.5829 19.3363 2.97633 19.4999 3.38515 19.5H11.6151C12.0239 19.4999 12.4173 19.3363 12.7153 19.0424C13.0132 18.7485 13.1933 18.3464 13.2189 17.918L13.9287 6H1.07153L1.78135 17.918Z" />
              <path d="M10.4464 1.12501H14.4643C14.6064 1.12501 14.7426 1.18427 14.8431 1.28976C14.9436 1.39525 15 1.53832 15 1.68751V2.81251C15 2.96169 14.9436 3.10476 14.8431 3.21025C14.7426 3.31574 14.6064 3.37501 14.4643 3.37501H0.535714C0.393634 3.37501 0.257373 3.31574 0.156907 3.21025C0.0564412 3.10476 0 2.96169 0 2.81251V1.68751C0 1.53832 0.0564412 1.39525 0.156907 1.28976C0.257373 1.18427 0.393634 1.12501 0.535714 1.12501H4.55357L4.8683 0.467584C4.93385 0.326845 5.03582 0.208338 5.16255 0.125642C5.28927 0.0429453 5.43562 -0.000596081 5.58482 6.16384e-06H9.41183C9.56137 -0.000106452 9.70798 0.043598 9.83515 0.126203C9.96233 0.208807 10.065 0.327034 10.1317 0.467584L10.4464 1.12501Z" />
          </svg>
      </button>
    </>
  )
}

export default Bookmark;