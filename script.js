var cursorIsOverDragAreaTolerance = 5;

function hideColumnContents(className) {
  const allCellsInClass = document.getElementsByClassName(className);
  for (const element of allCellsInClass) {
    const contentIsVisible = element.style.visibility == '' || element.style.visibility == 'visible';

    if (contentIsVisible) {
      element.style.visibility = 'hidden';
    }
    else {
      element.style.visibility = 'visible';
    }
  }
}

function cursorIsOverDragArea(className, event) {
  const mousePositionX = event.clientX;
  const allCellsInColumn = document.getElementsByClassName(className);

  for (const element of allCellsInColumn) {
    const coordinatesOfColumnX = element.offsetLeft;
    let widthOfColumn = element.offsetWidth;
    const cursorIsOverDragArea = mousePositionX <= coordinatesOfColumnX + cursorIsOverDragAreaTolerance;

    if (cursorIsOverDragArea) { 
      element.style.cursor = "col-resize";
      element.addEventListener('click', function() {
        
      });
    }

    if (!cursorIsOverDragArea) {
      element.style.cursor = "default"
    }
  }
}

function computeNewWidthWithString(widthOfColumn) {
  widthOfColumn = widthOfColumn + 10;

}
