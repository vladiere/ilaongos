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

$(document).ready(function () {
    displayBranches()

    $(document).on('click', '.removeBranch', function () {
        swal({
            title: 'Remove Branch',
            text: 'Are you sure you want to remove this branch?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then(removed => {
            if (removed) {
                removeBranch(this.id, 'remove');
            } else {
                swal({
                    title: 'Keeping Branch',
                    text: 'Your Branch has been kept.',
                    icon: 'info',
                    buttons: 'OK'
                })
            }
        })
    })
})

let removeBranch = (branch_id, branch_status) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'removeBranch',
            branchID: branch_id,
            branchStatus: branch_status
        },
        success: data => {
            if (data === '200') {
                toastr['success']('Branch deleted successfully')
                $('#branchTable').load(location.href + ' #branchTable')
                displayBranches()
            } else {
                console.log(data);
            }
        }
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
            if (checkDataJSON(data)) {
                let dataJSON = JSON.parse(data)
                let dataStr = ''
                let count = 0
                let branchStatus = ''
                dataJSON.forEach(element => {
                    console.table(element)
                    if (element.branch_status === '0') {
                        branchStatus = 'Active'
                        dataStr += `<tr>
                                        <td>${count}</td>
                                        <td>${transformWithWhiteSpaces(element.branch_name)}</td>
                                        <td>${transformWithWhiteSpaces(element.branch_location)}</td>
                                        <td>${element.date_publish}</td>
                                        <td>${branchStatus}</td>
                                        <td><input type="button" class="btn btn-outline-danger p-1 removeBranch" id="${element.branch_id}" value="Remove"></td>
                                    </tr>`
                        count++
                    }
                })

                $('#branchTable').append(dataStr)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


var capitalizedTheWord = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}

var checkDataJSON = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}

var transformWithWhiteSpaces = (data) => {
    let newData = ''
    if (data.indexOf(' ') >= 0) {
        let dataArray = data.split(' ')
        
        for (const key in dataArray) {
            newData += capitalizedTheWord(dataArray[key]) + ' '
        }
    } else {
        newData = capitalizedTheWord(data)
    }

    if (newData.charAt(newData.length) === ' ') {
        newData = newData.substring(0, newData.length - 1) + ''
    }

    return newData;
}