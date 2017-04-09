<?php
/**
 * Created by PhpStorm.
 * User: ZhangHao
 * Date: 2017/4/9
 * Time: 13:43
 */
include_once "../dao/rankItem.php";

header("Content-type: text/html; charset=utf8");
$con = mysqli_connect("localhost","root","root","vote");
if (mysqli_connect_errno($con)) {
    $ret = json_encode([
        "code" => "01",
        "msg" => "获取排名失败",
        "data" => []
    ]);
}
else{
    $result = mysqli_query($con,"SELECT PAPER_INDEX, NAME, VOTE_NUM FROM tbl_paper ORDER BY VOTE_NUM DESC");
    $data = array();
    while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
        $paperItem = new paperItem();
        $paperItem->paper_index = $row["PAPER_INDEX"];
        $paperItem->name = $row["NAME"];
        $paperItem->vote_num = $row["VOTE_NUM"];
        array_push($data,$paperItem);
    }
    mysqli_close($con);

    $ret = json_encode([
        "code" => "00",
        "msg" => "获取排名成功",
        "data" => $data
    ]);
}

echo $ret;