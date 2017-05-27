angular.module("BookBuddiesMod")
    .controller("signupController", function($scope, apiService, dbService, $location){

    	$scope.status = dbService.getStatus();

    	if($scope.status) {
    		$location.path('/home');
    	}

    	$scope.userAvailable = true;

    	// if ($scope.status) {
    	// 	$location.path('/home');
    	// }

	    $scope.submitForm = function(userInfo) {
	    	dbService.checkUser(userInfo.username).then(function(response) {
	    		if(response === "Username available") {
	    			$scope.userAvailable = true;
	    			dbService.newUser(userInfo).then(function() {
	    				$scope.newUser = {};
	    				//Log user in!!!!!
	    				dbService.setCurrentUser(userInfo.username);
	    				dbService.setStatus(true);
	    				$location.path('/home');
	    			}).catch(function(error) {
	    				console.log('something went wrong...');
	    			})
	    		} else {
	    			$scope.userAvailable = false;
	    		}
	    	})
	    }
    });
