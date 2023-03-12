$(document).ready(function () {
    displayCompletedTransactions()

    $(document).on('click', '.rate-now', function () {
        $('.starSend').attr('id', this.id)
    })

    $(document).on('keypress', '#starAmount', function (e) {
        const code = e.which
        if (code === 13) {
            const ids = $('.starSend').attr('id').split(' ')
            if ($('#starAmount').val() != '') {
                addStarsToOwner(ids[0], ids[1])
            } else {
                swal({
                    title: 'Star Amount',
                    text: 'Please add at least 1 star amount',
                    icon: 'warning',
                    buttons: true
                })
            }
            
        }

        e.stopPropagation()
    })

    $(document).on('click', '.starSend', function () {
        const ids = this.id.split(' ')
        if ($('#starAmount').val() != 1 || $('#starAmount').val() != '') {
            addStarsToOwner(ids[0], ids[1])
        } else {
            swal({
                title: 'Star Amount',
                text: 'Please add at least 1 star amount',
                icon: 'warning',
                buttons: true
            })
        }
    })

    const starRate = $('.star-rate')
    
    for (let index = 0; index < starRate.length; index++) {
        starRate[index].addEventListener('click',function () {
            displayRatings(this.id)
        })
    }

    
})

{/* <tr>
        <td>1</td>
        <td>Something Name</td>
        <td>1-22-23 09:10 AM</td>
        <td>Not Rated</td>
        <td>
            <div class="container d-flex justify-content-center">
                <div class="stars m-0 p-0">
                    
                    <input class="star star-1 star-rate" id="star-1" type="radio" name="star"/>
                    <label class="star star-1 rate-label" for="star-1"></label>
                    
                    <input class="star star-2 star-rate" id="star-2" type="radio" name="star"/>
                    <label class="star star-2 rate-label" for="star-2"></label>
                    
                    <input class="star star-3 star-rate" id="star-3" type="radio" name="star"/>
                    <label class="star star-3 rate-label" for="star-3"></label>
                    
                    <input class="star star-4 star-rate" id="star-4" type="radio" name="star"/>
                    <label class="star star-4 rate-label" for="star-4"></label>
                    
                    <input class="star star-5 star-rate" id="star-5" type="radio" name="star"/>
                    <label class="star star-5 rate-label" for="star-5"></label>

                </div>
            </div>
        </td>
    </tr> */}

let sendStar = (ownerID, stars) => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'rateCarwashOwner',
            rate_number: stars,
            owner_id: ownerID
        },
        success: data => {
            if (data === '200') {
                swal('Star sent successfully').then(() => {
                    $('#historyTable').load(location.href + ' #historyTable')
                    displayCompletedTransactions()
                    $('#exampleModal').modal('hide')
                })
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

let addStarsToOwner = (trans_id, ownerID) => {
    $.ajax({
        type: "POST",
        url: '../../assets/php/router.php',
        data: {
            choice: 'addStars',
            transID: trans_id,
            stars: $('#starAmount').val(),
        },
        success: data => {
            if (data === '200') {
                const starsAmount = $('#starAmount').val() / 2;
                const stars = Number(starsAmount.toFixed(2))
                sendStar(ownerID, stars)
                $('#starAmount').val('')
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

let displayCompletedTransactions = () => {
    $.ajax({
        type: 'POST',
        url: '../../assets/php/router.php',
        data: {
            choice: 'getTransactionsForCustomer'
        },
        success: data => {
            if (checkJSONData(data)) {
                let dataJSON = JSON.parse(data);
                let str = ''
                let count = 1
                let rated = ''
                dataJSON.forEach(element => {
                    let starsCount = ''
                    
                    if (element.trans_status === 'completed') {
                        if (element.stars == 0) {
                            rated = `<a role="button" class="bg-warning p-1 text-decoration-none text-black rate-now" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${element.trans_id} ${element.shopowner_id}">Give Stars</a>`
                            starsCount = `
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                            `
                        } else {
                            
                            rated = 'Starred'
                        }
                        
                        for (let index = 0; index < element.stars; index++) {
                            starsCount += `<i class="fa-solid fa-star text-warning"></i>`
                        }

                        str += `<tr>
                                    <td>${count}</td>
                                    <td>${element.carwash_name}</td>
                                    <td>${element.date_updated}</td>
                                    <td>${rated}</td>
                                    <td>${starsCount}</td>
                                </tr>`
                    }
                    count++
                })

                $('#historyTable').append(str)
            } else {
                console.log(data);
            }
        },
        error: (xhr, ajaxOptions, err) => {console.error(err);}
    })
}

checkJSONData = (data) => {
    try {
        JSON.parse(data);
        return true
    } catch (e) {
        return false
    }
}

let displayRatings = (rates) => {
    const rating = ['star-1','star-2','star-3','star-4','star-5']
    const numberOfStars = [5,4,3,2,1]
    let numb = 0

    for (const key in rating) {
        if (rating[key] === rates) {
            numb = key
        }
    }

    const rateInput = document.querySelectorAll('.star-rate')
    for (let i = 1; i < numberOfStars[numb]; i++) {
        $(rateInput[i]).attr('checked', true)
    }


    console.log(numb, numberOfStars[numb]);
}
