$(document).ready(function() {
    displayDocuments()

    $(document).on('click', '#close', function () {
        $('#multiple_files').val('')
        $('#preview').empty()
    })
})


displayDocuments = () => {
    $.ajax({
        url: '../../assets/php/router.php',
        type: 'POST',
        data: {
            choice: 'getdocuments',
        },
        success: (data) => {
            if (checkJson(data)) {
                if (data.length > 2) {
                    $('#addImg').hide();
                    let dataJson = JSON.parse(data);
                    let output = '';
                    dataJson.forEach(element => {
                        output += `<div class="col-lg-4">
                        <img src="../../assets/php/${element.img_path}" alt="..." style="width: 200px; height: 200px;">
                        </div>`
                    });
                    $('#documents').append(output);
                } else {
                    $('.business-con').hide()
                    $('.warningText').append('<h3 class="display-4 text-center">Please Stablish <mark>Carwash Shop</mark> First</h3>')
                }
            } else {
                console.table(data)
            }
        },
        error: (xhr, ajaxOptions, error) => { console.table(error) }
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