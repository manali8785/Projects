var app=angular.module('candidateApp',['xeditable']);
app.controller('mainController',function($scope,$http){
    $scope.listCandidates=function(){
        console.log("----------Listing candidates----------")
        $http.get("http://192.168.1.21:3000/contacts").then(function(config){
            $scope.candidates=config.data.result.reverse();
        },function(config){
            console.log('There was an error');
        });
    }

    $scope.save=function(cand){
        console.log("----------Saving candidates----------")
        $http.put("http://192.168.1.21:3000/contacts/"+cand._id,cand).then(function(config){
            console.log(config);
        },function(config){
            console.log('There was an error');
        });
    }


    $scope.user = {}; // initialization

    $scope.submitForm=function(isValid){

        if(isValid) {
            console.log('-----Form is VALID!------');
            $http.post("http://192.168.1.21:3000/contacts", $scope.user).then(function(config){
                console.log(config.data);
                $scope.candidates.unshift(angular.copy($scope.user));
                $scope.user = {};
            }, function(config){
                console.log('There was an error');
            });
        }else{
            console.log('-----Form is INVALID!-------');
        }

    }

});