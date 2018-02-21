
console.log("hi hello");
app.controller('commentSync',['$scope','$http',function($scope,$http){
  
  $scope.comment="";
  console.log("inside commentSync")
  $scope.fetchComment = function(req,res){
    
    console.log("calling fetch comment method");
    $http({
                method  : 'GET',
                url     : __appurl + "comment/fetch",
                data:{},
                headers : { 'Content-Type': 'application/json' }  
    }).then(function (success){
      console.log("success"+JSON.stringify(success));
      $scope.comment=success.comment;
    },function (error){
      console.log("error"+JSON.stringify(error));      
    });
    
  }
  $scope.updateComment = function(req,res){
    
    console.log("calling update comment method");
    console.log($scope.comment);
    $http({
                method  : 'POST',
                url     : __appurl + "comment/sync",
                data    : {comment:$scope.comment},
                headers : { 'Content-Type': 'application/json' }  
            }).then(function (success){
              console.log("success:"+JSON.stringify(success));
            },function (error){
              console.log("error:"+error);
            });
    
  }
}]);