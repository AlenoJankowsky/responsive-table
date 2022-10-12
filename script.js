var cursorIsOverDragAreaTolerance = 5;

function alignBorderOne(identifier) {
  const currentBorder = document.getElementById(identifier);
  const currentColumn = document.getElementsByClassName('table__first-column');
  const rect = currentColumn[0].getBoundingClientRect();
  const currentColmnOffSetLeft = rect.left;
  currentBorder.style.left = currentColmnOffSetLeft + 'px';
}

function alignBorderTwo(identifier) {
  const currentBorder = document.getElementById(identifier);
  const currentColumn = document.getElementsByClassName('table__second-column');
  const rect = currentColumn[0].getBoundingClientRect();
  const currentColmnOffSetLeft = rect.left;
  currentBorder.style.left = currentColmnOffSetLeft + 'px';
}

function alignBorderThree(identifier) {
  const currentBorder = document.getElementById(identifier);
  const currentColumn = document.getElementsByClassName('table__third-column');
  const rect = currentColumn[0].getBoundingClientRect();
  const currentColmnOffSetLeft = rect.left;
  currentBorder.style.left = currentColmnOffSetLeft + 'px';
}

function alignBorderFour(identifier) {
  const currentBorder = document.getElementById(identifier);
  const currentColumn = document.getElementsByClassName('table__fourth-column');
  const rect = currentColumn[0].getBoundingClientRect();
  const currentColmnOffSetLeft = rect.left;
  currentBorder.style.left = currentColmnOffSetLeft + 'px';
}

