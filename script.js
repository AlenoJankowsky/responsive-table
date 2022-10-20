var minWidth = 250;

function alignBorders(identifier, className) {
  const currentBorder = document.getElementById(identifier);
  const currentColumn = document.getElementsByClassName(className);
  const rect = currentColumn[0].getBoundingClientRect();
  if (identifier == 'columnline-five') {
    const currentColumnOffsetLeft = rect.left + rect.width;
    currentBorder.style.left = currentColumnOffsetLeft + 'px';

    return;
  }

  const currentColumnOffsetLeft = rect.left;
  currentBorder.style.left = currentColumnOffsetLeft + 'px';
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

function adjustColumnlinePositions() {
  addLoadEvent(alignBorders('columnline-one', 'table__first-column'));
  addLoadEvent(alignBorders('columnline-two', 'table__second-column'));
  addLoadEvent(alignBorders('columnline-three', 'table__third-column'));
  addLoadEvent(alignBorders('columnline-four', 'table__fourth-column'));
  addLoadEvent(alignBorders('columnline-five', 'table__fourth-column'));
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

function determineMouseoverColumnline(event, columnlineTwo, columnlineThree, columnlineFour) {
  const mouseIsOverColumnlineTwo = event.clientX == columnlineTwo.offsetLeft + 5 || event.clientX == columnlineTwo.offsetLeft - 5;
  const mouseIsOverColumnlineThree = event.clientX == columnlineThree.offsetLeft + 5 || event.clientX == columnlineThree.offsetLeft - 5;
  const mouseIsOverColumnlineFour = event.clientX == columnlineFour.offsetLeft;

  if (mouseIsOverColumnlineTwo) {
    console.log("KEK");
    return 1;
  }

  if (mouseIsOverColumnlineThree) {
    console.log("KEK");
    return 2;
  }

  if (mouseIsOverColumnlineFour) {
    console.log("KEK");
    return 3;
  }
}

function moveTableColums(event, currentColumnline, firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted) {
  currentColumnline.onmousedown = function() {
    var oldCurrentColumnlinePosition = currentColumnline.offsetLeft;
    var firstColumnToBeAdjustedWidth = firstHeaderToBeAdjusted.offsetWidth;
    var secondColumnToBeAdjustedWidth = seconHeaderToBeAdjusted.offsetWidth;
    var firstColumnToNotBeAdjustedWidth = firstHeaderToNotBeAdjusted.offsetWidth;
    var secondColumnToNotBeAdjustedWidth = secondHeaderToNotBeAdjusted.offsetWidth;
    var oldmousePosition = event.clientX;

    function moveToMouse(windowCoordinatesX) {
      const newColumnlineLeft = windowCoordinatesX;
      const newColumnlineLeftIsInMinWidth = newColumnlineLeft >= firstHeaderToBeAdjusted.offsetLeft + minWidth && newColumnlineLeft <= seconHeaderToBeAdjusted.offsetLeft + seconHeaderToBeAdjusted.offsetWidth - minWidth;

      if (newColumnlineLeftIsInMinWidth) {
        currentColumnline.style.left = windowCoordinatesX  + 'px';
      }
      else {
        document.removeEventListener('mousemove', onMouseMove);
        const diffCurrentColumnline = oldCurrentColumnlinePosition - currentColumnline.offsetLeft;

        let diffIsNegative = diffCurrentColumnline < 0;

        if (diffIsNegative) {
          firstColumnToBeAdjustedWidth = currentColumnline.offsetLeft;
          secondColumnToBeAdjustedWidth = minWidth;

          adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth);
        }

        if (!diffIsNegative) {
          firstColumnToBeAdjustedWidth = minWidth;
          secondColumnToBeAdjustedWidth = secondColumnToBeAdjustedWidth + diffCurrentColumnline;
          adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth);
        }
        
        
        adjustWidthOfColumns(firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted, firstColumnToNotBeAdjustedWidth, secondColumnToNotBeAdjustedWidth);

        return;
      }
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    currentColumnline.onmouseup = function(event) {
      document.removeEventListener('mousemove', onMouseMove);
      const diffMousePosition = oldmousePosition - event.clientX;

      let diffIsNegative = diffMousePosition < 0;

      if (diffIsNegative) {
        firstColumnToBeAdjustedWidth = firstColumnToBeAdjustedWidth - diffMousePosition;
        secondColumnToBeAdjustedWidth = secondColumnToBeAdjustedWidth + diffMousePosition;

        adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth);
      }

      if (!diffIsNegative) {
        firstColumnToBeAdjustedWidth = firstColumnToBeAdjustedWidth - diffMousePosition;
        secondColumnToBeAdjustedWidth = secondColumnToBeAdjustedWidth + diffMousePosition;

        adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth);
      }

      adjustWidthOfColumns(firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted, firstColumnToNotBeAdjustedWidth, secondColumnToNotBeAdjustedWidth);
    }
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
  const columnlineTwo = document.getElementById('columnline-two');
  const columnlineThree = document.getElementById('columnline-three');
  const columnlineFour = document.getElementById('columnline-four');
  console.log(columnlineTwo.offsetLeft);
  var currentColumnline = document.addEventListener('mousemove', determineMouseoverColumnline(event, columnlineTwo, columnlineThree, columnlineFour));
  var columnOne = document.getElementsByClassName('table__first-column');
  var columnTwo = document.getElementsByClassName('table__second-column');
  var columnThree = document.getElementsByClassName('table__third-column');
  var columnFour = document.getElementsByClassName('table__fourth-column');
  var headerOne = document.getElementById('table__first-header');
  var headerTwo = document.getElementById('table__second-header');
  var headerThree = document.getElementById('table__third-header');
  var headerFour = document.getElementById('table__fourth-header');

  switch (currentColumnline) {
    case 1:
      currentColumnline = columnlineTwo;
    case 2:
      currentColumnline = columnlineThree;
    case 3:
      currentColumnline = columnlineFour;
  }

  moveTableColums(currentColumnline, columnOne, columnTwo, headerOne, headerTwo, columnThree, columnFour, headerThree, headerFour);

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
          adjustWidthOfColumns(columnTwo, columnThree, headerTwo, headerThree, columnTwoWidth, columnThreeWidth);
        }
        
        adjustWidthOfColumns(columnOne, columnFour, headerOne, headerFour, columnOneWidth, columnFourWidth);

        return;
      }
    }

    moveToMouse(event.clientX);

    onMouseMove(event);

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
});
