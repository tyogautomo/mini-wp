$(document).ready(function() {

    $('.write').click(function(event) {
        event.preventDefault()

        // console.log('masuk <<<<<<<<<<<,,,')
        $('.articles-container').hide()
        $('.article-form-container').show()
    })

    $('.home').click(function(v) {
        v.preventDefault()

        $('.articles-container').show()
        $('.article-form-container').hide()
    })

})