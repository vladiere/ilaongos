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
