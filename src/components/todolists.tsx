"use client";
import React, { useState, useEffect, useRef } from 'react';
import Creator from './creator';
import List from './list';
import EditList from './editlist';

export default function ToDoLists() {

  const [lists, setLists] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [showCreator, setCreator] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [selectedList, setSelectedList] = useState(0);

  const titleInput = useRef(null);
  const colorInput1 = useRef(null);
  const colorInput2 = useRef(null);
  const colorInput3 = useRef(null);
  const colorInputs = [colorInput1, colorInput2, colorInput3];

  // const currentDate = new Date();

  const creatorInputs = [{
    "ref": titleInput,
    "type": "text",
    "label": "Name of List",
    "name": "list-name"
  }, {
    "type": "radio",
    "label": "Color Accent",
    "name": "list-color",
    "radios": [
      {
        "ref": colorInput1,
        "value": "accent1"
      }, {
        "ref": colorInput2,
        "value": "accent2"
      }, {
        "ref": colorInput3,
        "value": "accent3"
      }
    ]
  }];

  const alertInputs = [{
    "type": "alert"
  }];

  const toggleSelectedList = (e: any, key: number) => {
    if (e.target.classList.contains('selected-list')) {
      setSelectedList(key);
    
    } else {
      setSelectedList(key);
    }
  }

  const toggleCreator = () => {
    if (showCreator) {
      setCreator(false);

    } else {
      setCreator(true);
    }
  }

  const toggleAlert = () => {
    if (showAlert) {
      setAlert(false);

    } else {
      setAlert(true);
    }
  }

  const toggleEditing = (e: any, key: number) => {
    if (!isEditing && selectedList == key) {
      setEditing(true);
    
    } 

    if (isEditing && selectedList == key) {
      setEditing(false);
    }

  }

  const createList = (e: any) => {

    let selectedColor = null;
    colorInputs.forEach(input => {
      if (input.current.checked) {
        selectedColor = input.current.value;
      }
    });

    let storageList = {
      "color": selectedColor,
      "title": titleInput.current.value,
      "todoList": []
    }

    let storageLists = lists.slice();
    storageLists.push(storageList);

    setLists(storageLists);
    localStorage.setItem('lists', JSON.stringify(storageLists));
    toggleCreator();
  }

  const deleteList = (e: any, key: number) => {

    let storageLists = JSON.parse(localStorage.getItem('lists'));
    storageLists.splice(key, 1);

    setLists(storageLists);
    localStorage.setItem('lists', JSON.stringify(storageLists));

    toggleAlert();
  }

  useEffect(() => {
    const localLists = JSON.parse(localStorage.getItem('lists'));
  
    if (localLists) {
      setLists(localLists);
    }

  }, []);

  return (
    <>
    <div className='todolists-container'>
          {
            lists.length < 1 ? null :
            lists.map((list, idx) => (
              <div onClick={(e: any) => toggleSelectedList(e, idx)} key={idx} className={'list-container ' + (isEditing && selectedList == idx ? ' editing-list ' + list.color + '-border-dance' : ' ' + list.color + '-border-hover ' ) + (selectedList == idx ? ' selected-list ' : '')}>
 
                {
                  isEditing && selectedList == idx
                  
                  ?

                  <EditList
                    listTitle={list.title}
                    listKey={idx}
                    listColor={list.color}
                  />

                  : 

                  <List 
                    listTitle={list.title}
                    listKey={idx}
                    listColor={list.color}
                  />
                }

                <div className='buttons-container'>
                    <button onClick={(e: any) => { toggleEditing(e, idx) }} className={'edit-button ' + list.color + "-fill"}>
                        {
                            isEditing && selectedList == idx ?

                            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6529 3.97447L11.0316 1.35316C10.7503 1.07186 10.3688 0.91382 9.97097 0.913818H1.59229C0.763848 0.913818 0.0922852 1.58538 0.0922852 2.41382V13.4138C0.0922852 14.2423 0.763848 14.9138 1.59229 14.9138H12.5923C13.4207 14.9138 14.0923 14.2423 14.0923 13.4138V5.03513C14.0923 4.63731 13.9342 4.25578 13.6529 3.97447ZM7.09229 12.9138C5.98772 12.9138 5.09229 12.0184 5.09229 10.9138C5.09229 9.80926 5.98772 8.91382 7.09229 8.91382C8.19685 8.91382 9.09229 9.80926 9.09229 10.9138C9.09229 12.0184 8.19685 12.9138 7.09229 12.9138ZM10.0923 3.39757V6.53882C10.0923 6.74591 9.92438 6.91382 9.71729 6.91382H2.46729C2.26019 6.91382 2.09229 6.74591 2.09229 6.53882V3.28882C2.09229 3.08172 2.26019 2.91382 2.46729 2.91382H9.60853C9.708 2.91382 9.80338 2.95332 9.87369 3.02366L9.98244 3.13241C10.0173 3.16723 10.0449 3.20857 10.0637 3.25406C10.0826 3.29956 10.0923 3.34832 10.0923 3.39757Z" fill="white"/>
                            </svg>

                            :

                            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.88837 2.83838L11.1615 6.11168L4.05401 13.2195L1.13573 13.5417C0.745059 13.5849 0.414982 13.2545 0.458447 12.8638L0.783154 9.94339L7.88837 2.83838ZM13.186 2.35105L11.6491 0.814118C11.1697 0.334707 10.3922 0.334707 9.9128 0.814118L8.46696 2.26002L11.7401 5.53331L13.186 4.08741C13.6653 3.60774 13.6653 2.83046 13.186 2.35105Z"/>
                            </svg>

                        }
                    </button>

                    <button onClick={toggleAlert} className={'remove-button ' + list.color + "-fill"}>

                        <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.78135 17.918C1.80691 18.3464 1.98699 18.7485 2.28495 19.0424C2.5829 19.3363 2.97633 19.4999 3.38515 19.5H11.6151C12.0239 19.4999 12.4173 19.3363 12.7153 19.0424C13.0132 18.7485 13.1933 18.3464 13.2189 17.918L13.9287 6H1.07153L1.78135 17.918Z" />
                            <path d="M10.4464 1.12501H14.4643C14.6064 1.12501 14.7426 1.18427 14.8431 1.28976C14.9436 1.39525 15 1.53832 15 1.68751V2.81251C15 2.96169 14.9436 3.10476 14.8431 3.21025C14.7426 3.31574 14.6064 3.37501 14.4643 3.37501H0.535714C0.393634 3.37501 0.257373 3.31574 0.156907 3.21025C0.0564412 3.10476 0 2.96169 0 2.81251V1.68751C0 1.53832 0.0564412 1.39525 0.156907 1.28976C0.257373 1.18427 0.393634 1.12501 0.535714 1.12501H4.55357L4.8683 0.467584C4.93385 0.326845 5.03582 0.208338 5.16255 0.125642C5.28927 0.0429453 5.43562 -0.000596081 5.58482 6.16384e-06H9.41183C9.56137 -0.000106452 9.70798 0.043598 9.83515 0.126203C9.96233 0.208807 10.065 0.327034 10.1317 0.467584L10.4464 1.12501Z" />
                        </svg>

                    </button>

                    {
                      showAlert ?

                      <Creator 
                          isAlert={true}
                          toggleCreatorState={toggleAlert}
                          handleCreator={(e: any) => { deleteList(idx); }}
                          inputGroups={alertInputs}
                          bg={list.color}
                          direction="below"
                      />

                      : null
                    }
                    
                </div>

              </div>
            )) 
          }

          <div className='creator-wrapper todo-creator-wrapper'>

            <button onClick={toggleCreator} className='list-container'></button>

            {
              showCreator ?

              <Creator 
                  isAlert={false}
                  toggleCreatorState={toggleCreator}
                  handleCreator={(e: any) => { createList(e); } } 
                  inputGroups={creatorInputs}
                  bg="accent3"  
                  direction="right"
              /> 

              : null
            }
            
          </div>
            
        {/* </div> */}
        
    </div>
    </>
  )
}