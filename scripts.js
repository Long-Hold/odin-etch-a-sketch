// If false, the grid squares are changed to a solid color
// If true, grid squares start transparent and become opaque with each new
// event
let FADEON = false;

function getCSSDimension()
{
    return parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--rowWidth').trim(), 10);
}

function createGrid()
{
    let dimension = getCSSDimension();

    const gridContainer = document.getElementById('js-grid');

    // Clear the container of any divs before building
    gridContainer.innerHTML = '';
    for (let row = 0; row < dimension; ++row)
    {
        for (let column = 0; column < dimension; ++column)
        {
            const gridSquare = document.createElement('div');
            gridContainer.append(gridSquare);
        }
    }
}

function captureMousePath()
{
    const gridContainer = document.getElementById('js-grid');
    gridContainer.addEventListener('mouseover', updateGridSquare);
}

function captureTouchScreenPath()
{
    // Captures events caused by touch-based or track pad users on the webpage

    // Track touches in progress
    const ongoingTouches = [];

    const gridContainer = document.getElementById('js-grid');
    gridContainer.addEventListener('touchstart', handleTouch);
    gridContainer.addEventListener('touchmove', handleTouch);
}

function handleTouch(event)
{
    if (event.cancelable)
        event.preventDefault();

    const touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        
        // Find the element at the current touch position
        const touchedElement = document.elementFromPoint(
            touch.clientX,
            touch.clientY
        );
        
        // If we found an element and it's a grid square, color it
        if (touchedElement && touchedElement.closest('#js-grid')) {
            touchedElement.style.backgroundColor = "var(--odinBlue)";
        }
    }
}

function updateGridSquare(event)
{
    if(event.target !== event.currentTarget)
        if (FADEON)
            event.target.style.backgroundColor = "red";
        else
            event.target.style.backgroundColor = "var(--odinBlue)";
}

function updateCSSGridDimension(gridDimension = '16')
{
    // Sets the CSS grid value property
    // CSS uses this value to adjust the size of each box in the grid
    if (valueIsNumber(gridDimension))
    {
        const gridVal = document.documentElement;
        gridVal.style.setProperty('--rowWidth', gridDimension);
    }
    createGrid();
}

function getUserGridValue()
{
    // Prompt user for a value to set the grid on when clicked
    const dimensionButton = document.getElementById('prompt-button');
    dimensionButton.addEventListener('click', () => {
        let userDimension = prompt("Enter a single dimension value between 0 and 64");
        updateCSSGridDimension(userDimension);
    })
}

function valueIsNumber(value)
{
    // Check if the grid value is positive and less than a maximum value
    // Going higher than 64 causes the webpage to crash
    const numberValue = Number(value);
    return Number.isInteger(numberValue) && numberValue > 0 && numberValue <= 64;
}

function resetBoard()
{
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {
        createGrid();
    });
}

function captureFadeToggle()
{
    /* 
    This function updates the value of global variable FADEON
    to indicate to other functions that the fade functionality is either
    on or off.

    It also updates the text content of the button itself to reflect the status
    of the effect.
    */
    const fadeButton = document.getElementById('fade-mode-button');
    const toggleStatus = document.getElementById('toggle-status');

    fadeButton.addEventListener('click', () => {
        if (FADEON)
        {
            FADEON = false;
            toggleStatus.textContent = 'Off';
        }
        else
        {
            FADEON = true;
            toggleStatus.textContent = 'On';
        }
        console.log(FADEON);
    });
}

createGrid();
captureMousePath();
captureTouchScreenPath();
getUserGridValue();
resetBoard();
captureFadeToggle();