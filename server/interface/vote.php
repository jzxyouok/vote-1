<?php
/**
 * Created by PhpStorm.
 * User: ZhangHao
 * Date: 2017/4/9
 * Time: 13:43
 */
$voter = $_GET["voter"];
$choices = $_GET["choices"];
$choicesArr = explode("_",$choices);

header("Content-type: text/html; charset=utf8");
$con = mysqli_connect("localhost","root","root","vote");
if (mysqli_connect_errno($con)) {
    $ret = json_encode([
        "code" => "01",
        "msg" => "连接数据库失败",
        "data" => []
    ]);
}
else{
    $sql1 = "SELECT COUNT(*) AS total FROM tbl_vote WHERE VOTER='" . $voter . "'";
    $result1 = mysqli_query($con,$sql1);
    $row = mysqli_fetch_array($result1,MYSQLI_ASSOC);
    $total = $row["total"];
    //已经投票
    if($total == "1"){
        $code = "02";
        $msg = "您已经投过票了，不能重复投票";
    }
    //未投票
    else{
        //记录选择结果
        $sql2 = "INSERT INTO tbl_vote (VOTER, CHOICES) VALUES ('" . $voter . "','" . $choices . "')";
        if(mysqli_query($con,$sql2)){
            //投票数目分别加1
            foreach ($choicesArr as $value){
                $sql3 = "SELECT VOTE_NUM FROM tbl_paper WHERE PAPER_INDEX=" . $value;
                $result3 = mysqli_query($con,$sql3);
                $row = mysqli_fetch_array($result3,MYSQLI_ASSOC);
                $vote_num = $row["VOTE_NUM"];
                $vote_num++;
                $sql4 = "UPDATE tbl_paper SET VOTE_NUM=" . $vote_num . " WHERE PAPER_INDEX=" . $value;
                mysqli_query($con,$sql4);
            }
            $code = "00";
            $msg = "投票成功，去看看投票结果！";
        }
        else{
            $code = "03";
            $msg = "记录投票结果失败";
        }
    }

    mysqli_close($con);

    $ret = json_encode([
        "code" => $code,
        "msg" => $msg,
        "data" => []
    ]);
}

echo $ret;