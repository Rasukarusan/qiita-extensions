// カレンダーから記事のURLを取得してphpにリクエストを投げる
function getLikes() {
    $('.adventCalendarCalendar_comment').each(function(){
        var url = $(this).children('a').attr('href')
        if(typeof url === 'undefined') return
         $.ajax({
             url:'http://localhost:9000/index.php',
             type:'GET',
             data:{
                 'url':url,
            }
        })
        .done( (data) => {
            $(this).after('<i class="fa fa-fw fa-thumbs-up"></i>'+data)
        })
        .fail( (data) => {
        })
        .always( (data) => {
        });
    })
}

// いいね表示ボタンを生成する
$('.adventCalendarJumbotron_meta').append('<a data-toggle="tooltip" title="" target="_blank" class="adventCalendarJumbotron_bell" href="javascript:void(0)" onclick="getLikes()"><i class="fa fa-bell adventCalendarJumbotron_rssIcon"></i></a>')
