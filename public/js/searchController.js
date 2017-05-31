angular.module("BookBuddiesMod")
    .controller("searchController", function($scope, $location, apiService, dbService, $uibModal){

        $scope.status = dbService.getStatus();

        $scope.user = dbService.getCurrentUser();

        $scope.library = [];

        $scope.watchlist = [];

 		$scope.list = [];

        dbService.getLibrary($scope.user).then(function(response) {
            $scope.library = response;
        });

        dbService.getWatchlist($scope.user).then(function(response) {
            $scope.watchlist = response;
        });

        $scope.setSearch = function(search){
            apiService.setSearchedBooks(search)
                .then(function() {
                	$scope.list = [];
                    $location.path("/searchResults");
                    $scope.showResults();
                });
            $scope.search = null;
        }


        $scope.showResults = function(){

          var books = apiService.getSearchedBooks();

          books.items.forEach(function(book) {
              $scope.list.push(
                {
                    author: book.volumeInfo.authors[0],
                    thumbnail: book.volumeInfo.imageLinks.thumbnail,
                    title: book.volumeInfo.title,
                    description: book.volumeInfo.description});
          });
          console.log($scope.list);
        }

        $scope.addToLibrary = function (book) {
        	var entry = {
        		username: $scope.user,
        		title: book.title,
        		author: book.author,
        		description: book.description,
        		thumbnailurl: book.thumbnail
        	}
        	dbService.addToLibrary(entry);
          alert("Book Successfully Added to Library");
        }

        $scope.addToWatchlist = function (book) {
        	var entry = {
        		username: $scope.user,
        		title: book.title,
        		author: book.author,
        		description: book.description,
        		thumbnailurl: book.thumbnail
        	}
        	dbService.addToWatchlist(entry);
          alert("Book Successfully Added to Watchlist");
        }

        $scope.logOut = function() {
            dbService.setStatus(false);
            dbService.setCurrentUser(null);
            $location.path('/login');
        }
    });
