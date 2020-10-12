<?php
$newstyle='gcal.css';
$url="https://calendar.google.com/calendar/embed?src=81dl7rvf67aiuu4uf5cmu4o9ac%40group.calendar.google.com&ctz=America%2FNew_York";
$ch=curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,0);
$buffer=curl_exec($ch);
curl_close($ch);
$search = '/(<link.*>)/';
$replacement = '<link rel="stylesheet" type="text/css" href="' . $newstyle . '" />';
$buffer = preg_replace($search, $replacement, $buffer);
$buffer=str_replace('/calendar/_','https://calendar.google.com/calendar/_',$buffer);
$buffer=str_replace('<script>function _onload()','<script>function _onload()',$buffer);
$buffer=str_replace('<script type="text/javascript" src="//www.google.com/calendar/','<script type="text/javascript" src="https://www.google.com/calendar/',$buffer);
$buffer=str_replace('"baseUrl":"/"','"baseUrl":"https://www.google.com/"',$buffer);
echo $buffer;
?>
