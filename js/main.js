const BUTTON_ID = 'showLikeButton'
$('.adventCalendarCalendar_leave').css({'z-index': -1})

const getLikes = () => {
  $('.adventCalendarCalendar_comment').each(function(){
    const url = $(this).children('a').attr('href')
    if(typeof url === 'undefined') return
     $.ajax({
       url,
       type:'GET',
       dataType: 'html',
    })
    .done(data => {
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

const addShowButton = () => {
  const button = `
    <div id="showButtonContainer">
      <button id="${BUTTON_ID}">
        <i class="fa fa-bell"></i> 表示
      </button>
    </div>
  `
  $('.container' + '.adventCalendarSection').after(button)
}

const changeButtonColor = () => {
  $(`#${BUTTON_ID}`).css({
    'background': '#D04255',
    'border-bottom': 'solid 4px #E38692',
  })
}

addShowButton()

$(`#${BUTTON_ID}`).click(() => {
  getLikes()
  changeButtonColor()
})
getLikes()
