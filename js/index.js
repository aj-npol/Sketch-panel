
let mouseDown = 0;
window.onmousedown = () => {
  ++mouseDown;
}
window.onmouseup = () => {
  --mouseDown;
}


// Grid Size Range 
let gridSizeLabel = document.getElementById('grid-size-range-label');
let gridSizeRange = document.getElementById('grid-size-range');

gridSizeRange.addEventListener('change', (e) => {
    let gridSize = gridSizeRange.value;
    gridSizeLabel.textContent = 'Grid Size: ' + gridSize + 'x' + gridSize;
})

// BG color & Brush Color
let bgColorPicker = document.getElementById('bg-color-picker');
let brushColorPicker = document.getElementById('brush-color-picker');

// Brush Opacity Range 
let brushOpacityLabel = document.getElementById('brush-opacity-range-label');
let brushOpacityRange = document.getElementById('brush-opacity-range');

brushOpacityRange.addEventListener('change', (e) => {
    let opacity = brushOpacityRange.value;
    brushOpacityLabel.textContent = 'Brush Opacity: ' + opacity;
})


// Grid cells
let grid = document.getElementById('grid');

function buildGrid(){
    // remove all children first
    let currentChildren = document.querySelectorAll('.grid-row');
    console.log(currentChildren.length)
    currentChildren.forEach((child) => {
        grid.removeChild(child);
    });

    let gridSize = parseInt(gridSizeRange.value);
    let cellSize = Math.floor(640/gridSize);
    let bgColor = bgColorPicker.value;
    
    for (let i=0; i < gridSize; i++){
        let newRow = document.createElement('div');
        newRow.setAttribute('style', `padding:0; margin:0;`);
        newRow.className = 'grid-row';
        for (let j=0; j < gridSize; j++){
            let newCell = document.createElement('div');
            newCell.className = 'gridCell';
            newCell.setAttribute('style', `width:${cellSize}; height:${cellSize}; padding:0; margin:0; background-color:${bgColor}`)
            newCell.className = 'grid-cell';
            newRow.appendChild(newCell);
        }
        grid.appendChild(newRow);
    }

    newGridWidth = cellSize * gridSize;
    grid.setAttribute('style', `width:${newGridWidth}; height:${newGridWidth};`);
    addCellListeners();
}
buildGrid();


/// grid change listeners
gridSizeRange.addEventListener('change', buildGrid);
bgColorPicker.addEventListener('change', buildGrid);


/// Brush or Eraser selection
let brushButton = document.getElementById('btn-brush');
let eraserButton = document.getElementById('btn-eraser');

brushButton.addEventListener('click', (e) => {
    brushButton.classList.add('btn-pressed');
    eraserButton.classList.remove('btn-pressed');
});

eraserButton.addEventListener('click', (e) => {
    eraserButton.classList.add('btn-pressed');
    brushButton.classList.remove('btn-pressed');
});


// cell brushing or erasing

function addCellListeners(){
    let gridCells = document.querySelectorAll('.grid-cell');
    window.lastColor = bgColorPicker.value;
    gridCells.forEach((cell) => {
        cell.addEventListener('mouseenter', cellMouseEnter);
        cell.addEventListener('mouseleave', cellMouseLeave);
    });
}


function cellMouseEnter(event){
    let paintMode = brushButton.classList.contains('btn-pressed');
    let currentNode = event.target;
    window.lastColor = currentNode.style.backgroundColor;
    if (paintMode){
        currentNode.style.backgroundColor = brushColorPicker.value;
    } else {
        currentNode.style.backgroundColor = bgColorPicker.value; // eraser
    }
    if(mouseDown == 1){
        window.lastColor = currentNode.style.backgroundColor;
    }
}

function cellMouseLeave(event){
    let paintMode = brushButton.classList.contains('btn-pressed');
    let currentNode = event.target;
    currentNode.style.backgroundColor = window.lastColor;
}

