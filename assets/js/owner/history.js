$(document).ready(function () {
    displayCompletedSchedule()
})


let displayCompletedSchedule = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'getTransactions'
        },
        success: data => {
            if (checkJsonData(data)) {
                let dataJSON = JSON.parse(data)
                let str = ''
                let count = 0
                let total = 0

                dataJSON.forEach(element => {
                    if (element.trans_status === 'completed') {
                        str += `<tr>
                                    <td>${count}</td>
                                    <td>${transformWithWhiteSpace(element.firstname)} ${transformWithWhiteSpace(element.midname)} ${transformWithWhiteSpace(element.lastname)}</td>
                                    <td>${transformWithWhiteSpace(element.wash_type)}</td>
                                    <td>${transformWithWhiteSpace(element.vehicle_type)}</td>
                                    <td><h2>&#8369;<span class="h5" id="totalIncome">${element.price}</span></h2></td>
                                </tr>`
                        total += element.price
                        count++
                    }
                });
                $('#totalIncome').text(total)
                $('#historyTable').append(str)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

var capitalizeWord = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}

var checkJsonData = (dataJson) => {
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
            newData += capitalizeWord(dataArray[key]) + ' '
        }
    } else {
        newData = capitalizeWord(data)
    }

    if (newData.charAt(newData.length) === ' ') {
        newData = newData.substring(0, newData.length - 1) + ''
    }

    return newData;
}