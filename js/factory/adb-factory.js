uno.factory('adbFactory', function(){
    var fact = {};
    fact.get = function(http, query, isAll) {
        return http.post('php/adb/adb.php', {'query': query, 'all': isAll});
    };
    fact.add = function(){
        return 1;
    };
    fact.update = function(){
        
    };
    
    return fact;
});