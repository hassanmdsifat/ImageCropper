$(document).ready(function(){
    var image_crop = $('#image_demo').croppie({
        viewport: {
            width: 600,
            height: 300,
            type:'square' //circle
        },
        boundary:{
            width: 650,
            height: 350
        }
    });
    $('#cover_image').on('change', function(){
        var reader = new FileReader();
        reader.onload = function (event) {
            image_crop.croppie('bind', {
                url: event.target.result,
            });
        }
        reader.readAsDataURL(this.files[0]);
        $('#uploadimageModal').modal('show');
    });
    $('.crop_image').click(function(event){
        var formData = new FormData();
        image_crop.croppie('result', {type: 'blob', format: 'png'}).then(function(blob) {
            formData.append('cropped_image', blob);
            ajaxFormPost(formData, '/upload-image/');
        });
        $('#uploadimageModal').modal('hide');
    });
});
function ajaxFormPost(formData, actionURL){
    $.ajax({
        url: actionURL,
        type: 'POST',
        data: formData,
        cache: false,
        async: true,
        processData: false,
        contentType: false,
        timeout: 5000,
        beforeSend: function(){
        },
        success: function(response) {
            if (response['status'] === 'success') {
                swal({
                    title:'Success!',
                    text: response['message'],
                    type:'success',
                    timer:2000
                }).then(function() {
                    $('#cover_image').val("");
                    $('#uploaded-image').attr('src', response['url']);
                },function(){
                });
            } else {
                swal({
                    title:'Failed!',
                    text: response['message'],
                    type:'error'
                });
            }
        },
        complete: function(){
        }
    });
}