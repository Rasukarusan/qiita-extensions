/**
 * 他人の記事でもView数を表示する
 */
(function() {
  const pv = document.body.innerHTML.match(/"totalPv":([0-9]*),/)[1]
  console.log($('.it-Header_pv') );
  if ($('.it-Header_pv').length === 0) {
    $('.it-Header_meta').prepend(`<div class="it-Header_pv">${pv} views</div>`)
  }
})()
