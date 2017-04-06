/**
 * Created by Administrator on 2016/6/10.
 */
//注册控制器
angular.module("loveAmoy")
    .constant("colorUrl","server/colorData.json")
    .constant("commentUrl","server/commentsData.json")
    .constant("shopUrl","server/shopData.json")
    .constant("paramUrl","server/parameterData.json")
    .constant("activeColor","assertive-bg light")
    .controller("detailCtrl", function ($scope,$ionicModal,$http,colorUrl,commentUrl,shopUrl,paramUrl,activeColor){
        // 构造模式对话框
        $ionicModal.fromTemplateUrl('views/modal.html', {
            scope: $scope       // 作用域使用父作用域
        }).then(function(modal) {
            $scope.modal = modal;
        });
        //关闭选择颜色窗口
        $scope.closeColor = function () {
            $scope.modal.hide();
        }
        //请求颜色数据
        $scope.color = [];
        $http.get(colorUrl).success(function (data) {
            $scope.color = data.fColor;
        });
        //选中颜色给定新样式
        $scope.selColor = "";
        $scope.selectColor = function (item) {
            $scope.selColor = item;
        }
        $scope.activeClass = function (item) {
            return $scope.selColor == item ? activeColor:"";
        }
        //请求评论信息
        $scope.comment = {};
        $http.get(commentUrl).success(function (data) {
            $scope.comment = data;
        });
        //请求商铺信息
        $scope.shop = {};
        $http.get(shopUrl).success(function (data) {
            $scope.shop = data;
        });
        //请求商品参数
        $scope.parameter = [];
        $http.get(paramUrl).success(function (data) {
            $scope.parameter = data;
        });
        //注册事件
        $scope.state1 = true;
        $scope.state2 = false;
        $scope.setState = function (flag) {
            if(flag == 1){
                $scope.state1 = true;
                $scope.state2 = false;
            }else {
                $scope.state1 = false;
                $scope.state2 = true;
            }
        }
    });