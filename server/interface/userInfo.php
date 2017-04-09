<?php
/**
 * Created by PhpStorm.
 * User: ZhangHao
 * Date: 2017/4/9
 * Time: 18:51
 */
include_once "../common/wechatLogin.php";

$code = $_GET["code"];
$session = wechatLogin::getSessionKey($code);
if($session && isset($session['openid']) && isset($session['session_key'])) {
    $ret = json_encode([
        "code" => $code,
        "msg" => $msg,
        "data" => [
            "openId" => $session['openid']
        ]
    ]);
    echo $ret;
}