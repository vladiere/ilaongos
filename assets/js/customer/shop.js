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


$(document).ready(() => {
    displayCarwashShop();
    
    $(document).on('click', '.viewDetails', function () {
        $('#shoplistTable').addClass('d-none')
        const idAndName = this.id.split('-')
        $('#shopOrBranchName').text(idAndName[1])
        ownerPriceList(idAndName[0])
    })
    
    $(document).on('click', '#back', function () {
        $('#priceTable').addClass('d-none')
        $('#shoplistTable').removeClass('d-none')
    })

    $(document).on('click', '.editlist', function (e) {
        var currRow = $(this).closest("tr");
        var dataTable = [ currRow.find("td:eq(1)").text(), currRow.find("td:eq(2)").text(), currRow.find("td:eq(3)").text() ]
        $('#serveCarType').val(dataTable[1])
        $('#serveWashType').val(dataTable[0])
        $('#servePrice').val(dataTable[2])
    })

    $(document).on('click', '.setSched', function () {
        const dateToday = new Date()

        if ($('#setDate').val() !== '' && $('#setTime').val() !== '') {
            const dateToCheck = new Date($('#setDate').val())
            if (dateToCheck > dateToday.getTime()) {
                setTransaction(this.id)
            } else {
                toastr['error']('You set an invalid date schedule')
            }
        } else {
            toastr['error']('Please select a date and time to schedule your cleanup')
        }
    })
})


let displayCarwashShop = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'displayShop'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let tableStr = ''
                let ctr = 1
                dataJSON.forEach(element => {

                    if (element.status == 0) {
                        tableStr += `
                                    <tr>
                                        <td>${ctr}</td>
                                        <td>${element.shop_name}</td>
                                        <td>${capitalized(element.firstname)} ${capitalized(element.lastname)} ${element.midname.charAt(0).toUpperCase()}.</td>
                                        <td>${capitalized(element.location)}</td>
                                        <td>${element.date_publish}</td>
                                        <td><button class="btn btn-sm btn-outline-info px-5  viewDetails" id="${element.owner_id}-${element.shop_name}">Price List</button></td>
                                    </tr>
                        `
                        ctr++
                    }
                });

                $('#tableShop').append(tableStr)
                displayBranchShop(ctr)
            } else {
                $(location).attr('href', '../../index.html');
            }            
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}

    })
}

let displayBranchShop = (ctr) => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'branchShop'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);

                let tableStr = ''
                dataJSON.forEach(element => {

                    if (element.branch_status == 0) {
                        tableStr += `
                                    <tr>
                                        <td>${ctr}</td>
                                        <td>${element.branch_name}</td>
                                        <td>${capitalized(element.firstname)} ${capitalized(element.lastname)} ${element.midname.charAt(0).toUpperCase()}.</td>
                                        <td>${capitalized(element.branch_location)}</td>
                                        <td>${element.date_publish}</td>
                                        <td><button class="btn btn-sm btn-outline-info px-5  viewDetails" id="${element.owner_id}-${element.branch_name}">Price List</button></td>
                                    </tr>
                        `
                        ctr++
                    }
                });
                $('#tableShop').append(tableStr)

            } else {
                $(location).attr('href', '../../index.html');
            }            
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}

    })
}

let ownerPriceList = (ownerID) => {
    $('#priceTable').removeClass('d-none')
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'pricelistForCustomer'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data)
                let str = ''
                let count = 1
                dataJSON.forEach(element => {
                    if (ownerID == element.user_id) {
                        str += `<tr>
                                    <td>${count}</td>
                                    <td>${transformWithWhiteSpace(element.wash_type)}</td>
                                    <td>${transformWithWhiteSpace(element.vehicle_type)}</td>
                                    <td>${element.price}</td>
                                    <td><button class="btn btn-sm btn-success px-5 editlist" id="${element.id}" data-bs-toggle="modal"  data-bs-target="#scheduleModal">Select</button></td>
                                </tr>`
                        count++;
                        $('.setSched').attr('id', ownerID)
                    }
                })
                $('#tablePriceList').empty()
                $('#tablePriceList').append(str)

            } else {
                console.table(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

let setTransaction = (ownerID) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'setTransaction',
            ownerID: ownerID,
            shop_name: $('#shopOrBranchName').text().toLowerCase(),
            vehicle_type: $('#serveCarType').val().toLowerCase(),
            wash_type: $('#serveWashType').val().toLowerCase(),
            price: $('#servePrice').val(),
            schedDate: $('#setDate').val() + ' ' + onTimeChange()

        },
        success: data => {
            if (checkJson(data)) {
                if (data === '200') {
                    toastr['success']('Schedule date set successfully')
                    $('#mainAndBranches').val(0)
                    $('#setDate').val('')
                    $('#setTime').val('')
                    $('#scheduleModal').modal('hide')
                }
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

let getShopProfile = (ownerID) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getProfile'
        },
        success: data => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let str = ''
                dataJSON.forEach(element => {
                    if (ownerID == element.user_id) {
                        $('#ownerProfile').attr('src', `../../assets/php/${element.profile_path}`)
                    }
                })
            } else {
                console.table(data)
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


let capitalizedWord = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}


var transformWithWhiteSpace = (data) => {
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

checkJson = (dataJson) => {
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
