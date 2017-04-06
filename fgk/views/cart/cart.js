/**
 * Created by Administrator on 2016/6/9.
 */
//注册控制器
angular.module("loveAmoy")
    .constant("cartShopUrl","server/cartShopData.json")
    .constant("cartUrl","server/cartData.json")
    .controller("cartCtrl", function ($rootScope,$scope,$http,cartShopUrl,cartUrl){
        //隐藏首页的“移到顶部”按钮
        $rootScope.moveTop = false;
        //请求店铺信息
        $http.get(cartShopUrl).success(function (data) {
            $scope.cartShop = data;
        });
        //请求购物车商品信息
        $http.get(cartUrl).success(function (data) {
            $scope.cart = data;
        });
        //购物车数量增减
        $scope.inputNum = 1;
        $scope.addOrMinusNum = function (type) {
            if(type == "add"){
               $scope.inputNum ++;
            }else{
                if($scope.inputNum>1){
                    $scope.inputNum --;
                }
            }
        }
    });