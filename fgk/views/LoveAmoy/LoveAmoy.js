/**
 * Created by hxsd on 2016/6/7.
 */
//注册控制器
angular.module("loveAmoy").controller("LoveAmoyCtrl", function ($scope,$ionicSlideBoxDelegate,$state) {
    //最后一张引导图滑动完即进入home页
    $scope.swipeLeft = function () {
        if( $ionicSlideBoxDelegate.currentIndex() == $ionicSlideBoxDelegate.slidesCount()-1){
            $state.go("tabs.home");
        }
    }
    //跳过引导页
    $scope.skip = function () {
        $state.go("tabs.home");
    }
});