let accEmail;

$(document).ready(function () {
    $('#confirmOtp').val('');

    $(document).on('click', '#send', () => {
        if ($('#email').val() !== '') {
            if (checkEmail($('#email').val())) {
                functionRequest()
            } else {
                swal({
                    text: 'Invalid Email address',
                    icon: 'error',
                    buttons: 'OK',
                })
            }
        } else {
            swal({
                text: 'Please enter your email address',
                icon: 'error',
                buttons: 'OK',
            })
        }
    })
    
    $(document).on('click', '#verify', function () {
        if ($('#confirmOtp').val() !== '') {
            if ($('#confirmOtp').val() === otpBody) {
                $('#recoveryOptions').addClass('d-none')
                $('#changeMyPass').removeClass('d-none')
            } else {
                swal({
                    text: 'Your OTP Code is incorrect',
                    icon: 'error',
                    buttons: 'Again',
                })
            }
        } else {
            swal({
                text: 'Please enter your OTP Code',
                icon: 'error',
                buttons: 'OK',
            })
        }
    })

    $(document).on('click', '#recover', function () {
        if (passwordChecker()) {
            changePassRequest()
        }
    })
})

let generateOtp = () => {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 8; i++) {
        OTP += digits[Math.floor(Math.random() * 10)]
    }

    return OTP;
}

let otpBody = generateOtp()


let functionRequest = () => {
    $.ajax({
        type: "POST",
        url: 'send.php',
        data: {
            email: $('#email').val(),
            otp: otpBody
        },
        success: data => {
            if (data === '200') {
                swal({
                    text: 'OTP sent successfully',
                    icon: 'success',
                    buttons: 'OK',
                })
                .then(() => {
                    accEmail = $('#email').val();
                    $('#recoverEmail').addClass('d-none');
                    $('#sendOtp').addClass('d-none');
                    $('#recoverOtp').removeClass('d-none');
                    $('#accRecover').removeClass('d-none');
                    $('#otptimer').removeClass('d-none');
                    otpTimer()
                    $('#email').val('')
                })
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, error) => {console.error(error);}
    })
}

let otpTimer = () => {
    var timeLeft = 120; // time in seconds
    var countdown = document.getElementById("timer");

    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function tick() {
        timeLeft--;
        countdown.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerId);
            countdown.textContent = "";
            swal({
                title: 'OTP Code Expired',
                text: 'You time is up your OTP Code Expired',
                icon: 'warning',
                buttons: 'Request Again'
            })
            .then(() => {
                $('#recoverEmail').removeClass('d-none');
                $('#sendOtp').removeClass('d-none');
                $('#recoverOtp').addClass('d-none');
                $('#accRecover').addClass('d-none');
                $('#otptimer').addClass('d-none');
            })
        }
    }

    var timerId = setInterval(tick, 1000);
}

let changePassRequest = () => {
    $.ajax({
        type: 'POST',
        url: '../assets/php/router.php',
        data: {
            choice: 'recoverAccountPassword',
            newPassword: $('#newPassword').val(),
            recoveryEmail: accEmail,
        },
        success: data => {
            if (data === '200') {
                swal({
                    title: 'Account Recovered Success',
                    text: 'Your account was successfully recovered you can login now',
                    icon: 'success',
                    buttons: 'Login Now'
                })
                .then(() => {
                    document.location.href = '../login.html'
                })
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

var passwordChecker = () => {
    let flag = false;

    if ($('#newPassword').length < 8) {
        $('#newPassword').removeClass('is-invalid')
        if ($('#confirmNewPassword').val() === $('#newPassword').val()) {
            flag = true;
        } else {
            $('#errorConfirm').text('Confrim Password does not match')
            $('#confirnNewPassword').addClass('is-invalid')
        }    
    } else {
        $('#errorPass').text('Password must be at least 8 characters long')
        $('#newPassword').addClass('is-invalid')
    }

    return flag;
}

var checkEmail = (email) => {
    var regexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    return regexp.test(email);
}
