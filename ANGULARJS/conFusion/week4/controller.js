'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = true;
        $scope.message = "Loading ...";
        $scope.dishes = menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });

        //$scope.dishes= menuFactory.getDishes();
        console.log( $scope.dishes);

        $scope.select = function(setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])



    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        $scope.dish = {};
        $scope.showDish = true;
        $scope.message="Loading ...";
        $scope.dish=
            menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
    }])


    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {


        $scope.submitComment = function () {

            //Step 2: This is how you record the date
            //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
            $scope.comment.date = new Date().toISOString();console.log($scope.comment);
            // Step 3: Push your comment into the dish's comment array
            //$scope.dish.comments.push("Your JavaScript Object holding the comment");
            $scope.dish.comments.push($scope.comment);
            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            //Step 4: reset form to pristine
            $scope.commentForm.$setPristine();
            //Step 5: reset JavaScript object that holds your comment
            $scope.comment = {author: "", rating: 5, comment: "", date: new Date().toISOString()};
            //console.log($scope.comment);
        }
    }])


    .controller('IndexController', ['$scope', 'menuFactory','corporateFactory', function($scope, menuFactory, corporateFactory) {


        $scope.showDish = false;
        $scope.message="Loading ...";
        $scope.dish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

        $scope.promotions = menuFactory.getPromotions().get({id:0})
            .$promise.then(
                function(response){
                    $scope.promotions = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
        $scope.leaders= corporateFactory.getLeaders().get({id:0})
            .$promise.then(
                function(response){
                    $scope.leaders = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

    }])


    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

        $scope.leaders = {};
        $scope.leaders= corporateFactory.getLeaders().query()
            .$promise.then(
                function(response){
                    $scope.leaders = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

        $scope.feedbacks = feedbackFactory.getFeedbacks().query();

        $scope.sendFeedback = function() {

            console.log($scope.feedback);

            feedbackFactory.getFeedbacks().create($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
            console.log($scope.feedbacks);
        };
    }])


;

/*
 .controller('FeedbackController', ['$scope', function($scope) {

 $scope.sendFeedback = function() {

 console.log($scope.feedback);

 if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
 $scope.invalidChannelSelection = true;
 console.log('incorrect');
 }
 else {
 $scope.invalidChannelSelection = false;
 $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
 $scope.feedback.mychannel="";
 $scope.feedbackForm.$setPristine();
 console.log($scope.feedback);
 }
 };
 }])

 */