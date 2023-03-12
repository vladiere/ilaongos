$(document).ready(function() {
    displaySchedule()

    $(document).on('click', '.completeSched', function () {
        completeSchedule(this.id, 'completed')
    })

    $(document).on('click', '.droppedSched', function () {
        completeSchedule(this.id, 'dropped')
    })
});

// 0 pending
// 1 accepted
// 2 declined
// 3 canceled
// 4 completed
// 5 remove


var completeSchedule = (trans_id, status) => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'updateTransaction',
            trans_id: trans_id,
            newStatus: status
        },
        success: data => {
            console.log(data);
            if (data === '200') {
                $('#dateAndTime').load(location.href + ' #dateAndTime')
                displaySchedule()
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}


var displaySchedule = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getTransactions'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJson = JSON.parse(data)
                let str = ''
                let count = 1
                dataJson.forEach(element => {
                    let status = ''
                    if (element.trans_status === 'accepted') {
                        status = 'Pending...'
                        str += `<tr>
                                    <td>${count}</td>
                                    <td>${transformWithWhiteSpace(element.firstname)} ${element.midname.charAt(0).toUpperCase()}. ${transformWithWhiteSpace(element.lastname)}</td>
                                    <td>${transformWithWhiteSpace(element.wash_type)}</td>
                                    <td>${transformWithWhiteSpace(element.vehicle_type)}</td>
                                    <td>${element.price}</td>
                                    <td>${element.date_sched}</td>
                                    <td>${status}</td>
                                    <td>
                                        <button class="btn btn-sm btn-success px-3 completeSched" id="${element.trans_id}">Completed</button>
                                        <button class="btn btn-sm btn-danger px-3 droppedSched" id="${element.trans_id}">Drop</button>
                                    </td>
                                </tr>`
                    }
                });

                $('#dateAndTime').append(str)
            } else {
                // window.location.href = '../../login.html' 
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