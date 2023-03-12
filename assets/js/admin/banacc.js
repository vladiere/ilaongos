$(document).ready(function () {
    displayBannedList()

    $(document).on('click', '.btnBan', function () {
        displayBannedAcc(this.id)
    })

    $(document).on('click', '#back', function () {
        $('#banDetails').remove()
        $('#banAccounts').show()
    })

    $(document).on('click', '.unbanned', function () {
        unbanUser(this.id, 0)
    })    

})

// This callback is called when the user is unbanned
unbanUser = (id, stat) => {
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
                // Reload the page when the request is successful
                location.reload();
            } else {
                toastr['error']('Something went wrong')
            }
        },
        error: (xhr, ajaxOptions, error) => {console.log(error);}
    })
}

// This function is called to display some sort of account information for the user
displayBannedList = () => {
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
                    if (element.status === 1) {
                        str += '<tr>'+
                                '<td>'+ ctr +'</td>'+
                                '<td>'+ element.id +'</td>'+
                                '<td>'+ capitalized(element.lastname) +', '+ capitalized(element.firstname) +' '+ element.midname.charAt(0).toUpperCase() +'.</td>'+
                                '<td>'+ element.address +'</td>'+
                                '<td>'+ element.date_created +'</td>'+
                                '<td><a role="button" class="text-black text-decoration-none px-5 btn btn-outline-secondary btnBan" id="'+ element.id +'">View</a></td>' +
                            '</tr>'
                        ctr++
                    }
                });

                $('#tableBannedAcc').append(str)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
    })
}

// This function is called when the you click on the view button to see for information
displayBannedAcc = (ownerID) => {
    $('#banAccounts').hide()

    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'displayUsers',
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let str = '';
                dataJSON.forEach(element => {
                    if (element.id == ownerID) {
                        if (element.role === 'customer') {
                            // This is a dom for the customer
                            str += `<div class="business-wrap" id="banDetails">
                                        <h3 class="fs-4 pt-0 mb-4 fw-bold text-center"><a role="button" class="d-flex float-start h1 text-black text-decoration-none" id="back"><i class="fa-solid fa-circle-arrow-left pe-auto" aria-disabled="true"></i></a></h3>
                                        <div class="business-info">
                                            <div class="row">
                                                <!-- Carwash-Owner-Info -->
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
                                                            <input type="text" class="form-control" id="middleinitial" value="${capitalized(element.midname)}" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="mb-3">
                                                            <label for="address" class="form-label fw-semibold">Complete Address</label>
                                                            <input type="text" class="form-control" id="address" value="${element.address}" disabled>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="mb-3">
                                                            <label for="address" class="form-label fw-semibold">Email</label>
                                                            <input type="text" class="form-control" id="address" value="${element.email_add}" disabled>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="col-12">
                                                    <div class="m-3 d-flex justify-content-between">
                                                        <input type="button" class="btn btn-outline-success unbanned" id="${element.id}" value="Unbanned">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                        } else {
                            // Here is where the DOM element was created
                        str += `<div class="business-wrap" id="banDetails">
                                    <h3 class="fs-4 pt-0 mb-4 fw-bold text-center"><a role="button" class="d-flex float-start h1 text-black text-decoration-none" id="back"><i class="fa-solid fa-circle-arrow-left pe-auto" aria-disabled="true"></i></a></h3>
                                    <div class="business-info">
                                        <div class="row">
                                            <!-- Carwash-Owner-Info -->
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
                                                        <input type="text" class="form-control" id="middleinitial" value="${capitalized(element.midname)}" disabled>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="mb-3">
                                                        <label for="address" class="form-label fw-semibold">Complete Address</label>
                                                        <input type="text" class="form-control" id="address" value="${element.address}" disabled>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div class="mb-3">
                                                        <label for="address" class="form-label fw-semibold">Email</label>
                                                        <input type="text" class="form-control" id="address" value="${element.email_add}" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="m-3 d-flex justify-content-between">
                                                    <input type="button" class="btn btn-outline-success unbanned" id="${element.id}" value="Unbanned">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                        }
                    } 
                })

                // The DOM element that will be rendered or appended to the page
                $('#singleAcc').append(str)

            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
    })
}


// This function is called when the you check the data if it is a JSON object or not
checkJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}

// This function is used for capitalizing the name of the element
capitalized = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}



