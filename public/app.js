var app = angular.module('FlashCardApp', ['ui.router'])
  .config(function($stateProvider, $locationProvider) {
    $stateProvider
      .state('flashCard', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'templates/mainCtrl.html'
      })
      .state('addCard', {
        url: '/add',
        controller: 'AddCard',
        templateUrl: 'templates/addCard.html'
      })
      .state('manageCard', {
        url: '/cards/:id',
        controller: 'ManageCardCtrl',
        templateUrl: 'templates/manageCard.html',
        resolve: {
          currentCard: function($stateParams, FlashCardFactory) {
            return FlashCardFactory.getFlashCard($stateParams.id)
          }
        }
      })
      .state('manageCard.edit', {
        url: '/edit',
        controller: 'ManageCardEditCtrl',
        templateUrl: 'templates/editCard.html',
      })
      .state('manageCard.delete', {
        url: '/delete',
        controller: 'ManageCardEditCtrl',
        template: '<div>Are you sure you want to delete this card?</div><button ng-click="deleteCard()">Delete really</button>'
      })

    $locationProvider.html5Mode(true)
  })

app.controller('ManageCardCtrl', function($scope, $state, currentCard) {
  $scope.currentCard = currentCard
  $scope.edit = function() {
    $state.go("manageCard.edit")
  }
})

app.controller('ManageCardEditCtrl', function($scope, $state, FlashCardFactory) {
  $scope.categories = FlashCardFactory.getCategories()

  $scope.editCard = function() {
    FlashCardFactory.edit($scope.currentCard)
      .then(function() {
        $state.go('flashCard')
      })
  }
  $scope.deleteCard = function() {
    // console.log("currentCard", $scope.currentCard)
    FlashCardFactory.deleteIt($scope.currentCard._id)
      .then(function() {
        $state.go('flashCard')
      })
  }
})