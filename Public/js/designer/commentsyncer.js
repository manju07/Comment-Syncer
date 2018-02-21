
console.log("hi hello");
app.controller('commentSync',['$scope','$http',function($scope,$http){
  
  $scope.comment="";
  console.log("inside commentSync")
  $scope.fetchComment = function(req,res){
    
    console.log("calling fetch comment method");
    // $http({
    //             method  : 'POST',
    //             url     : __appurl + "website/spacehistorydetails",
    //             data    : {status:"1"},
    //             headers : { 'Content-Type': 'application/json' }  
    //         })
    //         .success(function(data) { 
            	
    //         	 $scope.getdetails = data.Searched_details;
             
              

    //         });
    
  }
  $scope.updateComment = function(req,res){
    
    console.log("calling update comment method");
    console.log($scope.comment);
    // $http({
    //             method  : 'POST',
    //             url     : __appurl + "website/spacehistorydetails",
    //             data    : {status:"1"},
    //             headers : { 'Content-Type': 'application/json' }  
    //         })
    //         .success(function(data) { 
            	
    //         	 $scope.getdetails = data.Searched_details;
             
              

    //         });
    
  }
}]);