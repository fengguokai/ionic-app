/**
 * Created by Administrator on 2016/6/9.
 */
//注册控制器
angular.module("loveAmoy")
    .controller("myLoveAmoyCtrl", function ($rootScope,$scope,$http) {
        //隐藏首页的“移到顶部”按钮
        $rootScope.moveTop = false;
    });