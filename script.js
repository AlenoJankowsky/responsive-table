function hideTableContents(className) {
  const allCellsInClass = document.getElementsByClassName(className);

  for (let cellIterator = 0; cellIterator < allCellsInClass.length; cellIterator++) {
    const contentIsVisible = allCellsInClass[cellIterator].style.visibility == '' || allCellsInClass[cellIterator].style.visibility == 'visible';

    if (contentIsVisible) {
      allCellsInClass[cellIterator].style.visibility = 'hidden';
    }
    else {
      allCellsInClass[cellIterator].style.visibility = 'visible';
    }
  }
}
