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
    displayTablePriceList()
    getAllTransactions()

    $(document).on('click', '.editlist', function () {
        var curRow = $(this).closest('tr')
        var serveNum = curRow.find('td:eq(0)').text()
        $('#serviceTitle').text('Service #' + serveNum)
        $('.updatelist').attr('id', this.id)
    })

    $(document).on('click', '#btnAddService', function () {
        if ($('#newServiceType').val() !== '0' && $('#newCarType').val() !== '0') {
            if ($('#newPrice').val() !== '') {
                addNewPriceList()
            } else {
                toastr['error']('Please set a price')
            }
        } else {
            toastr['error']('Please select a service type and a car type')
        }
    })

    $(document).on('click', '.updateThis', function () {
        var dataArr = [$(this).closest('tr').find('td:eq(1)').text(), $(this).closest('tr').find('td:eq(2)').text(), $(this).closest('tr').find('td:eq(3)').text()];
        
        $('#serviceType').val(dataArr[0])
        $('#carType').val(dataArr[1])
        $('#price').val(dataArr[2])
        
        $('.updatelist').attr('id', this.id)
        
    })

    $(document).on('click', '.updatelist', function () {
        if ($('#price').val() !== '') {
            updateListTable($('#price').val(), this.id)
        }
    })

    $(document).on('click', '.deletePriceList', function () {
        deletePriceList(this.id)
    })
})


let deletePriceList = (listID) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'deletePriceList',
            listID: listID
        },
        success: data => {
            if (data === '200') {
                delayForaSecond()
                
                $('#tablePriceList').load(location.href + ' #tablePriceList')
                displayTablePriceList()
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, error) => {console.error(error);}
    })
}

let updateListTable = (price, listID) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'updatePriceList',
            price: price,
            listID: listID,
        },
        success: (data) => {
            if (checkJson(data)) {
                if (data === '200') {
                    toastr['success']('New Service added successfully')
                    $('#ServiceType').val('')
                    $('#CarType').val('')
                    $('#Price').val('')

                    $('#editModal').modal('hide')
                    delayForaSecond()
                    $('#tablePriceList').load(location.href + ' #tablePriceList')
                    displayTablePriceList()
                } else {
                    console.log(data);
                }
            } else {
                console.log(data);
            }   
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

let getAllTransactions = () => {
    setInterval(() => {
        $.ajax({
            type: 'POST',
            url: '../../assets/php/router.php',
            data: {
                choice: 'getTransactions'
            },
            success: data => {
                if (checkJson(data)) {
                    let dataJSON = JSON.parse(data)
                    let pendings = 0
                    let customers = 0
                    let completed = 0
                    let income = 0
                    dataJSON.forEach(element => {
                        
                        if (element.trans_status === 'completed') {
                            income += parseInt(element.price)
                            completed++
                        } else if (element.trans_status === '0') {
                            customers++
                        } else if (element.trans_status === 'accepted') {
                            pendings++
                        }
                        
                        $('#completed').text(completed)
                        $('#pendings').text(pendings)
                        $('#customers').text(customers)
                        $('#income').text(income)
                    })
                } else {
                    console.log(data);
                }
            },
            error: (xhr,ajaxOptions, error) => {console.error(error);}
        })
    }, 300)
}

let addNewPriceList = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'addNewPriceList',
            wash_type: $('#newServiceType').val().toLowerCase(),
            car_type: $('#newCarType').val().toLowerCase(),
            price: $('#newPrice').val()
        },
        success: (data) => {
            if (checkJson(data)) {
                if (data === '200') {
                    toastr['success']('New Service added successfully')
                    $('#newServiceType').val().toLowerCase('')
                    $('#newCarType').val().toLowerCase('')
                    $('#newPrice').val('')

                    $('#addModal').modal('hide')
                    delayForaSecond()
                    $('#tablePriceList').load(location.href + ' #tablePriceList')
                    displayTablePriceList()
                } else {
                    // window.location.href = '../../login.html'
                }
            } else {
                console.log(data);
            }
                
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

let displayTablePriceList = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'pricelist'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let str = ''
                let count = 1
                
                dataJSON.forEach(element => {
                    str += `
                        <tr>
                            <td>${count}</td>
                            <td>${transformWithWhiteSpace(element.wash_type)}</td>
                            <td>${transformWithWhiteSpace(element.vehicle_type)}</td>
                            <td id="${element.id}">${element.price}</td>
                            <td><button class="btn btn-sm btn-success px-2 updateThis" data-bs-toggle="modal"
                            data-bs-target="#editModal" id="${element.id}">Update Price</button></td>
                            <td><button class="btn btn-sm btn-danger px-2 deletePriceList" id="${element.id}">Delete</button></td>
                        </tr>
                    `
                    count++;
                })
                delayForaSecond()

                $('#tablePriceList').append(str)
            } else {
                sessionStorage.clear()
                window.location.href = '../../assets/404/error.html'
            }
        },
        error: (xhr,ajaxOptions, errThrown) => {console.log(errThrown);}
    })
}

checkJson = (dataJson) => {
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

const delay = ms => new Promise((resolve => setTimeout(resolve, ms)))

const delayForaSecond = async () => {
    await delay(1500)
}

capitalized = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}