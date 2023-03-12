$(document).ready(() => {
    displayAdmin();
    displayPendings();

    $(document).on('click', '#changePass', function () {
        if (checkUserData($('#oldpass').val(), $('#newpass').val(), $('#confirmnewpass').val())) {
            changeData($('#newpass').val())
        }
    })

    $(document).on('click', '#changeEmail', function () {
        if (checkUserData($('#oldemail').val(), $('#newemail').val(), $('#confirmnewemail').val())) {
            changeData($('#newemail').val())
        }
    })

    $(document).on('click', '#editacc', function () {
        $('#otherInfo input').attr('disabled', function (_, attr) {return !attr})
        $('#saveacc').attr('disabled', function (_, attr) {return !attr})
    })

    $(document).on('click', '#saveacc', function () {
        if ($('#contactNum').val() !== '' && $('#addresses').val() !== '') {
            if (checkNumber($('#contactNum').val())) {
                editRequest();    
            } else {
                toastr['error']('Please enter a valid number')
            }
        } else {
            toastr['error']('Please enter your credentials')
        }
    })

})


editRequest = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'updateContactAndAddress',
            contactNumber: $('#contactNum').val(),
            address: $('#address').val()
        },
        success: (data) => {
            if (data === '200') {
                toastr['success']('Details updated successfully')
                $('#otherInfo input').attr('disabled', true)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
    })
}


changeData = (data) => {
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


toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
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



checkUserData = (oldData, newData, confirmNewData) => {
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

checkOldData = (oldData) => {
    let oldPassword = sessionStorage.getItem('adminPass')
    let oldEmail = sessionStorage.getItem('adminEmail')
    if (checkEmail(oldData)) {
        return (oldData === oldEmail) ? true : false;
    } else {
        return (oldData === oldPassword) ? true : false;
    }

}

let checkEmail = (email) => {
    var regexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    return regexp.test(email);
}

let checkNumber = (number) => {
    var regexp = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')

    return regexp.test(number)
}

checkJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}


capitalized = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}



