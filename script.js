var contentIsShown = true;
function hideTableContents() {
  const firstColumn = document.getElementById('first-column');
  const allCells = firstColumn.querySelectorAll('td');
  if (contentIsShown) {
    for (let cellIterator = 0; cellIterator < allCells.length; cellIterator++) {
      allCells[cellIterator].style.visibility = 'hidden';
    }

    contentIsShown = false;

    return;
  }
  else if (!contentIsShown) {
    for (let cellIterator = 0; cellIterator < allCells.length; cellIterator++) {
      allCells[cellIterator].style.visibility = 'visible';
    }

    contentIsShown = true;

    return;
  }
}