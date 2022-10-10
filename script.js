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
  const mousePositionY = event.clientY;
  const allCellsInColumn = document.getElementsByClassName(className);
  const tableCoodinatesTop = document.getElementById('table-id').offsetTop;
  const tableHeight = document.getElementById('table-id').offsetHeight;

  for (const element of allCellsInColumn) {
    const coordinatesOfColumnX = element.offsetLeft;
    const cursorIsOverDragArea = mousePositionX <= coordinatesOfColumnX + cursorIsOverDragAreaTolerance
                                 && mousePositionY > tableCoodinatesTop 
                                 && mousePositionY < tableCoodinatesTop + tableHeight;

    element.onmouseover = function() {
      if (cursorIsOverDragArea) { 
        element.style.cursor = "col-resize";
      }
    }

    element.onmousedown = function(event) {
      for (const element of allCellsInColumn) {
        element.style.position = 'absolute';
        const oldMousePositionX = event.clientX;
        if (cursorIsOverDragArea) { 
          element.onmousemove = function(event) {
            const computedXPosition = element.offsetLeft + (event.clientX - oldMousePositionX);
            const joinedComputedXPosition = computedXPosition + 'px';
            element.onmouseup = function() {
              element.style.left = joinedComputedXPosition;
              element.style.position = 'relative';

              return;
            }
          } 
        }
      }
    }

    if (!cursorIsOverDragArea) {
      element.style.cursor = "default"
    }
  }
}
