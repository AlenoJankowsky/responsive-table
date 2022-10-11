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
  console.log(currentColumnOffSetRight);
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
  }
}

