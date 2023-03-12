$('#logout').click(() => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'logout',
        },
        success: (data) => {
            console.log(data);
            if (data === '200') {
                sessionStorage.clear()
                $(location).attr('href', '../../login.html')
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}
    
    })
})


window.addEventListener("popstate", function() {
    // if the user clicks the previous button
    if (window.location.pathname.includes("index.html") || window.location.pathname.includes("changePass.html") || window.location.pathname.includes("history.html") || window.location.pathname.includes("profile.html") || window.location.pathname.includes("schedule.html") || window.location.pathname.includes("shop.html") || window.location.pathname.includes("branches.html") || window.location.pathname.includes("business.html") || window.location.pathname.includes("customer.html") || window.location.pathname.includes("employee.html") || window.location.pathname.includes("bannedacc.html") || window.location.pathname.includes("customerlist.html") || window.location.pathname.includes("details.html") || window.location.pathname.includes("ownerlist.html") || window.location.pathname.includes("pending.html")) {
      // redirect to the login page
      window.location.href = "../../login.html";
    }
});