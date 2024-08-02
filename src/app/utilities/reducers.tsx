import { createContext } from "react";

export const initialState = {
    drawer: null,
    t_bookmark: -1,
    t_search: -1,
    t_list: -1,
    t_sticky: -1
}

export const drawerManager = (state: any, action: any) => {
    switch(action.type) {
        case "open_drawer": {
            return {
                ...state,
                drawer: action.drawer,
                direction: action.direction
            }
        }

        case "close_drawer": {
            return {
                ...state,
                drawer: null,
                direction: null
            }
        }

        case "tutorial_finish": {
            return {
                ...state,
                t_bookmark: -1,
                t_search: -1,
                t_list: -1,
                t_sticky: -1
            }
        }

        case "tutorial_bookmark": {
            return {
                ...state,
                t_bookmark: action.step
            }
        }

        case "tutorial_search": {
            return {
                ...state,
                t_search: action.step
            }
        }

        case "tutorial_list": {
            return {
                ...state,
                t_list: action.step
            }
        }

        case "tutorial_sticky": {
            return {
                ...state,
                t_sticky: action.step
            }
        }
        
            
    }
}

export const feature = {
    click: (ref: any) => {
        window.scrollTo({top: 0, behavior: "smooth"});
        ref.click();
    },

    hover: (ref: any) => {
        window.scrollTo({top: 0, behavior: "smooth"});
        ref.classList.add("hovered");
    },
    highlight: (ref: any, css: string) => {
        window.scrollTo({top: 0, behavior: "smooth"});

        // switch(ref) {
        // case searchRef.current:
        //     blurLayers.current[1].classList.add(cssclass);
        //     blurLayers.current[2].classList.add(cssclass);
        //     blurLayers.current[3].classList.add(cssclass);
        //     break;
        
        // case moreRef.current:
        //     blurLayers.current[0].classList.add(cssclass);
        //     blurLayers.current[2].classList.add(cssclass);
        //     blurLayers.current[3].classList.add(cssclass);
        //     break;

        // case listRef.current:
        //     blurLayers.current[0].classList.add(cssclass);
        //     blurLayers.current[1].classList.add(cssclass);
        //     blurLayers.current[3].classList.add(cssclass);
        //     break;

        // case bookmarkRef.current:
        //     blurLayers.current[0].classList.add(cssclass);
        //     blurLayers.current[1].classList.add(cssclass);
        //     blurLayers.current[2].classList.add(cssclass);
        //     break;
        // }

        ref.classList.add("highlight");
    },
    unhighlight: (ref: any, timeout: number) => {
        setTimeout(() => {
            // blurLayers.current[0].classList.remove("blur");
            // blurLayers.current[1].classList.remove("blur");
            // blurLayers.current[2].classList.remove("blur");
            // blurLayers.current[3].classList.remove("blur");
      
            // blurLayers.current[0].classList.remove("reverse-blur");
            // blurLayers.current[1].classList.remove("reverse-blur");
            // blurLayers.current[2].classList.remove("reverse-blur");
            // blurLayers.current[3].classList.remove("reverse-blur");
      
            ref.classList.remove("highlight");
            ref.classList.remove("hovered");
      
          }, timeout);
    }
}

export const DrawerContext = createContext({
    ctx: initialState,
    setCtx: () => {}
});

export default DrawerContext;