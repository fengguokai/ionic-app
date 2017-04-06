/**
 * Created by hxsd on 2016/6/8.
 */
//注册控制器
angular.module("loveAmoy")
    .constant("activeClass","energized-bg light")
    .controller("microCtrl", function ($rootScope,$scope,$http,activeClass){
        //隐藏首页的“移到顶部”按钮
        $rootScope.moveTop = false;
        var rootClassUrl = "server/rootClassData.json";
        var secondClassUrl = "server/secondClassData.json";
        var thirdClassUrl = "server/thirdClassData.json";
        $scope.rootClass = [];
        $scope.secondClass = [];
        $scope.thirdClass = [];
        $scope.selectfID = "r001";   //默认设置为热门推荐
        $scope.fSecondID = "";
        //向服务器请求数据(一级分类)
        $http.get(rootClassUrl)
            .success(function (data) {
                $scope.rootClass = data;
            })
            .error(function () {
        });
        //向服务器请求数据(二级分类)
        $http.get(secondClassUrl)
            .success(function (data) {
                $scope.secondClass = data;
            })
            .error(function () {
        });
        //向服务器请求数据(二级分类)
        $http.get(thirdClassUrl)
            .success(function (data) {
                $scope.thirdClass = data;
            })
            .error(function () {
        });
        //为一级分类的项目注册单击事件
        $scope.selectRootClass = function (fID) {
            $scope.selectfID = fID;
        }
        //设置选中项的样式
        $scope.activeClass = function (fID) {
            return $scope.selectfID == fID ?activeClass:"";
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