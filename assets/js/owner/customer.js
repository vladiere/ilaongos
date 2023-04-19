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
    customerQueue()
    displayEmployee()

    $(document).on('click', '.viewDetails', function () {
        customerWashDetails(this.id)
    })

    $(document).on('click', '.declineQueue', function () {
        acceptCustomerQueue(this.id, 'declined')
    })

    $(document).on('click', '.acceptQueue', function () {
        console.log($('#ownerStaff').val())
        if ($('#ownerStaff').val() != 0) {
            acceptCustomerQueue(this.id, 'accepted', $('#ownerStaff').val())
        } else {
            toastr['error']('Please select a staff to take charge')
        }
    })
})

var acceptCustomerQueue = (trans_id, status, staff_id) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'updateTransaction',
            trans_id: trans_id,
            newStatus: status,
            staff_id: staff_id,
        },
        success: data => {
            if (data === '200') {
                $('#ownerStaff').val(0)
                $('#detailsModal').modal('hide')
                toastr['success']('Pending Accepted')
                $('#customerTable').load(location.href + ' #customerTable')
                customerQueue()
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
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
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data)
                
                dataJSON.forEach(element => {
                    if (element.staff_status === '0') {
                        $('<option>').val(`${element.staff_id}`).text(`${transformWithWhiteSpace(element.staff_firstname)} ${element.staff_middlename.charAt(0).toUpperCase()}. ${transformWithWhiteSpace(element.staff_lastname)}`).appendTo('#ownerStaff')
                    }
                })
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


var customerWashDetails = (trans_id) => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'getCustomerQueue'
        },
        success: data => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data)

                dataJSON.forEach(element => {
                    if (trans_id == element.trans_id) {
                        $('.acceptQueue').attr('id', `${element.trans_id}`)
                        $('.declineQueue').attr('id', `${element.trans_id}`)
                        
                        $('#carType').val(transformWithWhiteSpace(element.vehicle_type))
                        $('#washType').val(transformWithWhiteSpace(element.wash_type))
                        $('#pricePay').val(element.price)
                    }
                })

            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

var customerQueue = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'getCustomerQueue'
        },
        success: data => {
            console.table(data)
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data)
                let str = ''
                let count = 1
                let status = ''
                let state = ''
                let dateToday = new Date()
                dataJSON.forEach(element => {
                    if (element.trans_status !== 'dropped' && element.trans_status !== 'removed' && element.trans_status !== 'completed') {
                        if (element.trans_status === '0') {
                            status = '<td style="color: #0b6a0b; background-color: #51e551;">Pending...</td>'
                            state = ''
                        } else if (element.trans_status === 'accepted') {
                            status = '<td style="color: #113b11; background-color: #1ceb1c;">Accepted</td>'
                            state = 'disabled'
                        } else if (element.trans_status === 'declined') {
                            status = '<td style="color: #e7ae43; background-color: #ff0000;">Declined</td>'
                            state = 'disabled'
                        } else if (element.trans_status === 'cancelled') {
                            status = '<td style="color: gray; background-color: red;">Cancelled</td>'
                            state = 'disabled'
                        }
                        const dateToCheck = element.date_sched.split(' ')
                        
                        if (dateToday < dateToCheck[0]) {
                            status = '<td style="color: #eee; background-color: green;">Late Accept</td>'
                        }
    
                        str += `<tr>
                                    <td>${count}</td>
                                    <td>${transformWithWhiteSpace(element.carwash_name)}</td>
                                    <td>${transformWithWhiteSpace(element.firstname)} ${transformWithWhiteSpace(element.lastname)}</td>
                                    <td>${transformWithWhiteSpace(element.address)}</td>
                                    <td>${element.date_sched}</td>
                                    ${status}
                                    <td><button class="btn btn-sm btn-success px-5 viewDetails" id="${element.trans_id}" ${state} data-bs-toggle="modal" data-bs-target="#detailsModal">View</button></td>
                                </tr>`
                        if (state == 1) {
                            $(`#${element.trans_id}`).attr("disabled", true);
                        }
                        count++;
                    }
                })


                $('#customerTable').append(str)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


capitalized = (data) => {
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

checkJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}