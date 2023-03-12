toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}


// toastr["error"]("Please accept the User Agreement")





$(document).ready(() => {
    $(document).on('click', '#login', () => {
        if (checkLogin()) {
            loginRequest()
        }
    })

    $(document).on('keypress', '#emailadd', (e) => {
        if (e.key === 'Enter') {
            if (checkLogin()) {
                loginRequest()
            }
        }
    })
    
    $(document).on('keypress', '#password', (e) => {
        if (e.key === 'Enter') {
            if (checkLogin()) {
                loginRequest()
            }
        }
    })

})

loginRequest = () => {
    $.ajax({
        type: 'POST',
        url: 'assets/php/router.php',
        data: {
            choice: 'login',
            email: $('#emailadd').val(),
            password: $('#password').val()
        },
        success: (data) => {
            console.log(data.toString());
            if (data === 'owner') {
                sessionStorage.setItem('ownerPass', $('#password').val())
                sessionStorage.setItem('ownerEmail', $('#emailadd').val())
                $(location).attr('href', './panel/owner')
            } else if (data === 'admin') {
                sessionStorage.setItem('adminPass', $('#password').val())
                sessionStorage.setItem('adminEmail', $('#emailadd').val())
                $(location).attr('href', './panel/admin')
            } else if (data === 'customer') {
                sessionStorage.setItem('customerPass', $('#password').val())
                sessionStorage.setItem('customerEmail', $('#emailadd').val())
                $(location).attr('href', './panel/customer')
            } else if (data === '401') {
                toastr['error']('This account is banned from Admin')
            } else {
                toastr['error']('Email or password incorrect')
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}

    })
}

checkLogin = () => {
    var flag = false;
    
    var regexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if ($('#emailadd').val() != '' && $('#password').val() != '') {
        if (regexp.test($('#emailadd').val())) {
            flag = true;    
        } else {
            toastr["error"]("Invalid email address")
        }
    } else {
        toastr["error"]("All fields must be valid")
    }

    return flag;

}

