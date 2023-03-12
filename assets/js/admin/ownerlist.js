$(document).ready(() => {
    displayOwnerList()

    $(document).on('click', '.btnBan', function () {
        banUser(this.id, 1)
    })


})

let displayOwnerList = () => {
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
                let accStatus = ''
                dataJSON.forEach(element => {
                    if (element.status === 0) {
                        accStatus = 'Verified'
                    } else {
                        accStatus = 'Not Verified'
                    }
                    if (element.role === 'owner' && element.status !== 1) {
                        str += '<tr>'+
                                '<td>'+ ctr +'</td>'+
                                '<td>'+ capitalized(element.lastname) +', '+ capitalized(element.firstname) +' '+ element.midname.charAt(0) +'.</td>'+
                                '<td>'+ element.address +'</td>'+
                                '<td>'+ element.date_created +'</td>'+
                                '<td>'+ accStatus +'</td>'+
                                '<td><button class="btn btn-sm btn-danger px-5 btnBan" id="'+ element.id +'">Ban</button></td>' +
                            '</tr>'
                        ctr++
                    } else {
                        
                    }
                });
                $('#tableOwner').append(str)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.log(err);}
    })
}

let banUser = (id, stat) => {
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
                $('#tableOwner').load(location.href + ' #tableOwner')
                displayOwnerList()
            } else {
                toastr['error']('Something went wrong')
            }
        },
        error: (xhr, ajaxOptions, error) => {console.log(error);}
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
