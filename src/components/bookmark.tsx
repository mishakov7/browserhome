"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from './creator';

const Bookmark = (props: any) => {
  const [showCreator, setCreator] = useState(false);
  const creatorRef = useRef(null);
  const edit1Ref = useRef(null);
  const edit2Ref = useRef(null);

  const editorInputs = [{
    "ref": edit1Ref,
    "label": "Image",
    "name": "bookmark-image"
  }, {
    "ref": edit2Ref,
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

  const handleOutsideClick = (e: any) => {
    console.log("creatorref? " + creatorRef.current);
    console.log("showcreator? " + showCreator);
    console.log("contains? " + creatorRef.current.contains(e.target));

    if (creatorRef.current && showCreator && !creatorRef.current.contains(e.target)) {
      setCreator(false);
    }
  }

  useEffect(() => {
    // console.log(showCreator);

    document.addEventListener("click", handleOutsideClick, false);

    return() => {
      document.removeEventListener("click", handleOutsideClick, false);
    }

  }, [showCreator]);

  return (
    <>
      <div ref={creatorRef} className='creator-wrapper'>
          <Creator 
              creatorState={showCreator}
              handleCreator={(e: any) => { props.handleEdit(e, props.bookmarkKey, [edit1Ref, edit2Ref]); toggleCreator(); }} 
              inputGroups={editorInputs}
              bg="accent2"
              direction="below"
          />
      </div>

      <button ref={props.editButton} onClick={(e: any) => { props.editButton.current.classList.add("editing-button"); toggleCreator(); }} className='edit-button'>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.88837 2.83838L11.1615 6.11168L4.05401 13.2195L1.13573 13.5417C0.745059 13.5849 0.414982 13.2545 0.458447 12.8638L0.783154 9.94339L7.88837 2.83838ZM13.186 2.35105L11.6491 0.814118C11.1697 0.334707 10.3922 0.334707 9.9128 0.814118L8.46696 2.26002L11.7401 5.53331L13.186 4.08741C13.6653 3.60774 13.6653 2.83046 13.186 2.35105Z"/>
          </svg>
      </button>

      <a href={props.link} target="_blank">
        <img src={props.image} width="40"/>
      </a>

      <button onClick={props.handleDelete} className='remove-button'>
          <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4643 1.12501H10.4464L10.1317 0.467584C10.065 0.327034 9.96233 0.208807 9.83515 0.126202C9.70798 0.0435979 9.56137 -0.000106452 9.41183 6.16385e-06H5.58482C5.43562 -0.000596081 5.28927 0.0429453 5.16255 0.125642C5.03582 0.208338 4.93385 0.326845 4.8683 0.467584L4.55357 1.12501H0.535714C0.393634 1.12501 0.257373 1.18427 0.156907 1.28976C0.0564412 1.39525 0 1.53832 0 1.68751L0 2.81251C0 2.96169 0.0564412 3.10476 0.156907 3.21025C0.257373 3.31574 0.393634 3.37501 0.535714 3.37501H14.4643C14.6064 3.37501 14.7426 3.31574 14.8431 3.21025C14.9436 3.10476 15 2.96169 15 2.81251V1.68751C15 1.53832 14.9436 1.39525 14.8431 1.28976C14.7426 1.18427 14.6064 1.12501 14.4643 1.12501ZM1.78125 17.918C1.8068 18.3464 1.98688 18.7485 2.28484 19.0424C2.5828 19.3363 2.97623 19.4999 3.38504 19.5H11.615C12.0238 19.4999 12.4172 19.3363 12.7152 19.0424C13.0131 18.7485 13.1932 18.3464 13.2188 17.918L13.9286 6H1.07143L1.78125 17.918Z" />
          </svg>
      </button>
    </>
  )
}

export default Bookmark;