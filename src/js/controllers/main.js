
module.exports = [
  '$scope', '$window', 'bumpkit', 'loader',
  function($scope, $window, bumpkit, loader) {

  $scope.bumpkit = bumpkit;
  $scope.mixer = bumpkit.mixer;
  $scope.currentStep = 0;

  loader.init()
    .then(function(tracks) {
      $scope.tracks = bumpkit.tracks;
    });

  $window.addEventListener('step', function(e) {
    if(!$scope.$$phase) {
      $scope.$apply(function() {
        $scope.currentStep = e.detail.step;
      });
    }
  });


}];
