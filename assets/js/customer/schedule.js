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

let dateToday

$(document).ready(function() {
    dateToday = new Date()

    transactionRequest()


    $(document).on('click', '#editSchedule', function(){
        $('#modal_body input').attr('disabled', function(_,attr) {return !attr});
    })

    $(document).on('click', '.cancelSched', function(){
        swal({
            title: 'Schedule',
            text: 'Are you sure you want to perform this Action?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then(willCancel => {
            if (willCancel) {
                cancelTransactionReq(this.id, 'cancelled')     
            } else {
                swal('Schedule safe!')
            }
        })
    })
    

    $(document).on('click', '.removeSched', function(){
        swal({
            title: 'Schedule',
            text: 'Are you sure you want to perform this Action?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then(willCancel => {
            if (willCancel) {
                cancelTransactionReq(this.id, 'removed')     
            } else {
                swal('Schedule safe!')
            }
        })
    })
    
})

const cancelTransactionReq = (trans_id, status) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'updateTransaction',
            trans_id: trans_id,
            newStatus: status
        },
        success: data => {
            if (data === '200') {
                location.reload()
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


const transactionRequest = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getTransactionsForCustomer'
        },
        success: data => {
            let dataJson = JSON.parse(data)
            let str = ''
            let count = 1
            let status = ''
            let dateStatus = ''
            let btnState = ''
            let totalPrice = 0
            dataJson.forEach(element => {
                if (element.trans_status !== 'cancelled' && element.trans_status !== 'dropped' && element.trans_status !== 'removed' && element.trans_status !== 'completed') {
                    
                    if (element.trans_status === '0') {
                        status = '<td style="color:green;background-color:aquamarine;">Pending...</td>'
                        btnState = `<td><button class="btn btn-sm btn-danger px-2 cancelSched" id="${element.trans_id}">Cancel</button></td>`
                    } else if (element.trans_status === 'accepted'){
                        status = '<td style="color: #113b11; background-color: #1ceb1c;">Accepted</td>'
                        btnState = `<td><button class="btn btn-sm btn-danger px-2 cancelSched" id="${element.trans_id}">Cancel</button></td>`
                    } else if (element.trans_status === 'declined') {
                        status = '<td style="color: #e7ae43; background-color: #ff0000;">Declined</td>'
                        btnState = `<td><button class="btn btn-sm btn-danger px-2 removeSched" id="${element.trans_id}">Remove</button></td>`
                        
                    }
                    const dateSched = element.date_sched.split(' ')
                    
                    if (dateToday < new Date(dateSched[0])) {
                        dateStatus = 'Ongoing'
                    } else {
                        dateStatus = 'Late'
                        btnState = `<td><button class="btn btn-sm btn-danger px-2 removeSched" id="${element.trans_id}">Remove</button></td>`
                    }

                    const dateChecked = element.date_added.split(' ')
                    const dateAccepted = element.date_updated.split(' ')
                    console.log(new Date(dateChecked[0]) < new Date(dateAccepted[0]));
                    
                    if (new Date(dateChecked[0]) < new Date(dateAccepted[0])) {
                        status = '<td style="color: #eee; background-color: #ff0000;">Late Accept</td>'
                        btnState = `<td><button class="btn btn-sm btn-danger px-2 cancelSched" id="${element.trans_id}">Cancel</button></td>`
                    }

                    str += `<tr>
                                <td>${count}</td>
                                <td>${transformWithWhiteSpace(element.carwash_name)}</td>
                                <td>${transformWithWhiteSpace(element.wash_type)}</td>
                                <td>${transformWithWhiteSpace(element.vehicle_type)}</td>
                                <td>${element.price}</td>
                                <td>${element.date_sched}</td>
                                <td>${dateStatus}</td>
                                ${status}
                                ${btnState}
                            </tr>`
                    
                    count++
                    totalPrice += element.price
                }
            })
            $('#totalPay').text(totalPrice)
            $('#schedTable').append(str)
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
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

var checkJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}

function onTimeChange() {
    var timeSplit = $('#setTime').val().split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return `${hours}:${minutes} ${meridian}`
  }


