app.controller('commentSync', ['$scope', '$http', function ($scope, $http) {
  let fetchComment = "";
  let SyncComment = "";
  $scope.comment = "";

  $scope.fetchComment = function (req, res) {

    console.log("calling fetch comment method");
    $http({
      method: 'GET',
      url: __appurl + "comment/fetch",
      data: {},
      headers: { 'Content-Type': 'application/json' }
    }).then(function (success) {
      console.log("success" + JSON.stringify(success.data.comment));
      $scope.comment = success.data.comment;
      fetchComment = success.data.comment;
    }, function (error) {
      console.log("error" + JSON.stringify(error));
    });

  };

  $scope.updateComment = function (req, res) {
    SyncComment = $scope.comment;
    console.log("calling update comment method");

    var dmp = new diff_match_patch();
    let result = dmp.diff_main(fetchComment, SyncComment);
    dmp.diff_cleanupSemantic(result);

    console.log("diff_main result:" + result);

    let tempComment = "";
    for (let i = 0; i < result.length; i++) {
      if (result[i][0] >= 0) {
        tempComment += result[i][1];
      }
    }
    console.log("tempComment:" + tempComment);

    $http({
      method: 'POST',
      url: __appurl + "comment/sync",
      data: { comment: tempComment },
      headers: { 'Content-Type': 'application/json' }
    }).then(function (success) {
      fetchComment = tempComment;
      console.log("success:" + JSON.stringify(success));
    }, function (error) {
      console.log("error:" + error);
    });

  };

}]);