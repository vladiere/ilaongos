$(document).ready(function () {
    getAllShopsAndOwner()
})

let getAllShopsAndOwner = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'allCarwashShopAndOwner'
        },
        success: data => {
            if (checkDataJson(data)) {
                let dataJSON = JSON.parse(data)
                let str = ''
                dataJSON.forEach(element => {
                    str += `<div class="card" style="width: 18rem;">
                                <div class="card-body text-center">
                                    <img src="../../assets/php/${element.profile_path}" style="width:15rem;" alt="">    
                                    <h5 class="card-title pt-2">${transformWithWhiteSpaces(element.shop_name)}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${transformWithWhiteSpaces(element.lastname)}</h6>
                                </div>
                            </div>`
                })

                $('#carwashShopCard').append(str)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

let capitalizedWords = (data) => {
    return data.charAt(0).toUpperCase() + data.slice(1);
}


var transformWithWhiteSpaces = (data) => {
    let newData = ''
    if (data.indexOf(' ') >= 0) {
        let dataArray = data.split(' ')
        
        for (const key in dataArray) {
            newData += capitalizedWords(dataArray[key]) + ' '
        }
    } else {
        newData = capitalizedWords(data)
    }

    if (newData.charAt(newData.length) === ' ') {
        newData = newData.subemployeeString(0, newData.length - 1) + ''
    }

    return newData;
}

checkDataJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}