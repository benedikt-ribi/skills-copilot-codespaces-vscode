function skillsMember() {
    return {
        name: 'skillsMember',
        restrict: 'E',
        scope: {
            member: '='
        },
        templateUrl: 'app/member/skillsMember.html',
        controller: function ($scope) {
            $scope.skills = $scope.member.skills;
        }
    };
}