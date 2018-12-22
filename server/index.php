<?php

// curlを叩くマナーとして遅延入れておきましょうね。
sleep(1);
$url = $_GET['url'];
$like_cnt = shell_exec('curl -s '.$url.' | tr "<" "\n" |grep "it-Actions_likeCount" | sed "s/a.*>//g"');
echo $like_cnt;
