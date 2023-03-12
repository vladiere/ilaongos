$(document).ready(()=> {
    $(document).on('click', '#signupnow', () => {
        $(location).attr('href', './signup.html');
    })

    $(document).on('click', '#signup', () => {
        if (checkSignup()) {
            registerRequest();
        }
    })
})


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


checkSignup = () => {
    let flag = false;
    
    var regexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    if ($('#firstname').val() != '' && $('#lastname').val() != '' && $('#midname').val() != '' && $('#emailadd').val() != '' && $('#password').val() != '' && $('#confirmpass').val() != ''){
        if (regexp.test($('#emailadd').val())) {
            if ($('#password').val() === $('#confirmpass').val()) {
                if ($('#role').val() != 0) {
                    flag = true;
                } else {
                    toastr["error"]("Please accept the User Agreement")
                }
            } else {
                toastr["error"]("Password does not match")
            }
        } else {
            toastr["error"]("Email is invalid")
        }
    } else {
        toastr["error"]("All fields are required")
    }

    return flag;
}

registerRequest = () => {
    $.ajax({
        type: 'POST',
        url: 'assets/php/router.php',
        data: {
            choice: 'register',
            firstname: $('#firstname').val().toLowerCase(),
            midname: $('#midname').val().toLowerCase(),
            lastname: $('#lastname').val().toLowerCase(),
            email: $('#emailadd').val(),
            password: $('#password').val(),
            role: $('#role').val()
        },
        success: (data) => {
            if (data === '200') {
                $(location).attr('href','./login.html')
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}
    })
}