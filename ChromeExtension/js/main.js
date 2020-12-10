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
            let likes = data.match(/likesCount":([0-9]*),/)
            let likeCount = likes[1]
            $(this).after('<i class="fa fa-fw fa-thumbs-up"></i>'+likeCount)

            let pv = data.match(/totalPv":([0-9]*),/)
            let pvCount = pv[1]
            $(this).after('<i class="fa fa-fw fa-eye"></i>'+pvCount+'<br/>')
        })
        .fail( (data) => {
        })
        .always( (data) => {
        });
    })
}
let button = '<div id="showButtonContainer"><button id="showLikeButton" style="border"><i class="fa fa-bell"></i> 表示</button></div>'
$('.container' + '.adventCalendarSection').after(button)
$('#showLikeButton').click(function() {
    getLikes()
})
