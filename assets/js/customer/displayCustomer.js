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

let oldData = []

$(document).ready(function() {
    setInterval(() => {
        readPassData()
        readEmailData()
    },100)
    
    displayAcc()
    getRole()


    $(document).on('click', '#myprofile', function () {
        $(location).attr('href', './profile.html')
    })

    $(document).on('click', '#editInfo', function () {
        $('.other-infos input').attr('disabled', function (_, attr) {return !attr})
        $('.saveInfo').attr('disabled', function (_, attr) {return !attr})
    })

    $(document).on('click', '#changepass', function() {
        $(location).attr('href', './changepass.html');
    })

    $(document).on('click', '#savePass', function() {
        if (checkUserData($('#oldpass').val(), $('#newpass').val(), $('#confirmnewpass').val())) {
            changeData($('#newpass').val());
        }
    })

    $(document).on('click', '#saveEmail', function() {
        if (checkUserData($('#oldemail').val(), $('#newemail').val(), $('#confirmnewemail').val())) {
            changeData($('#newemail').val());
        }
    })

    $(document).on('click', '#saveInfo', function () {
        if (!oldData.includes($('#address').val().toLowerCase())) {
            if (!oldData.includes($('#contact').val())){
                if (checkNumber($('#contact').val())) {
                    updateDetails();    
                } else {
                    toastr['error']('Invalid number')
                }
            } else {
                toastr['error']('Please change the value of the field')
            }
        } else {
            toastr['error']('Please change the value of the field')
        }
    })
})

var readPassData = () => {
    if ($('#oldpass').val() !== '') {
        if ($('#newpass').val() !== '') {
            if ($('#confirmnewpass').val() !== '') {
                $('.savePass').attr('disabled', false);
            } else {
                $('.savePass').attr('disabled', true);
            }
        } else {
            $('.savePass').attr('disabled', true);
        }
    } else {
        $('.savePass').attr('disabled', true);
    }
}

var readEmailData = () => {
    if ($('#oldemail').val() !== '') {
        if ($('#newemail').val() !== '') {
            if ($('#confirmnewemail').val() !== '') {
                $('.saveEmail').attr('disabled', false);
            } else {
                $('.saveEmail').attr('disabled', true);
            }
        } else {
            $('.saveEmail').attr('disabled', true);
        }
    } else {
        $('.saveEmail').attr('disabled', true);
    }
}


var changeData = (data) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'changeData',
            oldData: data,
        },
        success: (data) => {
            if (data === '200') {
                toastr['success']('Data Updated Successfully')
                $('#confirmnewpass').val('')
                $('#oldpass').val('')
                $('#newpass').val('')
                $('#oldemail').val('')
                $('#newemail').val('')
                $('#confirmnewemail').val('')
            } else {
                console.info(data)
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}
    })
}

var checkUserData = (oldData, newData, confirmNewData) => {
    let flag = false

    if (oldData !== '' && newData !== '' && confirmNewData !== ''){
        if (checkEmail(newData)) {
            if (checkOldData(oldData)) {
                if (newData === confirmNewData) {
                    flag = true
                } else {
                    toastr['error']('Data does not match')
                }
            } else {
                toastr['error']('Incorrect old data')
            }   
        } else {
            if (newData.length > 8) {
                if (checkOldData(oldData)) {
                    if (newData === confirmNewData) {
                        flag = true
                } else {
                    toastr['error']('Data does not match')
                }
            } else {
                toastr['error']('Incorrect old data')
            }
            } else {
                console.log(newData.length);
                toastr['error']('Data must be at least 8 characters')
            }
        }
    } else {
        toastr['error']('Data fields required')
    }

    return flag
}

var checkOldData = (oldData) => {
    let oldPassword = sessionStorage.getItem('customerPass')
    let oldEmail = sessionStorage.getItem('customerEmail')
    if (checkEmail(oldData)) {
        return (oldData === oldEmail) ? true : false;
    } else {
        return (oldData === oldPassword) ? true : false;
    }

}

var updateDetails = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'updateContactAndAddress',
            contactNumber: $('#contact').val(),
            address: $('#address').val().toLowerCase(),
        },
        success: (data) => {
            if (data === '200') {
                toastr['success']('Profile updated successfully')
                $('.other-infos input').attr('disabled', true)
                $('.saveInfo').attr('disabled', true)
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
    })
}



var displayAcc = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'displaySingleUser'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let fullname = document.querySelectorAll('#fullname');
                let userProfiles = document.querySelectorAll('.userProfile');

                dataJSON.forEach(element => {
                    $('#firstname').val(`${capitalized(element.firstname)}`)
                    $('#lastname').val(`${capitalized(element.lastname)}`)
                    $('#middleinitial').val(`${capitalized(element.midname)}`)
                    $('#email').val(`${element.email_add}`)
                    $('#address').val(`${transformWithWhiteSpace(element.address)}`)
                    $('#contact').val(`${capitalized(element.contact_no)}`)
                    oldData.push(element.address.toLowerCase(), element.contact_no)

                    for (let index = 0; index < fullname.length; index++) {
                        fullname[index].innerText = capitalized(element.lastname) +', '+ capitalized(element.firstname) +' '+ element.midname.charAt(0).toUpperCase() + '.'
                    }
                    for (let index = 0; index < userProfiles.length; index++) {
                        $(userProfiles[index]).attr('src', element.userprofile)
                    }
                    
                    $('#role').text(`${capitalized(element.role)}`)
                })
            } else {
                $(location).attr('href', '../../login.html');
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}
    })
}

var getRole = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getRole'
        },
        success: (data) => {
            if (data !== 'customer') {
                sessionStorage.clear()
                window.location.href = history.back()
            }
        }
    })
}



var checkJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}

var transformWithWhiteSpace = (data) => {
    let newData = ''
    if (data.indexOf(' ') >= 0) {
        let dataArray = data.split(' ')
        
        for (const key in dataArray) {
            newData += capitalized(dataArray[key]) + ' '
        }
    } else {
        newData = capitalized(data)
    }

    if (newData.charAt(newData.length) === ' ') {
        newData = newData.substring(0, newData.length - 1) + ''
    }

    return newData;
}

var capitalized = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}


var checkEmail = (email) => {
    var regexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    return regexp.test(email);
}

var checkNumber = (number) => {
    var regexp = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')

    return regexp.test(number)
}

