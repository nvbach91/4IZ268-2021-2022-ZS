$(document).ready(function() {
    $('#summernote').summernote();
    $('#recipient').on('change', checkEmailExists);
});