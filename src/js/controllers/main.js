
module.exports = ['$scope', '$window', 'bumpkit', function($scope, $window, bumpkit) {

  $scope.bumpkit = bumpkit;

  $scope.currentStep = 0;

  $window.addEventListener('step', function(e) {
    if(!$scope.$$phase) {
      $scope.$apply(function() {
        $scope.currentStep = e.detail.step;
      });
    }
  });


}];
