function searchLocation() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchCarwash");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableShop");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those that don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3]; // we assume that the first cell is the item name
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
function searchHistory() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchHistory");
    filter = input.value.toUpperCase();
    table = document.getElementById("historyTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those that don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1]; // we assume that the first cell is the item name
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  