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


let checkSignup = () => {
    let flag = false;

    if ($('#firstname').val() != '' && $('#lastname').val() != '' && $('#midname').val() != '' && $('#emailadd').val() != '' && $('#password').val() != '' && $('#confirmpass').val() != ''){
        if (validateEmail($('#emailadd').val())) {
            if ($('#password').val() === $('#confirmpass').val()) {
                if ($('#role').val() != 0) {
                    if ($('#password').length < 8 && $('#confirmpass').length < 8) {
                        if ($('#inlineCheckbox1').is(":checked")) {
                            flag = true;
                        } else {
                            toastr["error"]("Please accept the user agreement")
                        }
                    } else {
                        console.error($('#password').length < 8 && $('#confirmpass').length < 8);
                        toastr["error"]("Passwords must be at least 8 characters")
                    }
                } else {
                    toastr["error"]("Please select your purpose")
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


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

let registerRequest = () => {
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
            } else {
                if (data.indexOf("1062 Duplicate entry") === 49) {
                    toastr['error']('Email already in use')
                } else {
                    console.error(data);
                }    
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.error(errThrown);}
    })
}