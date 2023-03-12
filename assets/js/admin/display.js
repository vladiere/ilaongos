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
    displayAdmin();
    displayPendings();
    getRole();

    $(document).on('click', '#myprofile', function () {
        $(location).attr('href', '../../panel/admin/profile.html')
    })

    $(document).on('click', '.view', function () {
        displayPendingDetails(this.id)
        getDocuments(this.id)
    })

    $(document).on('click', '.accept', function () {
        addPending(this.id, 1)
    })

    $(document).on('click', '.decline', function () {
        addPending(this.id, 2)
    })

    $(document).on('click', '#changepass', function () {
        $(location).attr('href', '../../panel/admin/changepass.html')
    })

    $(document).on('click', '#back', function () {
        $('#penders').remove()
        $('#pendingTable').show()
    })

})


addPending = (id,statusRes) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'addshop',
            ownerid: id,
            status: statusRes,
            shopname: $('#carwashname').val().toLowerCase(),
            location: $('#shopLocation').val().toLowerCase(),
        },
        success: async (data) => {
            console.log(data);
            if (data === '200') {
                location.reload()
            } else {
                toastr['error']('Something went wrong')
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}
    })
}

getDocuments = (idOwner) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'displayDocuments',
            idOwner: idOwner
        },
        success: (data) => {
            if (checkJson(data)) {
                let str = ''
                dataJSON = JSON.parse(data)
                dataJSON.forEach(element => {
                    str += `<div class="col-lg-4">
                        <img src="../../assets/php/${element.img_path}" alt="To be uploaded" style="width: 200px; height: 200px;">
                    </div>`
                })

                $('#ownerDocuments').append(str )
            } else {
                console.error(data);
            }
        },
        error: (xhr,ajaxOptions, error) => {console.error(error);}
    })
}

displayPendingDetails = (ownerID) => {
    $('#pendingTable').hide()

    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'pendingdetails',
            ownerid: ownerID
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let str = '';

                dataJSON.forEach(element => {
                    str += `<div class="business-wrap" id="penders">
                        <h3 class="fs-4 mb-4 fw-bold text-center"><a role="button" class="d-flex float-start h1 text-black text-decoration-none" id="back"><i class="fa-solid fa-circle-arrow-left pe-auto" aria-disabled="true"></i></a role="button">Business Information & Documents</h3>
                        <div class="business-info">
                            <div class="row">
                                <!-- Carwash-Official-Logo -->
                                <img class="mb-3 mx-0 mx-lg-auto shadow-lg p-3 rounded"
                                    src="../../assets/img/cwb-logo.png" style="width: 350px;">
                                <!-- Carwash-Legal-Contacts -->
                                <h4 class="fw-bold pt-3 pb-2">Business Legal Contacts</h4>
                                <div class="mb-3">
                                    <label for="carwashname" class="form-label fw-semibold">Carwash Name:</label>
                                    <input type="text" class="form-control" id="carwashname" value="${capitalized(element.shop_name)}"
                                        disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label fw-semibold">Email:</label>
                                    <input type="email" class="form-control" id="email" value="${element.email_add}"
                                        disabled>
                                </div>
                                <div class="mb-3">
                                    <label for="contact" class="form-label fw-semibold">Contact #:</label>
                                    <input type="tel" class="form-control" id="contact" value="${element.contact_no}" disabled>
                                </div>

                                <div class="mb-3">
                                    <label for="shopLocation" class="form-label fw-semibold">Location:</label>
                                    <input type="tel" class="form-control" id="shopLocation" value="${element.location}" disabled>
                                </div>
                                <!-- Carwash-Owner-Info -->
                                <h4 class="fw-bold pt-3 pb-2">Carwash Owner Information</h4>
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="firstname" class="form-label fw-semibold">First Name</label>
                                            <input type="text" class="form-control" id="firstname" value="${capitalized(element.firstname)}" disabled>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="lastname" class="form-label fw-semibold">Last Name</label>
                                            <input type="text" class="form-control" id="lastname" value="${capitalized(element.lastname)}" disabled>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="mb-3">
                                            <label for="middleinitial" class="form-label fw-semibold">MI.</label>
                                            <input type="text" class="form-control" id="middleinitial" value="${element.midname.charAt(0).toUpperCase()}." disabled>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="mb-3">
                                            <label for="address" class="form-label fw-semibold">Complete Address</label>
                                            <input type="text" class="form-control" id="address" value="${element.address}" disabled>
                                        </div>
                                    </div>
                                </div>
                                <!-- Carwash-Owner-Info -->
                                <h4 class="fw-bold pt-3 pb-2">Documents</h4>
                                <div class="row" id="ownerDocuments">
                                </div>
                                <div class="col-12">
                                    <div class="m-3 d-flex justify-content-between">
                                        <input type="button" class="btn btn-outline-success accept" id="${element.owner_id}" value="Accept">
                                        <input type="button" class="btn btn-outline-danger decline" id="${element.owner_id}" value="Decline">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                })
                $('#tableDisplay').append(str)

            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
    })
}


displayPendings = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'pendings'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let str = ''
                let ctr = 1
                dataJSON.forEach(element => {
                    if (element.status === 0) {
                        str += '<tr>' +
                                    '<td>'+ ctr +'</td>' +
                                    '<td>'+ capitalized(element.shop_name) +'</td>' +
                                    '<td><button class="btn btn-sm btn-outline-info px-3 ms-5 view" id="'+ element.owner_id +'">View</button></td>' +'</tr>'
                        ctr++
                    }
                })

                $('#tablePending').append(str)
                $('#counts').text(ctr-=1)

            } else {
                $(location).attr('href', '../../login.html')
            }
        },
    })
}

getRole = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getRole'
        },
        success: (data) => {
            if (data !== 'admin') {
                sessionStorage.clear()
                window.location.href = '../../assets/404/error.html'
            }
        }
    })
}

displayAdmin = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'displayUsers'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let fullname = document.querySelectorAll('#fullname');
                let str = '';
                
                dataJSON.forEach(element => {
                    
                    
                    if (element.role === 'admin') {
                        
                        $('#firstname').val(`${capitalized(element.firstname)}`)
                        $('#lastname').val(`${capitalized(element.lastname)}`)
                        $('#middleinitial').val(`${capitalized(element.midname)}`)
                        $('#email').val(`${element.email_add}`)
                        $('#contactNum').val(`${element.contact_no}`)
                        $('#address').val(`${element.address}`)

                        for (let index = 0; index < fullname.length; index++) {
                            fullname[index].innerText = capitalized(element.lastname) +', '+ capitalized(element.firstname) +' '+ element.midname.charAt(0).toUpperCase() + '.'
                        }

                        $('#role').text(`${capitalized(element.role)}`)
                    }
                });
                
                $('#tableOwner').append(str);
            } else {
                $(location).attr('href', '../../login.html');
            }
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}

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

