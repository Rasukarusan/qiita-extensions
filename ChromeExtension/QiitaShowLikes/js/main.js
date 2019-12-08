function getLikes() {
    $('.adventCalendarCalendar_comment').each(function(){
        var url = $(this).children('a').attr('href')
        if(typeof url === 'undefined') return
         $.ajax({
             url:url,
             type:'GET',
             dataType: 'html',
        })
        .done( (data) => {
            let likes = data.match(/likesCount&quot;:([0-9]*),/)
            let likeCount = likes[1]
            $(this).after('<i class="fa fa-fw fa-thumbs-up"></i>'+likeCount)
        })
        .fail( (data) => {
        })
        .always( (data) => {
        });
    })
}
$('.adventCalendarJumbotron_meta').append('<a id="showLikeButton" data-toggle="tooltip" title="" class="adventCalendarJumbotron_bell" href="javascript:void(0)" ><i class="fa fa-bell"></i></a>')

$('#showLikeButton').click(function() {
    getLikes()
})
