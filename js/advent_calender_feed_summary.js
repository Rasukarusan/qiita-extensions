/**
 * 購読中のアドベントカレンダーの記事を各日付にまとめて表示する
 */
(function() {
  if (!location.pathname.match(/advent-calendar/)) return

  main()
  function main() {
    createTable()
    const jqXHRList = fetchContents()
    $.when.apply($, jqXHRList).done(appendContents)
    addHideSidebar()
  }

  function getUrls() {
    const urls = []
    $('.ac-Item_name').each((i,e) => {
      urls.push($(e).attr('href'))
    })
    return urls
  }
  function fetchContents() {
    return getUrls().map(url => $.ajax({
      url,
      type:'GET',
      dataType: 'html'
    }))
  }

  function appendContents () {
    const contents = new Array(25).fill([])
    for (let i = 0; i < arguments.length; i++) {
      const html = $($.parseHTML(arguments[i][0]))
      const main = html.filter('#main')[0]
      $(main).find('.adventCalendarCalendar_comment').each((index, element) => {
        contents[index] = [...contents[index], element]
      })
    }

    $('.adventCalendarCalendar_day').each((index, element) => {
      const containerId = `feed-contents-${index}`
      $(element).append(`<div id="${containerId}" style="height: ${contents[index].length * 80}; overflow: auto"></div>`)
      contents[index].forEach(async (content) => {
        const url = $(content).find('a')[0].href
        const hostname = new URL(url).hostname
        if (hostname !== 'qiita.com') {
          $(`#${containerId}`).append(content)
          return
        }
        const { pv, likes, stock } = await getDetail(url)
        $(content).append('<br><span><i class="fa fa-fw fa-eye"></i>'+pv+'</span>')
        $(content).append('<span><i class="fa fa-fw fa-thumbs-up"></i>'+likes+'</span>')
        $(content).append('<span><i class="fa fa-fw fa-archive"></i>'+stock+'</span>')
        $(`#${containerId}`).append(content)
      })
    })
  }

  function getDetail(url) {
    return $.ajax({ url, type:'GET', dataType: 'html' }).then(data => {
      const pv = data.match(/"totalPv":([0-9]*),/)[1]
      const likes = data.match(/"likesCount":([0-9]*),/)[1]
      const stock = data.match(/"stockedCount":([0-9]*),/)[1]
      return {pv, likes, stock}
    })
  }

  function createTable() {
    const table = `
    <div class="container adventCalendarCalendar hidden-xs">
      <div class="row">
        <div class="col-sm-12">
          <table class="table">
            <thead>
              <tr>
                <th class="adventCalendarCalendar_dayName">日</th>
                <th class="adventCalendarCalendar_dayName">月</th>
                <th class="adventCalendarCalendar_dayName">火</th>
                <th class="adventCalendarCalendar_dayName">水</th>
                <th class="adventCalendarCalendar_dayName">木</th>
                <th class="adventCalendarCalendar_dayName">金</th>
                <th class="adventCalendarCalendar_dayName">土</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="adventCalendarCalendar_day-disabled"><p class="adventCalendarCalendar_date">29</p></td>
                <td class="adventCalendarCalendar_day-disabled"><p class="adventCalendarCalendar_date">30</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">1</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">2</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">3</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">4</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">5</p></td>
              </tr>
              <tr>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">6</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">7</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">8</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">9</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">10</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">11</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">12</p></td>
              </tr>
              <tr>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">13</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">14</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">15</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">16</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">17</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">18</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">19</p></td>
              </tr>
              <tr>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">20</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">21</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">22</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">23</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">24</p></td>
                <td class="adventCalendarCalendar_day"><p class="adventCalendarCalendar_date">25</p></td>
                <td class="adventCalendarCalendar_day-disabled"><p class="adventCalendarCalendar_date">26</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `
    $('.p-adcal_main').append(table)
  }

  $('.p-adcal_sidebar').hide()
  function addHideSidebar() {
    const button = '<button id="hideSidebarButton"><i class="fa fa-eye-slash"></i> 隠す</button>'
    $('.ac-CategoryHeading_title').append(button)

    $('#hideSidebarButton').click(() => {
      $('.p-adcal_sidebar').toggle()
    })
  }
})()
