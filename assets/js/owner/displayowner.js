$(document).ready(function() {
    displayOwner()
    getRole()
    getProfile()
    
    $(document).on('click', '#changepass', function () {
        $(location).attr('href', './changePass.html')
    })

    $(document).on('click', '#btnAddBranch', function () {
        if ($('#branchName').val() !== '' && $('#branchLocation').val() !== '') {
            addNewBranches();
        } else {
            toastr['error']('Add your branch name and location')
        }
    })

    $(document).on('click', '#myprofile', function () {
        $(location).attr('href', './business.html')
    })

    let oldValueAddress;
    let oldValueContact;

    $(document).on('click', '#saveEdit', function () {
        if ($('#contact').val() !== '' && $('#address').val() !== '') {
            if (checkNumber($('#contact').val())) {
                if (oldValueAddress === $('#address').val()) {
                    swal({
                        title: "Same old data?",
                        text: "Do you not want to change your address?",
                        icon: "warning",
                        buttons: {
                            cancel: 'Yes',
                            confirm: 'No'
                        },
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            if (oldValueContact === $('#contact').val()) {
                                swal({
                                    title: "Same old Contact Number?",
                                    text: "Do you not want to change your contact number?",
                                    icon: "warning",
                                    buttons: {
                                        cancel: 'Yes',
                                        confirm: 'No'
                                    },
                                    dangerMode: true,
                                })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        updateDetails();
                                    } else {
                                    swal("Then please change your Contact Number!");
                                    }
                                });
                            } else {
                                if (oldValueAddress === $('#address').val()) {
                                    swal({
                                        title: "Same old contact Address?",
                                        text: "Do you not want to change your contact Address?",
                                        icon: "warning",
                                        buttons: {
                                            cancel: 'Yes',
                                            confirm: 'No'
                                        },
                                        dangerMode: true,
                                    })
                                    .then((willDelete) => {
                                        if (willDelete) {
                                            updateDetails();
                                        } else {
                                        swal("Then please change your Contact Address!");
                                        }
                                    });
                                } else {
                                    updateDetails()
                                }
                            }
                        } else {
                            swal("Then please change your address!");
                        }
                    });
                } else {
                    if (oldValueContact === $('#contact').val()) {
                        swal({
                            title: "Same old Contact Number?",
                            text: "Do you not want to change your contact number?",
                            icon: "warning",
                            buttons: {
                                cancel: 'Yes',
                                confirm: 'No'
                            },
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                updateDetails();
                            } else {
                                swal("Then please change your Contact Number!");
                            }
                        });
                    } else {
                        updateDetails()
                    }
                }
            } else {
                toastr['error']('Please enter a valid contact number')
            }
        } else {
            toastr['error']('Please enter your contact details')
        }
    })

    $(document).on('click', '#changeEdit', function () {
        if ($('#needtoedit input').attr('disabled')) {
            $('#saveEdit').removeClass('d-none')
        } else {
            $('#saveEdit').addClass('d-none')
        }
        $('#needtoedit input').attr('disabled', function (_, attr) {return !attr})
    })

})

let getRole = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getRole'
        },
        success: (data) => {
            if (data !== 'owner') {
                sessionStorage.clear()
                window.location.href = history.back()
            }
        }
    })
}

let ownerID;
let ownerStatus;


let displayOwner = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'displaySingleUser',
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let fullname = document.querySelectorAll('#fullname');
                
                dataJSON.forEach(element => {
                    
                    if (element.role === 'owner') {
                        ownerID = element.id
                        ownerStatus = element.status

                        for (let index = 0; index < fullname.length; index++) {
                            fullname[index].innerText = capitalized(element.lastname) +', '+ capitalized(element.firstname) +' '+ element.midname.charAt(0).toUpperCase() + '.'
                        }

                        $('#role').text(`${capitalized(element.role)}`)

                        $('#firstname').val(capitalized(element.firstname))
                        $('#lastname').val(capitalized(element.lastname))
                        $('#middleinitial').val(capitalized(element.midname))
                        $('#address').val(capitalized(element.address))
                        oldValueAddress = element.address.toLowerCase()
                        $('#contact').val(capitalized(element.contact_no))
                        oldValueContact = element.contact_no
                        $('#email').val(element.email_add)

                        checkOwnerStatus(ownerStatus)
                    }
                });
            } else {
                $(location).attr('href', '../../login.html');
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}
        
    })
}



let checkOwnerStatus = (status) => {
    if (status != 0) {
        $('#btn-addBranch').attr('disabled', true)
        $('#btn-add').attr('disabled', true)
        $('body').prepend(`<div class="fixed-top bg-danger text-center opacity-75">
                                <h6>Please Verify your account <a href="./business.html">Click Here to Verify</a> </h6>
                            </div>`)
                            
    }
}

let updateDetails = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'updateContactAndAddress',
            contactNumber: $('#contact').val(),
            address: $('#address').val(),
        },
        success: (data) => {
            if (data === '200') {
                toastr['success']('Profile updated successfully')
                $('#needtoedit input').attr('disabled', true)
                $('#saveEdit').addClass('d-none')
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
    })
}

let getProfile = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getProfile'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                dataJSON.forEach(element => {
                    if (ownerID === element.user_id && ownerID === element.owner_id) {
                        if (element.status === 0) {
                            $('#accountStatus').append('<mark class="bg-danger">Pending</mark>');
                        }
                        $('#carwashname').val(`${transformWithWhiteSpace(element.shop_name)}`)
                        $('#ownerProfile').attr('src', `../../assets/php/${element.profile_path}`)
                    }
                });
            } else {
                console.table(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


let addNewBranches = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'addBranch',
            branch_name: $('#branchName').val().toLowerCase(),
            location: $('#branchLocation').val().toLowerCase()
        },
        success: data => {
            if (data === '200') {
                toastr['success']('Adding branch successfully')
                $('#branchName').val('')
                $('#branchLocation').val('')
            } else {
                console.log(data);
            }
        }
    })
}


let checkJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}

let checkNumber = (number) => {
    var regexp = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')

    return regexp.test(number)
}

let capitalized = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
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