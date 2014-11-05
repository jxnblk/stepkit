
module.exports = ['$scope', function($scope) {
  //console.log('SequencerCtrl');

  $scope.steps = [];
  for (var i = 0; i < 16; i++) {
    $scope.steps.push(i);
  }

}];
