toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
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


$(document).ready(function() {
    displayEmployee()
    displayBranches()
    
    $(document).on('click', '.fireStaff', function () {
        swal({
            title: 'Remove Employee',
            text: 'Are you sure you want to remove this employee?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((e) => {
            if (e) {
                swal('Employee Remove', {
                    icon: 'success',
                }).then(() => {
                    removeOneStaff(this.id, 1)
                })
            }
        })
    })

    $(document).on('click', '#btnAddEmployee', function () {
        if (checkInputs()) {
            addEmployeeRequest()
        }
    })
})

let removeOneStaff = (staffID, status) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice:'removeEmployee',
            status: status,
            staffID: staffID
        },
        success: data => {
            if (data === '200') {
                toastr['success']('Employee deleted successfully')
                
                $('#tableStaff').load(location.href + ' #tableStaff')
                displayEmployee();
            } else {
                console.log(data);
            }
        }
    })
}

let displayEmployee = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'employeesList'
        },
        success: data => {
            if (checkDataJson(data)) {
                let dataJSON = JSON.parse(data)
                let employeeStr = ''
                let count = 1
                
                
                dataJSON.forEach(element => {
                    if (element.staff_status === '0') {
                        
                        employeeStr += `<tr>
                                            <td>${count}</td>
                                            <td>${capitalizedWord(element.shop_assign)}</td>
                                            <td>${capitalizedWord(element.firstname)} ${element.middlename.charAt(0).toUpperCase()}. ${capitalizedWord(element.lastname)}</td>
                                            <td>${element.date_of_birth}</td>
                                            <td>${element.email_address}</td>
                                            <td>${element.contact_number}</td>
                                            <td>${transformWordWithWhiteSpace(element.position)}</td>
                                            <td><input type="button" class="btn btn-danger fireStaff" id="${element.staff_id}" value="Remove"></td>
                                        </tr>`

                        count++
                    }
                })

                $('#tableStaff').append(employeeStr)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


let displayBranches = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getBranches'
        },
        success: data => {
            if (checkDataJson(data)) {
                let dataJSON = JSON.parse(data)
                dataJSON.forEach(element => {
                    if (element.branch_status === '0') {                        
                        const option = $('<option>')
                        option.val(`${element.branch_name}`)
                        option.text(`${transformWordWithWhiteSpace(element.branch_name)}`)
                        
                        $('#branchList').append(option)
                    }
                })
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


let addEmployeeRequest = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'addEmployee',
            assign: $('#branchList').val().toLowerCase(),
            firstname: $('#employeeFirstname').val().toLowerCase(),
            midname: $('#employeeMidname').val().toLowerCase(),
            lastname: $('#employeeLastname').val().toLowerCase(),
            birth_date: $('#employeeDOB').val(),
            email_add: $('#employeeEmail').val(),
            contact_no: $('#employeeContact').val(),
            position: $('#employeePosition').val().toLowerCase()
        },
        success: data => {
            if (data === '200') {
                toastr['success']('Employee regiemployeeStration successful')
                $('#branchList').val('')
                $('#employeeFirstname').val('')
                $('#employeeMidname').val('')
                $('#employeeLastname').val('')
                $('#employeeDOB').val('')
                $('#employeeEmail').val('')
                $('#employeeContact').val('')
                $('#employeePosition').val('')

                $('#tableStaff').load(location.href + ' #tableStaff')
                displayEmployee();
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, error) => {console.error(error);}
    })
}

let checkInputs = () => {
    let flag = false
    if ($('#employeeAssign').val() !== '' && $('#employeeFirstname').val() !== '' && $('#employeeMidname').val() !=='' && $('#employeeLastname').val() !== '' && $('#employeeDOB').val() !== '' && $('#employeeContact').val() !== '' && $('#employeeEmail').val() !== '' && $('#employeePosition').val() !== '') {
        if (checkEmployeeNumber($('#employeeContact').val())) {
            if (checkEmail($('#employeeEmail').val())) {
                flag = true;
            } else {
                toastr['error']('Employee email is not valid')
            }
        } else {
            toastr['error']('Employee Contact number is invalid')
        }
    } else {
        toastr['error']('All fields must be provided')
    }

    return flag
}

let checkDataJson = (data) => {
    try {
        JSON.parse(data)
        return true
    } catch (error) {
        return false
    }
}

let checkEmail = (email) => {
    var regexp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    return regexp.test(email);
}

let checkEmployeeNumber = (number) => {
    var regexp = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')

    return regexp.test(number)
}

let capitalizedWord = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}

var transformWordWithWhiteSpace = (data) => {
    let newData = ''
    if (data.indexOf(' ') >= 0) {
        let dataArray = data.split(' ')
        
        for (const key in dataArray) {
            newData += capitalizedWord(dataArray[key]) + ' '
        }
    } else {
        newData = capitalizedWord(data)
    }

    if (newData.charAt(newData.length) === ' ') {
        newData = newData.subemployeeString(0, newData.length - 1) + ''
    }

    return newData;
}