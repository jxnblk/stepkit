
module.exports = ['$scope', '$window', 'bumpkit', function($scope, $window, bumpkit) {

  $scope.bumpkit = bumpkit;

  $scope.step = 1;

  $window.addEventListener('step', function(e) {
    if(!$scope.$$phase) {
      $scope.$apply(function() {
        $scope.step = e.detail.step + 1;
      });
    }
  });


}];
