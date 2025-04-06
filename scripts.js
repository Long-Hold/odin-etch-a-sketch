function createGrid()
{
    const dimension = 16;
    const gridContainer = document.getElementById('js-grid');
    for (let width = 0; width < dimension; ++width)
    {
        for (let height = 0; height < dimension; ++height)
        {
            const gridSquare = document.createElement('div');
            gridSquare.textContent = `Div ${height}`;
            gridContainer.append(gridSquare);
        }
    }
}

createGrid();