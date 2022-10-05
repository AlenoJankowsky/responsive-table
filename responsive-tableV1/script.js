let oldWindowWidth = null;
let oldWindowHeight = null;
function changeTableSize() {
  let tableWidth = document.getElementById('body__table-id').offsetWidth;
  let tableHeight = document.getElementById('body__table-id').offsetHeight;
  let widthSizeChangesPositively = oldWindowWidth < window.outerWidth;
  let widthSizeChangesNegatively = oldWindowWidth > window.outerWidth;
  let heightSizeChangesPositively = oldWindowHeight < window.outerHeight;
  let heightSizeChangesNegatively = oldWindowHeight > window.outerHeight;
  if (widthSizeChangesPositively && oldWindowWidth != null) {
    let computedNewWidth = tableWidth + 3;
    let computedNewWidthToString = computedNewWidth.toString();
    let joinedStringForWidth = computedNewWidthToString + "px";
    document.getElementById('body__table-id').style.width = joinedStringForWidth;
  }
  else if (widthSizeChangesNegatively && oldWindowWidth != null) {
    let computedNewWidth = tableWidth - 3;
    let computedNewWidthToString = computedNewWidth.toString();
    let joinedStringForWidth = computedNewWidthToString + "px";
    document.getElementById('body__table-id').style.width = joinedStringForWidth;
  }
  else if (heightSizeChangesPositively) {
    let computedNewHeight = tableHeight + 3;
    let computedNewHeightToString = computedNewHeight.toString();
    let joinedStringForHeight = computedNewHeightToString + "px";
    document.getElementById('body__table-id').style.height = joinedStringForHeight;
  }
  else if (heightSizeChangesNegatively) {
    let computedNewHeight = tableHeight - 3;
    let computedNewHeightToString = computedNewHeight.toString();
    let joinedStringForHeight = computedNewHeightToString + "px";
    document.getElementById('body__table-id').style.height = joinedStringForHeight;
  }

  oldWindowWidth = window.outerWidth;
  oldWindowHeight = window.outerHeight;
}
