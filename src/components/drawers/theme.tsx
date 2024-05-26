import React from 'react';

const Drawer = (props : any) => {

    return(
        <>

        <div id="drawer">
            
            <div className="drawer-heading">
                <h3>kjdnskjdfkj</h3>
                <svg className="desktop-hide" width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4125 10.4171C10.3027 11.3355 8.69687 11.3355 7.58711 10.4171L1.41749 5.31118C-0.748066 3.519 0.519224 -2.45743e-07 3.33019 0L15.6694 1.07873e-06C18.4804 1.32447e-06 19.7477 3.519 17.5821 5.31118L11.4125 10.4171Z" fill="#FFF8E5"/></svg>            
            </div>

            <div className="drawer-content">
                <p>A drawing application with capabilities similar to that of Microsoft Paint, that allows you to draw on a canvas, erase from the canvas, fill the canvas, and more. It was created with JavaScript and the Canvas API.</p>
            </div>

            <div className="drawer-buttons">
                <a className="button" href="https://mishalukov-draw.netlify.app/" target="_blank" rel="noreferrer">View Live</a>
                <a className="button" href="https://github.com/mishakov7/drawing-application" target="_blank" rel="noreferrer">View Code</a>
            </div>

        </div>

        </>
    );
}

export default Drawer;