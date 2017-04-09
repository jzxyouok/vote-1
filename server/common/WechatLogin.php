<?php
/**
 * Created by PhpStorm.
 * User: ZhangHao
 * Date: 2017/4/9
 * Time: 19:10
 */
include_once "../common/appConfig.php";
include_once "../common/curl.lib.php";

class wechatLogin{
    public static function getSessionKey($jsCode){
        $queryUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . appConfig::$appId .  '&secret=' . appConfig::$appSecret . '&js_code=' . $jsCode .  '&grant_type=authorization_code';
        return Curl::callWebServer($queryUrl, '');
    }
}