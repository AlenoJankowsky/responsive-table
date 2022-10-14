var cursorIsOverDragAreaTolerance = 5;
var minWidth = 250;

function alignBorders(identifier, className) {
  const currentBorder = document.getElementById(identifier);
  const currentColumn = document.getElementsByClassName(className);
  const rect = currentColumn[0].getBoundingClientRect();
  const currentColmnOffSetLeft = rect.left;
  currentBorder.style.left = currentColmnOffSetLeft + 'px';
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  }
  else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

function executeOrder66() {
  addLoadEvent(alignBorders('columnline-one', 'table__first-column'));
  addLoadEvent(alignBorders('columnline-two', 'table__second-column'));
  addLoadEvent(alignBorders('columnline-three', 'table__third-column'));
  addLoadEvent(alignBorders('columnline-four', 'table__fourth-column'));
  addLoadEvent(alignBorders('columnline-five', 'table__fifth-column'));
}

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

function adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, headerOfFirstColumnToBeAdjusted, headerOfSecondColumnToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth) {
  for (const element of firstColumnToBeAdjusted) {
    element.style.width = firstColumnToBeAdjustedWidth + 'px';
    
  }

  headerOfFirstColumnToBeAdjusted.style.width = firstColumnToBeAdjustedWidth + 'px';

  for (const element of secondColumnToBeAdjusted) {
    element.style.width = secondColumnToBeAdjustedWidth + 'px';
    
  }

  headerOfSecondColumnToBeAdjusted.style.width = secondColumnToBeAdjustedWidth + 'px';
}

