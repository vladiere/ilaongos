toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
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
    displayCustomerList()
    

    $(document).on('click', '.btnBan', function () {
        banUser(this.id, 1)
    })

})



banUser = (id, stat) => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'banUser',
            userID: id,
            status: stat
        },
        success: (data) => {
            if (data === '200') {
                $('#tableCustomer').load(location.href + ' #tableCustomer')
                displayCustomerList()
            } else {
                toastr['error']('Something went wrong')
            }
        },
        error: (xhr, ajaxOptions, error) => {console.log(error);}
    })
}


let displayCustomerList = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'displayUsers',
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let str = ''
                let ctr = 1
                
                dataJSON.forEach(element => {
                    if (element.role === 'customer' && element.status == 0) {
                        str += '<tr>'+
                                '<td>'+ ctr +'</td>'+
                                '<td>'+ capitalized(element.lastname) +', '+ capitalized(element.firstname) +' '+ element.midname.charAt(0) +'.</td>'+
                                '<td>'+ element.address +'</td>'+
                                '<td>'+ element.date_created +'</td>'+
                                '<td><button class="btn btn-sm btn-danger px-5 btnBan" id="'+ element.id +'">Ban</button></td>' +
                            '</tr>'
                        ctr++
                    }
                });

                $('#tableCustomer').append(str)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
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


capitalized = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}
