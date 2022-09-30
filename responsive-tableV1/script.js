let oldWindowWidth = null;
let oldWindowHeight = null;
function changeTableSize() {
  let tableWidth = document.getElementById('body__table-id').offsetWidth;
  let widthSizeChangesPositively = oldWindowWidth < window.outerWidth;
  let widthSizeChangesNegatively = oldWindowWidth > window.outerWidth;
  let heightSizeChangesPositively = oldWindowHeight < window.outerHeight;
  let heightSizeChangesNegatively = oldWindowHeight > window.outerHeight;
  if (widthSizeChangesPositively && oldWindowWidth != null) {
    let tableWidth = document.getElementById('body__table-id').offsetWidth;
    let computedNewWidth = tableWidth + 100;
    let computedNewWidthToString = computedNewWidth.toString();
    let joinedStringForWidth = computedNewWidthToString + "px"
    document.getElementById('body__table-id').style.width = joinedStringForWidth;

    return;
  }
  else if (widthSizeChangesNegatively && oldWindowWidth != null) {
    let tableWidth = document.getElementById('body__table-id').offsetWidth;
    let computedNewWidth = tableWidth - 100;
    let computedNewWidthToString = computedNewWidth.toString();
    let joinedStringForWidth = computedNewWidthToString + "px"
    document.getElementById('body__table-id').style.width = joinedStringForWidth;

    return;
  }


  oldWindowWidth = window.outerWidth;
  oldWindowHeight = window.outerHeight;
}
