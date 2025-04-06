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
    for (let width = 0; width < dimension; ++width)
    {
        for (let height = 0; height < dimension; ++height)
        {
            const gridSquare = document.createElement('div');
            gridSquare.textContent = `Div`;
            gridContainer.append(gridSquare);
        }
    }
}

function captureMousePath()
{
    const gridContainer = document.getElementById('js-grid');
    gridContainer.addEventListener('mouseover', updateGridSquare)
}

function updateGridSquare(event)
{
    if(event.target !== event.currentTarget)
        event.target.style.backgroundColor = "var(--odinBlue)";
}

function updateCSSGridDimension(gridDimension = '16')
{
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
        let userDimension = prompt("Enter a single dimension value");
        updateCSSGridDimension(userDimension);
    })
}

function valueIsNumber(value)
{
    const numberValue = Number(value);
    return Number.isInteger(numberValue);
}

captureMousePath();
getUserGridValue();