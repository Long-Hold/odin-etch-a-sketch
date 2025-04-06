function createGrid()
{
    const dimension = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--rowWidth').trim(), 10);

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

createGrid();