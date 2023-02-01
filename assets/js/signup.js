$(document).ready(()=> {
    $(document).on('click', '#login', () => {
        if () {
            
        } else {
            
        }
    })
})



registerRequest = () => {
    $.ajax({
        type: 'POST',
        url: '../php/router.php',
        data: {
            choice: 'register',
            firtname: $('#firstname').val(),
            midname: $('#midname').val(),
            lastname: $('#lastname').val(),
            email: $('#emailadd').val(),
            role: $('#role').val()
        },
        success: (data) => {
            if (data === '200') {
                
            }
        }
    })
}