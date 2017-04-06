/**
 * Created by hxsd on 2016/6/7.
 */
/**
 * Created by hxsd on 2016/6/7.
 */
//注册控制器
angular.module("loveAmoy")
    .constant("guessUrl","server/guessData.json")
    .controller("homeCtrl", function ($scope,guessUrl,$ionicSlideBoxDelegate,$ionicScrollDelegate,$http,$ionicLoading,$rootScope) {
     //var guessUrl = "server/guessData.json";
     $scope.guess = [];
    //显示网络加载指示器
    $ionicLoading.show();
    //下拉刷新
    $scope.doRefresher = function () {
        //加载“猜您喜欢”数据
        $http.get(guessUrl)
            .success(function (data) {
                //隐藏网络加载指示器
                $ionicLoading.hide();
                $scope.guess = data; //替换数据
            })
            .error(function (err) {
                $ionicLoading.show({
                    template:"无法加载商品信息，请稍后重试...",
                    duration:3000
                });
            })
            .finally(function () {
                $scope.$broadcast("scroll.refreshComplete");
            });
    };
    //页面初始化时加载数据
    $scope.doRefresher();
    //无限滚动
    $scope.loadMore = function(){
        $http.get(guessUrl)
            .success(function (data) {
                //根据无限滚动滚动的高度控制“移到顶部”显示与隐藏
                if($ionicScrollDelegate.getScrollPosition()){
                    if($ionicScrollDelegate.getScrollPosition().top>0){
                        console.log($ionicScrollDelegate.getScrollPosition().top);
                        $rootScope.moveTop = true;
                    }else{
                        $rootScope.moveTop = false;
                    }
                };
                Array.prototype.push.apply($scope.guess,data);
            })
            .error(function () {
                
            })
            .finally(function () {
                $scope.$broadcast("scroll.infiniteScrollComplete");
            });
    };
    //页面初始化时加载数据
    $scope.loadMore();
    //无限滚动时，为标题栏注册点击事件（回到顶部）
    $rootScope.ScrollTop = function () {
        $ionicScrollDelegate.scrollTop();
        $rootScope.moveTop = false;
    }
});

//自定义过滤器，“猜您喜欢”偶数行筛选
angular.module("loveAmoy").filter("evenFilter", function (){
    return function (items,flag) {
        var newArr = [];
        //遍历items
        if(items){
            if(flag){ //偶数行
                    for(var i=0;i<items.length;i++){
                        if(i%2==0){
                            newArr.push(items[i]);
                        }
                    }
            }else{ //奇数行
                    for (var i = 0; i < items.length; i++) {
                        if (i % 2 == 1) {
                            newArr.push(items[i]);
                        }
                    }
            }
        }
        return newArr;
    }
});