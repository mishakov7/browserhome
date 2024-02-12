"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from '../creator';

import affirmations from  './affirmations';
import random from './random';
import inspirational from './inspirational';

export default function Search(props: any) {

  const google = 'https://www.google.com/search?q=';
  const duckduckgo = 'https://www.duckduckgo.com/?q=';
  const brave = 'https://search.brave.com/search?q=';

  const [showCreator, setCreator] = useState(false);
  const [searchTheme, setSearchTheme] = useState(affirmations);
  const [searchEngine, setSearchEngine] = useState(google);
  const [quoteSearch, setQuoteSearch] = useState(affirmations[0].search);
  const [search, setSearch] = useState("");

  const engineRef = useRef(null);
  const themeRef = useRef(null);
  const googleInput = useRef(null);
  const duckInput = useRef(null);
  const braveInput = useRef(null);
  const randomInput = useRef(null);
  const inspirationalInput = useRef(null);
  const affirmationsInput = useRef(null);

  const creatorInputs = [{
    "ref": engineRef,
    "type": "dropdown",
    "label": "Search Engines",
    "name": "search-engines",
    "options": [
      {
        "ref": googleInput,
        "value": "google",
        "selected": searchEngine == google ? true : false
      },
      {
        "ref": duckInput,
        "value": "duckduckgo",
        "selected": searchEngine == duckduckgo ? true : false
      },
      {
        "ref": braveInput,
        "value": "brave",
        "selected": searchEngine == brave ? true : false

      }
    ]
  }, {
    "ref": themeRef,
    "type": "dropdown",
    "label": "Search Theme",
    "name": "search-theme",
    "options": [
      {
        "ref": randomInput,
        "value": "random",
        "selected": searchTheme == random ? true : false

      }, 
      {
        "ref": inspirationalInput,
        "value": "inspirational",
        "selected": searchTheme == inspirational ? true : false

      },
      {
        "ref": affirmationsInput,
        "value": "affirmations",
        "selected": searchTheme == affirmations ? true : false

      }
    ]
  }];

  function randomIdx(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const changeSearch = (e:any) => {
    let engineInputs = [googleInput, duckInput, braveInput];
    let selectedEngine = null;

    let themeInputs = [randomInput, affirmationsInput, inspirationalInput];
    let selectedTheme = null;

    engineInputs.forEach(input => {
      if (input.current.checked) {
        selectedEngine = input.current.value;
      }
    });


    themeInputs.forEach(input => {
      if (input.current.checked) {
        selectedTheme = input.current.value;
      }
    });

      
    let newSearch = {
      "engine": selectedEngine,
      "theme": selectedTheme
    }

    localStorage.setItem('search', JSON.stringify(newSearch));
    assignSearchState(newSearch.engine, newSearch.theme);
    toggleCreator();

  }

  const assignSearchState = (engine:string, theme:string) => {
    switch (engine) {
      case "google":
        setSearchEngine(google);
        break;

      case "brave":
        setSearchEngine(brave);
        break;

      case "duckduckgo":
        setSearchEngine(duckduckgo);
        break;
    }

    switch (theme) {
      case "random":
        setSearchTheme(random);
        break;

      case "inspirational":
        setSearchTheme(inspirational);
        break;

      case "affirmations":
        setSearchTheme(affirmations);
        break;
    }

    setQuoteSearch(searchTheme[randomIdx(0, searchTheme.length - 1)].search);


  }

  useEffect(() => {
    const localSearch = JSON.parse(localStorage.getItem('search'));

    if (localSearch) {
      assignSearchState(localSearch.engine, localSearch.theme);

    } else {

      let defaultSearch = {
        "engine": searchEngine,
        "theme": searchTheme
      }

      localStorage.setItem('search', JSON.stringify(defaultSearch));

    }

    setQuoteSearch(searchTheme[randomIdx(0, 20)].search);


  }, [quoteSearch]);

  return (
    <>
    <div className='search-container'>
        <p className="search-query">{quoteSearch}</p>
        <div className="inputGroup">
          
          <button ref={props.summonRef} onClick={toggleCreator} className={'se-icon se-icon-' + searchEngine.split(".")[1]}>
          </button> 
          
          <input type="text" onChange={e => setSearch(e.target.value)}/>
          <a target="_blank" href={searchEngine + search}>
            <svg width="25" height="25" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.9747 26.9686L24.0723 21.0662C23.8059 20.7998 23.4448 20.6518 23.0659 20.6518H22.1009C23.7349 18.562 24.7058 15.9335 24.7058 13.0741C24.7058 6.27187 19.1942 0.760254 12.3919 0.760254C5.58975 0.760254 0.078125 6.27187 0.078125 13.0741C0.078125 19.8763 5.58975 25.3879 12.3919 25.3879C15.2514 25.3879 17.8799 24.417 19.9697 22.7831V23.748C19.9697 24.1269 20.1177 24.488 20.3841 24.7545L26.2864 30.6568C26.8429 31.2133 27.7428 31.2133 28.2934 30.6568L29.9687 28.9814C30.5252 28.4249 30.5252 27.5251 29.9747 26.9686ZM12.3919 20.6518C8.20643 20.6518 4.81421 17.2655 4.81421 13.0741C4.81421 8.88856 8.20051 5.49634 12.3919 5.49634C16.5775 5.49634 19.9697 8.88264 19.9697 13.0741C19.9697 17.2596 16.5834 20.6518 12.3919 20.6518Z" fill="#8D6CD2"/>
            </svg>
          </a>
        </div>

        <div className='creator-wrapper'>
          {
              showCreator ?
              <Creator 
                toggleCreatorState={toggleCreator}
                handleCreator={(e: any) => { changeSearch(e); } } 
                inputGroups={creatorInputs}
                bg="accent2"
                direction="above"
              /> 
              : null
          }
                  
        </div>
    </div>
    </>
  )
}