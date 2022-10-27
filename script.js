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

window.addEventListener('load', function() {
  alignBorders('columnline-one', 'table__first-column');
  alignBorders('columnline-two', 'table__second-column');
  alignBorders('columnline-three', 'table__third-column');
  alignBorders('columnline-four', 'table__fourth-column');
  alignBorders('columnline-five', 'table__fourth-column');
});

window.addEventListener('resize', function() {
  alignBorders('columnline-one', 'table__first-column');
  alignBorders('columnline-two', 'table__second-column');
  alignBorders('columnline-three', 'table__third-column');
  alignBorders('columnline-four', 'table__fourth-column');
  alignBorders('columnline-five', 'table__fourth-column');
});

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

function moveTableColums(event, currentColumnline, firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted) {
  var oldCurrentColumnlinePosition = currentColumnline.offsetLeft;
  var firstColumnToBeAdjustedWidth = firstHeaderToBeAdjusted.offsetWidth;
  var secondColumnToBeAdjustedWidth = seconHeaderToBeAdjusted.offsetWidth;
  var firstColumnToNotBeAdjustedWidth = firstHeaderToNotBeAdjusted.offsetWidth;
  var secondColumnToNotBeAdjustedWidth = secondHeaderToNotBeAdjusted.offsetWidth;
  var oldmousePosition = event.clientX;

  function onMouseMove(event) {
    const newColumnlineLeft = event.clientX;
    const newColumnlineLeftIsInMinWidth = newColumnlineLeft >= firstHeaderToBeAdjusted.offsetLeft + minWidth && newColumnlineLeft <= seconHeaderToBeAdjusted.offsetLeft + seconHeaderToBeAdjusted.offsetWidth - minWidth;

    if (newColumnlineLeftIsInMinWidth) {
      currentColumnline.style.left = newColumnlineLeft  + 'px';
    }
    else {
      document.removeEventListener('mousemove', onMouseMove);
      const diffCurrentColumnline = oldCurrentColumnlinePosition - currentColumnline.offsetLeft;

      let diffIsNegative = diffCurrentColumnline < 0;

      if (diffIsNegative) {
        firstColumnToBeAdjustedWidth = currentColumnline.offsetLeft;
        secondColumnToBeAdjustedWidth = minWidth;

        adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth);
        adjustWidthOfColumns(firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted, firstColumnToNotBeAdjustedWidth, secondColumnToNotBeAdjustedWidth);

        return;
      }

      if (!diffIsNegative) {
        firstColumnToBeAdjustedWidth = minWidth;
        
        secondColumnToBeAdjustedWidth = secondColumnToBeAdjustedWidth + diffCurrentColumnline;
        adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth);
        adjustWidthOfColumns(firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted, firstColumnToNotBeAdjustedWidth, secondColumnToNotBeAdjustedWidth);

        return;
      }
      
    }
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
      adjustWidthOfColumns(firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted, firstColumnToNotBeAdjustedWidth, secondColumnToNotBeAdjustedWidth);

      return;
    }

    if (!diffIsNegative) {
      firstColumnToBeAdjustedWidth = firstColumnToBeAdjustedWidth - diffMousePosition;
      secondColumnToBeAdjustedWidth = secondColumnToBeAdjustedWidth + diffMousePosition;

      adjustWidthOfColumns(firstColumnToBeAdjusted, secondColumnToBeAdjusted, firstHeaderToBeAdjusted, seconHeaderToBeAdjusted, firstColumnToBeAdjustedWidth, secondColumnToBeAdjustedWidth);
      adjustWidthOfColumns(firstColumnToNotBeAdjusted, secondColumnToNotBeAdjusted, firstHeaderToNotBeAdjusted, secondHeaderToNotBeAdjusted, firstColumnToNotBeAdjustedWidth, secondColumnToNotBeAdjustedWidth);
    
      return;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var columnOne = document.getElementsByClassName('table__first-column');
  var columnTwo = document.getElementsByClassName('table__second-column');
  var columnThree = document.getElementsByClassName('table__third-column');
  var columnFour = document.getElementsByClassName('table__fourth-column');
  var headerOne = document.getElementById('table__first-header');
  var headerTwo = document.getElementById('table__second-header');
  var headerThree = document.getElementById('table__third-header');
  var headerFour = document.getElementById('table__fourth-header');
  const columnlineTwo = document.getElementById('columnline-two');
  const columnlineThree = document.getElementById('columnline-three');
  const columnlineFour = document.getElementById('columnline-four');
  
  columnlineTwo.onmousedown = function(event) {
    moveTableColums(event, columnlineTwo, columnOne, columnTwo, headerOne, headerTwo, columnThree, columnFour, headerThree, headerFour);
  }

  columnlineThree.onmousedown = function(event) {
    moveTableColums(event, columnlineThree, columnTwo, columnThree, headerTwo, headerThree, columnOne, columnFour, headerOne, headerFour);
  }

  columnlineFour.onmousedown = function(event) {
    moveTableColums(event, columnlineFour, columnThree , columnFour, headerThree, headerFour, columnOne, columnTwo, headerOne, headerTwo);
  }
});
