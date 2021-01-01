(function() {
$('.adventCalendarCalendar_leave').css({'z-index': -1})

const getLikes = () => {
  $('.adventCalendarCalendar_comment').each(function(){
    const url = $(this).children('a').attr('href')
    if(typeof url === 'undefined') return
    const hostname = new URL(url).hostname
    if (hostname !== 'qiita.com') return
     $.ajax({ url, dataType: 'html' }).done(data => {
      const stock = data.match(/"stockedCount":([0-9]*),/)
      const stockCount = stock[1]
      $(this).after('<p><i class="fa fa-fw fa-archive"></i>'+stockCount+'</p>')

      const likes = data.match(/"likesCount":([0-9]*),/)
      if(!likes) return
      const likeCount = likes[1]
      $(this).after('<p><i class="fa fa-fw fa-thumbs-up"></i>'+likeCount+'</p>')

      const pv = data.match(/"totalPv":([0-9]*),/)
      const pvCount = pv[1]
      $(this).after('<p><i class="fa fa-fw fa-eye"></i>'+pvCount+'</p>')
    })
  })
}
getLikes()
})()