document.addEventListener('DOMContentLoaded', function() {
  const columnlineOne = document.querySelector('#columnline-one');
  const columnlineTwo = document.querySelector('#columnline-two');
  const columnlineThree = document.querySelector('#columnline-three');
  const columnlineFour = document.querySelector('#columnline-four');
  const columnlineFive = document.querySelector('#columnline-five');
  var columnOne = document.getElementsByClassName('table__first-column');
  var columnTwo = document.getElementsByClassName('table__second-column');
  var columnThree = document.getElementsByClassName('table__third-column');
  var columnFour = document.getElementsByClassName('table__fourth-column');
  var headerOne = document.getElementById('table__first-header');
  var headerTwo = document.getElementById('table__second-header');
  var headerThree = document.getElementById('table__third-header');
  var headerFour = document.getElementById('table__fourth-header');
  var table = document.getElementById('table-id');

  columnlineOne.onmousedown = function(event) {
    function moveToMouse(windowCoordinatesX) {
      const newColumnlineLeft = windowCoordinatesX;
      const newColumnLeftIsInTable = newColumnlineLeft >= table.offsetLeft;

      if (newColumnLeftIsInTable) {
        columnlineOne.style.left = windowCoordinatesX + 'px';
      }
      else {
        document.removeEventListener('mousemove', onMouseMove);
      }
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineOne.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
    }
  }

  columnlineTwo.onmousedown = function(event) {
    var OldColumnlineTwoPosition = columnlineTwo.offsetLeft;
    var columnOneWidth = headerOne.offsetWidth;
    var columnTwoWidth = headerTwo.offsetWidth;
    var columnThreeWidth = headerThree.offsetWidth;
    var columnFourWidth = headerFour.offsetWidth;
    var oldmousePosition = event.clientX;

    function moveToMouse(windowCoordinatesX) {
      const newColumnlineLeft = windowCoordinatesX;
      const newColumnlineLeftIsInMinWidth = newColumnlineLeft >= headerOne.offsetLeft + minWidth && newColumnlineLeft <= headerTwo.offsetLeft + headerTwo.offsetWidth - minWidth;

      if (newColumnlineLeftIsInMinWidth) {
        columnlineTwo.style.left = windowCoordinatesX  + 'px';
      }
      else {
        document.removeEventListener('mousemove', onMouseMove);
        const diffColumnlineTwo = OldColumnlineTwoPosition - columnlineTwo.offsetLeft;

        let diffIsNegative = diffColumnlineTwo < 0;

        if (diffIsNegative) {
          columnOneWidth = columnlineTwo.offsetLeft;
          columnTwoWidth = minWidth;

          adjustWidthOfColumns(columnOne, columnTwo, headerOne, headerTwo, columnOneWidth, columnTwoWidth);
        }
  
        if (!diffIsNegative) {
          columnOneWidth = minWidth;
          columnTwoWidth = columnTwoWidth + diffColumnlineTwo;
          adjustWidthOfColumns(columnOne, columnTwo, headerOne, headerTwo, columnOneWidth, columnTwoWidth);
        }
        
        
        adjustWidthOfColumns(columnThree, columnFour, headerThree, headerFour, columnThreeWidth, columnFourWidth);

        return;
      }
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineTwo.onmouseup = function(event) {
      document.removeEventListener('mousemove', onMouseMove);
      const diffMousePosition = oldmousePosition - event.clientX;

      let diffIsNegative = diffMousePosition < 0;

      if (diffIsNegative) {
        columnOneWidth = columnOneWidth - diffMousePosition;
        columnTwoWidth = columnTwoWidth + diffMousePosition;

        adjustWidthOfColumns(columnOne, columnTwo, headerOne, headerTwo, columnOneWidth, columnTwoWidth);
      }

      if (!diffIsNegative) {
        columnOneWidth = columnOneWidth - diffMousePosition;
        columnTwoWidth = columnTwoWidth + diffMousePosition;

        adjustWidthOfColumns(columnOne, columnTwo, headerOne, headerTwo, columnOneWidth, columnTwoWidth);
      }

      adjustWidthOfColumns(columnThree, columnFour, headerThree, headerFour, columnThreeWidth, columnFourWidth);
    }
  }

  columnlineThree.onmousedown = function(event) {
    var oldColumnlineThreePosition = columnlineThree.offsetLeft;
    var columnOneWidth = headerOne.offsetWidth;
    var columnTwoWidth = headerTwo.offsetWidth;
    var columnThreeWidth = headerThree.offsetWidth;
    var columnFourWidth = headerFour.offsetWidth;
    var oldmousePosition = event.clientX;

    function moveToMouse(windowCoordinatesX) {
      const newColumnlineLeft = windowCoordinatesX;
      const newColumnlineLeftIsInMinWidth = newColumnlineLeft >= headerTwo.offsetLeft + minWidth && newColumnlineLeft <= headerThree.offsetLeft + headerThree.offsetWidth - minWidth;

      if (newColumnlineLeftIsInMinWidth) {
        columnlineThree.style.left = windowCoordinatesX + 'px';
      }
      else {
        document.removeEventListener('mousemove', onMouseMove);
        const diffColumnlineThree = oldColumnlineThreePosition - columnlineThree.offsetLeft;

        let diffIsNegative = diffColumnlineThree < 0;

        if (diffIsNegative) {
          columnTwoWidth = columnlineThree.offsetLeft - headerOne.offsetWidth;
          columnThreeWidth = minWidth;
          adjustWidthOfColumns(columnTwo, columnThree, headerTwo, headerThree, columnTwoWidth, columnThreeWidth);
        }
  
        if (!diffIsNegative) {
          columnTwoWidth = minWidth;
          columnThreeWidth = columnThreeWidth + diffColumnlineThree;
          adjustWidthOfColumns(columnTwo, columnThree, headerTwo, headerThree, columnTwoWidth, columnThreeWidth)
        }
        
        adjustWidthOfColumns(columnOne, columnFour, headerOne, headerFour, columnOneWidth, columnFourWidth);

        return;
      }
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineThree.onmouseup = function(event) {
      document.removeEventListener('mousemove', onMouseMove);
      const diffMousePosition = oldmousePosition - event.clientX;

      columnTwoWidth = headerTwo.offsetWidth;
      columnThreeWidth = headerThree.offsetWidth;

      const diffIsNegative = diffMousePosition < 0;

      if (diffIsNegative) {
        columnTwoWidth = columnTwoWidth - diffMousePosition;
        columnThreeWidth = columnThreeWidth + diffMousePosition; 

        adjustWidthOfColumns(columnTwo, columnThree, headerTwo, headerThree, columnTwoWidth, columnThreeWidth);
      }

      if (!diffIsNegative) {
        columnTwoWidth = columnTwoWidth - diffMousePosition;
        columnThreeWidth = columnThreeWidth + diffMousePosition;

        adjustWidthOfColumns(columnTwo, columnThree, headerTwo, headerThree, columnTwoWidth, columnThreeWidth);
      }

      adjustWidthOfColumns(columnOne, columnFour, headerOne, headerFour, columnOneWidth, columnFourWidth);
    }
  }

  columnlineFour.onmousedown = function(event) {
    var oldColumnlineFourPosition = columnlineFour.offsetLeft;
    var columnOneWidth = headerOne.offsetWidth;
    var columnTwoWidth = headerTwo.offsetWidth;
    var columnThreeWidth = headerThree.offsetWidth;
    var columnFourWidth = headerFour.offsetWidth;
    var oldmousePosition = event.clientX;

    function moveToMouse(windowCoordinatesX) {
      const newColumnlineLeft = windowCoordinatesX;
      const newColumnlineLeftIsInMinWidth = newColumnlineLeft >= headerThree.offsetLeft + minWidth && newColumnlineLeft <= headerFour.offsetLeft + headerFour.offsetWidth - minWidth;

      if (newColumnlineLeftIsInMinWidth) {
        columnlineFour.style.left = windowCoordinatesX  + 'px';
      }
      else {
        document.removeEventListener('mousemove', onMouseMove);
        const diffColumnlineFour = oldColumnlineFourPosition - columnlineFour.offsetLeft;

        let diffIsNegative = diffColumnlineFour < 0;

        if (diffIsNegative) {
          columnThreeWidth = columnlineFour.offsetLeft - headerTwo.offsetWidth - headerOne.offsetWidth;
          columnFourWidth = minWidth;

          adjustWidthOfColumns(columnThree, columnFour, headerThree, headerFour, columnThreeWidth, columnFourWidth);
        }
  
        if (!diffIsNegative) {
          columnThreeWidth = minWidth;
          columnFourWidth = columnFourWidth + diffColumnlineFour;

          adjustWidthOfColumns(columnThree, columnFour, headerThree, headerFour, columnThreeWidth, columnFourWidth);
        }
        
        adjustWidthOfColumns(columnOne, columnTwo, headerTwo, headerTwo, columnOneWidth, columnTwoWidth);

        return;
      }
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineFour.onmouseup = function(event) {
      document.removeEventListener('mousemove', onMouseMove);
      const diffMousePosition = oldmousePosition - event.clientX;

      columnThreeWidth = headerThree.offsetWidth;
      columnFourWidth = headerFour.offsetWidth;

      const diffIsNegative = diffMousePosition < 0;
      const diffIsPositive = diffMousePosition > 0;

      if (diffIsNegative) {
        columnThreeWidth = columnThreeWidth - diffMousePosition;
        columnFourWidth = columnFourWidth + diffMousePosition;

        adjustWidthOfColumns(columnThree, columnFour, headerThree, headerFour, columnThreeWidth, columnFourWidth);
      }

      if (diffIsPositive) {
        columnThreeWidth = columnThreeWidth - diffMousePosition;
        columnFourWidth = columnFourWidth + diffMousePosition;

        adjustWidthOfColumns(columnThree, columnFour, headerThree, headerFour, columnThreeWidth, columnFourWidth);
      }

      adjustWidthOfColumns(columnOne, columnTwo, headerTwo, headerTwo, columnOneWidth, columnTwoWidth);
    }
  }

  columnlineFive.onmousedown = function(event) {

    function moveToMouse(windowCoordinatesX) {
      const newColumnlineLeft = windowCoordinatesX;
      const newColumnlineLeftIsInMinWidth = newColumnlineLeft >= headerFour.offsetLeft + minWidth;

      if (newColumnlineLeftIsInMinWidth) {
        columnlineFive.style.left = windowCoordinatesX + 'px';
      }
      else {
        document.removeEventListener('mousemove', onMouseMove);
      }
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineFive.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
    }
  }
});
