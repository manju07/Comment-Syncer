
console.log("hi hello");
app.controller('commentSync',['$scope','$http',function($scope,$http){
  
  $scope.comment="";
  console.log("inside commentSync")
  $scope.fetchComment = function(req,res){
    
    console.log("calling fetch comment method");
    $http({
                method  : 'GET',
                url     : __appurl + "comment/fetch",
                headers : { 'Content-Type': 'application/json' }  
    });
            // }).success(function(data) { 
            	
            //    $scope.comment = data.comment;
            //    console.log("data.comment:"+data.comment);
            // });
    
  }
  $scope.updateComment = function(req,res){
    
    console.log("calling update comment method");
    console.log($scope.comment);
    $http({
                method  : 'POST',
                url     : __appurl + "website/spacehistorydetails",
                data    : {comment:$scope.comment},
                headers : { 'Content-Type': 'application/json' }  
            })
            .success(function(data) { 
              console.log(JSON.stringify(data));
            });
    
  }
}]);