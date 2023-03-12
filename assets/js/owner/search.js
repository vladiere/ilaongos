function searchShop() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchStaff");
    filter = input.value.toUpperCase();
    table = document.getElementById("customerTable");
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
  
function searchEmployee() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchStaff");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableStaff");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those that don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2]; // we assume that the first cell is the item name
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
  
  
function searchShop() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchStaff");
    filter = input.value.toUpperCase();
    table = document.getElementById("customerTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those that don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2]; // we assume that the first cell is the item name
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
  
function searchSchedule() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchStaff");
    filter = input.value.toUpperCase();
    table = document.getElementById("dateAndTime");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those that don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2]; // we assume that the first cell is the item name
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
    input = document.getElementById("searchStaff");
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
  
  
function searchBranch() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchStaff");
    filter = input.value.toUpperCase();
    table = document.getElementById("branchTable");
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
  