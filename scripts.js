function getCSSDimension()
{
    return parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--rowWidth').trim(), 10);
}

function createGrid()
{
    const dimension = getCSSDimension();

    const gridContainer = document.getElementById('js-grid');
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

createGrid();
captureMousePath();