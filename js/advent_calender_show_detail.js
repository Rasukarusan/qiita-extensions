/**
 * アドベントカレンダーにいいね数、ストック数、View数を表示する
 * 2020年版
 */
(function () {
  if (!location.pathname.match(/advent-calendar/)) return;

  $(".adventCalendarCalendar_leave").css({ "z-index": -1 });

  const getLikes = () => {
    $(".adventCalendarCalendar_comment").each(function () {
      const url = $(this).children("a").attr("href");
      if (typeof url === "undefined") return;
      const hostname = new URL(url).hostname;
      if (hostname !== "qiita.com") return;
      $.ajax({ url, dataType: "html" }).done((data) => {
        const stock = data.match(/"stockedCount":([0-9]*),/);
        const stockCount = stock[1];
        $(this).after(
          '<p><i class="fa fa-fw fa-archive"></i>' + stockCount + "</p>"
        );

        const likes = data.match(/"likesCount":([0-9]*),/);
        if (!likes) return;
        const likeCount = likes[1];
        $(this).after(
          '<p><i class="fa fa-fw fa-thumbs-up"></i>' + likeCount + "</p>"
        );

        const pv = data.match(/"totalPv":([0-9]*),/);
        const pvCount = pv[1];
        $(this).after('<p><i class="fa fa-fw fa-eye"></i>' + pvCount + "</p>");
      });
    });
  };
  getLikes();
})();

/**
 * アドベントカレンダーにいいね数、ストック数、View数を表示する
 * 2021年以降
 */
window.onload = function () {
  if (!location.pathname.match(/advent-calendar/)) return;

  /**
   * アイコンカウントの要素を生成
   */
  function createCountElement(className, count) {
    const container = document.createElement("p");
    const icon = document.createElement("i");
    icon.setAttribute("class", `fa fa-fw ${className}`);
    const countElement = document.createTextNode(count);
    container.appendChild(icon);
    container.appendChild(countElement);
    return container;
  }

  // アドベントカレンダー2021からクラス名が予測不可能なものになったため、aタグを全部抽出して振り分ける
  const aTags = document.getElementsByTagName("a");
  // アイコンカウント要素を追加
  Array.prototype.forEach.call(aTags, (aTag) => {
    // Qiitaの場合
    if (aTag.href.match(/https:\/\/qiita.com\/.*\/items\//)) {
      const url = aTag.href;
      const parent = aTag.parentElement;
      $.ajax({ url, dataType: "html" }).done((data) => {
        const pv = data.match(/"totalPv":([0-9]*),/);
        const pvCount = pv[1];
        parent.insertBefore(
          createCountElement("fa-eye", pvCount),
          aTag.nextSliding
        );

        const stock = data.match(/"stockedCount":([0-9]*),/);
        const stockCount = stock[1];
        parent.insertBefore(
          createCountElement("fa-archive", stockCount),
          aTag.nextSliding
        );

        const likes = data.match(/"likesCount":([0-9]*),/);
        const likeCount = likes[1];
        parent.insertBefore(
          createCountElement("fa-thumbs-up", likeCount),
          aTag.nextSliding
        );
      });
    }
    // noteの場合
    if (aTag.href.match(/https:\/\/note.com\//)) {
      const url = aTag.href;
      chrome.runtime.sendMessage({ url }, (res) => {
        const parent = aTag.parentElement;
        const likes = res.match(
          /aria-label="([0-9]*)スキ この記事にスキをつけたユーザーを見る"/
        );
        const likeCount = likes[1];
        parent.insertBefore(
          createCountElement("fa-thumbs-up", likeCount),
          aTag.nextSliding
        );
      });
    }

    // zennの場合
    if (aTag.href.match(/https:\/\/zenn.dev\//) && hoge == 0) {
      const url = aTag.href;
      chrome.runtime.sendMessage({ url }, (res) => {
        const parent = aTag.parentElement;
        const likes = res.match(/likedCount":([0-9]*),/);
        const likeCount = likes[1];
        parent.insertBefore(
          createCountElement("fa-thumbs-up", likeCount),
          aTag.nextSliding
        );
      });
    }
  });
};
