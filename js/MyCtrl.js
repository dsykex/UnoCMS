uno.controller('CustomCtrl', function($location, $timeout, $scope, $http, _uno, $rootScope){
    $scope.isStatic = Configs.isStatic;
    
    var calcPos = function(){
        var elem = document.getElementById('sidebar');
        elem.style.position = 'relative';
        elem.style.top = window.pageYOffset;
    };
    
    window.addEventListener('scroll', calcPos);
    
    $scope.goToElement = function(id){
        var elem =  document.getElementById(id);
        var body = document.body.scrollHeight;
        console.log(body);
        
        elem.scrollIntoView(true);
        elem.style.opacity = 1;
    }
    
    $scope.getChildLength = function(id, db){
        return $scope.$parent[db].filter(function(value){ return (value.parent_id == id)});
    };
    
    $scope.getObject = function(db, col, val){
        return $scope[db].filter(function(value){ return (value[col] == val)})[0];
    };
});