function alignBorderFive(identifier) {
  const currentBorder = document.getElementById(identifier);
  const currentColumn = document.getElementsByClassName('table__fourth-column');
  const rect = currentColumn[0].getBoundingClientRect();
  const currentColumnOffSetRight = rect.left + rect.width;
  currentBorder.style.left = currentColumnOffSetRight + 'px';
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
  addLoadEvent(alignBorderOne('columnline-one'));
  addLoadEvent(alignBorderTwo('columnline-two'));
  addLoadEvent(alignBorderThree('columnline-three'));
  addLoadEvent(alignBorderFour('columnline-four'));
  addLoadEvent(alignBorderFive('columnline-five'));
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

  columnlineOne.onmousedown = function(event) {
    columnlineOne.style.zIndex = 1000;

    document.body.append(columnlineOne);

    function moveToMouse(windowCoordinatesX) {
      const table = document.getElementById('table-id');
      const newColumnLeft = windowCoordinatesX - columnlineOne.offsetWidth / 2;
      const newColumnLeftIsInTable = newColumnLeft >= table.offsetLeft;

      if (newColumnLeftIsInTable) {
        columnlineOne.style.left = windowCoordinatesX - columnlineOne.offsetWidth / 2 + 'px';
      }
      else {
        document.removeEventListener('mousemove', onMouseMove);
        columnlineOne.onmouseup = null;
      }
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineOne.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      columnlineOne.onmouseup = null;
    }
  }

  columnlineTwo.onmousedown = function(event) {
    columnlineTwo.style.zIndex = 1;

    var oldmousePosition = event.clientX;

    document.body.append(columnlineTwo);

    function moveToMouse(windowCoordinatesX) {
      columnlineTwo.style.left = windowCoordinatesX - columnlineTwo.offsetWidth / 2 + 'px';
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineTwo.onmouseup = function(event) {
      document.removeEventListener('mousemove', onMouseMove);
      const diffMousePosition = oldmousePosition - event.clientX;

      let columnOneWidth = headerOne.offsetWidth;
      let columnTwoWidth = headerTwo.offsetWidth;

      const diffIsNegative = diffMousePosition < 0;
      const diffIsPositive = diffMousePosition > 0;

      if (diffIsNegative) {
        columnOneWidth = columnOneWidth - diffMousePosition;
        columnTwoWidth = columnTwoWidth + diffMousePosition;

        for (const element of columnOne) {
          element.style.width = columnOneWidth + 'px';
          headerOne.style.width = columnOneWidth + 'px';
        }

        for (const element of columnTwo) {
          element.style.width = columnTwoWidth + 'px';
          headerTwo.style.width = columnTwoWidth + 'px';
        }
      }

      if (diffIsPositive) {
        columnOneWidth = columnOneWidth - diffMousePosition;
        columnTwoWidth = columnTwoWidth + diffMousePosition;

        for (const element of columnOne) {
          element.style.width = columnOneWidth + 'px';
          headerOne.style.width = columnOneWidth + 'px';
        }

        for (const element of columnTwo) {
          element.style.width = columnTwoWidth + 'px';
          headerTwo.style.width = columnTwoWidth + 'px';
          console.log(element.style.right);
        }
      }

      for (const element of columnThree) {
        element.style.width = 'initial';
        headerThree.style.width = 'initial';
      }

      for (const element of columnFour) {
        element.style.width = 'auto';
        headerFour.style.width = 'auto';
      }

      columnlineTwo.onmouseup = null;
    }
  }

  columnlineThree.onmousedown = function(event) {
    columnlineThree.style.zIndex = 1;
    var oldmousePosition = event.clientX;
    document.body.append(columnlineThree);

    function moveToMouse(windowCoordinatesX) {
      columnlineThree.style.left = windowCoordinatesX - columnlineThree.offsetWidth / 2 + 'px';
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineThree.onmouseup = function(event) {
      document.removeEventListener('mousemove', onMouseMove);
      const diffMousePosition = oldmousePosition - event.clientX;

      let columnTwoWidth = headerTwo.offsetWidth;
      let columnThreeWidth = headerThree.offsetWidth;

      const diffIsNegative = diffMousePosition < 0;
      const diffIsPositive = diffMousePosition > 0;

      if (diffIsNegative) {
        columnTwoWidth = columnTwoWidth - diffMousePosition;
        columnThreeWidth = columnThreeWidth + diffMousePosition;

        for (const element of columnTwo) {
          element.style.width = columnTwoWidth + 'px';
          headerTwo.style.width = columnTwoWidth + 'px';
        }

        for (const element of columnThree) {
          element.style.width = columnThreeWidth + 'px';
          headerThree.style.width = columnThreeWidth + 'px';
        }
      }

      if (diffIsPositive) {
        columnTwoWidth = columnTwoWidth - diffMousePosition;
        columnThreeWidth = columnThreeWidth + diffMousePosition;

        for (const element of columnTwo) {
          element.style.width = columnTwoWidth + 'px';
          headerTwo.style.width = columnTwoWidth + 'px';
        }

        for (const element of columnThree) {
          element.style.width = columnThreeWidth + 'px';
          headerThree.style.width = columnThreeWidth + 'px';
        }
      }

      columnlineThree.onmouseup = null;
    }
  }

  columnlineFour.onmousedown = function(event) {
    columnlineFour.style.zIndex = 1000;
    document.body.append(columnlineFour);

    function moveToMouse(windowCoordinatesX) {
      columnlineFour.style.left = windowCoordinatesX - columnlineFour.offsetWidth / 2 + 'px';
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineFour.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      columnlineFour.onmouseup = null;
    }
  }

  columnlineFive.onmousedown = function(event) {
    columnlineFive.style.zIndex = 1000;

    document.body.append(columnlineFive);

    function moveToMouse(windowCoordinatesX) {
      columnlineFive.style.left = windowCoordinatesX - columnlineFive.offsetWidth / 2 + 'px';
    }

    moveToMouse(event.clientX);

    function onMouseMove(event) {
      moveToMouse(event.clientX);
    }

    document.addEventListener('mousemove', onMouseMove);

    columnlineFive.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      columnlineFive.onmouseup = null;
    }
  }
});
