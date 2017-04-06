/**
 * Created by Administrator on 2016/6/9.
 */
//注册控制器
angular.module("loveAmoy")
    .constant("guessUrl","server/guessData.json")
    .controller("findCtrl", function ($rootScope,guessUrl,$scope,$http,$ionicLoading) {
        //隐藏首页的“移到顶部”按钮
        $rootScope.moveTop = false;
        $scope.guess = [];
        //定义变量，保存选中商品的ID
        $scope.selGoodID = "";
        //显示网络加载指示器
        $ionicLoading.show();
        //下拉刷新
        $scope.doRefresher = function () {
            //加载数据
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
        $scope.selectGood = function (id) {
            $scope.selGoodID = id;
        }
    });