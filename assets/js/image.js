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
    $('#image_logo').change(function () {
        var preview = $('#previewLogo');
        preview.html('');
        var files = $(this)[0].files;
        var error = false;
        var ext, name;
        $.each(files, function (index, value) {
            ext = value.name.split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                error = true;
            } else {
                name = value.name;
                preview.append("<img class='img-thumbnail rounded mx-auto d-block' src='" + URL.createObjectURL(value) + "' alt='" + name + "'width='250'>");
            }
        });
        if (error) {
            toastr['error']('Invalid Image file. Only gif, png, jpg, and jpeg are allowed.') 
            $('#multiple_files').val('');
            return;
        }
    })

    $(document).on('click', '#changeLogo', function () {
        updateProfile()
    })

    $('#multiple_files').change(function () {
        var preview = $('#preview');
        preview.html('');
        var files = $(this)[0].files;
        var error = false;
        var ext, name;
        $.each(files, function (index, value) {
            ext = value.name.split('.').pop().toLowerCase();
            if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
                error = true;
            } else {
                name = value.name;
                preview.append("<img class='img-thumbnail rounded mx-auto d-block' src='" + URL.createObjectURL(value) + "' alt='" + name + "'width='250'>");
            }
        });
        if (error) {
            toastr['error']('Invalid Image file. Only gif, png, jpg, and jpeg are allowed.') 
            $('#multiple_files').val('');
            return;
        }
    })
    $('#submit').click(function () {
        if ($('#cwname').val() !== '') {
            addToPending()
        } else {
            toastr['error']('Please enter name your shop')
        }
    });
  });

  let addToPending = () => {
        $.ajax({
            type: 'POST',
            url: '../../assets/php/router.php',
            data: {
                choice: 'addToPending',
                shopName: $('#cwname').val().toLowerCase(),
                locations: $('#locations').val().toLowerCase()
            },
            success: (data) => {
                if (data === '200') {
                    $('#cwname').val('')
                    $('#locations').val('')
                    uploadProfile()
                }
            },
            error: (xhr, ajaxOptions, err) => {console.error(err);}
        })
    }

  let updateProfile = () => {
      var form_data = new FormData();
      form_data.append("files", document.getElementById('image_logo').files[0]);
      
      $.ajax({
      url: '../../assets/php/updatelogo.php',
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function (response) {
        console.log(response);
        if (response === '200') {
            $('#image_logo').val('')
            toastr['success']('Carwash Shop Logo Updated')
        } else {
            console.table(response);
        }
      },
      error: function (xhr, ajaxOptions, error) { console.table(error); }
      });
  }

  let uploadProfile = () => {
      var form_data = new FormData();
      form_data.append("files", document.getElementById('image_file').files[0]);
      
      $.ajax({
      url: '../../assets/php/profileimg.php',
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function (response) {
          if (response == '200') {
              $('#image_file').val('')
              adddocuments()
          } else {
              console.table(response);
          }
      },
      error: function (xhr, ajaxOptions, error) { console.table(error); }
      });
  }

  let adddocuments = () => {
    var form_data = new FormData();
    var ins = document.getElementById('multiple_files').files.length;
    for (var x = 0; x < ins; x++) {
    form_data.append("files[]", document.getElementById('multiple_files').files[x]);
    }
    $.ajax({
    url: '../../assets/php/uploadimg.php',
    dataType: 'text',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function (response) {
        console.log(result);
        if (response == '200') {
            $('#multiple_files').val('')
            toastr['success']('Image Upload Successfully')
            $('#container div').load(location.href + ' #container div')
            $('#preview').empty()
        } else {
            console.table(response);
        }
    },
    error: function (xhr, ajaxOptions, error) { console.table(error); }
    });
  }
  