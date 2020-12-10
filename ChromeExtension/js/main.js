const BUTTON_ID = 'showLikeButton'

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
      const likeCount = likes[1]
      $(this).after('<i class="fa fa-fw fa-thumbs-up"></i>'+likeCount)

      const pv = data.match(/"totalPv":([0-9]*),/)
      const pvCount = pv[1]
      $(this).after('<i class="fa fa-fw fa-eye"></i>'+pvCount+'<br/>')
    })
  })
}

const addShowButton = () => {
  const button = `
    <div id="showButtonContainer">
      <button id="${BUTTON_ID}" style="border">
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

$(`#${BUTTON_ID}`).click(function() {
  getLikes()
  changeButtonColor()
})
