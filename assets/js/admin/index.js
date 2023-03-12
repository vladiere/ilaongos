$(document).ready(() => {
    displayCarwashShop();
})

let displayCarwashShop = () => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'displayCarwashShop'
        },
        success: (data) => {
            if (checkJson(data)) {
                let dataJSON = JSON.parse(data);
                let tableStr = ''
                let ctr = 1
                dataJSON.forEach(element => {
                    let starsCount = ''

                    if (element.status === 0) {
                        if (element.rating != 0.00) {
                            starsCount += calculateStar(element.rating)
                            // const counts = element.rating.split('.')
                            // for (let index = 0; index < counts[0]; index++) {
                            //     starsCount += `<i class="fa-solid fa-star text-warning"></i>    `
                            // }
                            // if (counts[1] < 50 && counts[0] < 4) {
                            //     starsCount += `<i class="fa-solid fa-star-half-stroke text-warning"></i>     `
                            //     starsCount += `<i class="fa-regular fa-star"></i>       `
                            // } else {
                            //     starsCount += `<i class="fa-regular fa-star"></i>       `
                            // }
                        } else {
                            starsCount += `
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>`
                        }
                        tableStr += `<tr>
                                        <td>${ctr}</td>
                                        <td>${capitalized(element.shop_name)}</td>
                                        <td>${element.date_publish}</td> 
                                        <td>${starsCount}</td>
                                    </tr>`
                        ctr++
                    }
                });
                $('#tableDis').append(tableStr)

            } else {
                $(location).attr('href', '../../index.html');
            }            
        },
        error: (xhr, ajaxOptions, errThrown) => {console.log(errThrown);}

    })
}

let calculateStar = (ratings) => {
    const maxStars = 5
    const numberStars = Math.round(ratings)
    const emptyStars = maxStars - numberStars
    let stars = ''

    for (let index = 0; index < numberStars; index++) {
        stars += '<i class="fa-solid fa-star text-warning"></i>    '
    }

    for (let index = 0; index < emptyStars; index++) {
        stars += '<i class="fa-regular fa-star"></i>     '
    }

    return stars
}

let checkJson = (dataJson) => {
    try {
        JSON.parse(dataJson)
        return true;
    } catch (error) {
        return false;
    }
}


