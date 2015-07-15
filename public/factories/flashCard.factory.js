app.factory('FlashCardFactory', function($http) {
  return {
    getFlashCards: function(cat) {
      var config = {};
      if (cat) config.params = {
        category: cat
      };
      return $http.get('/cards', config)
        .then(function(res) {
          return res.data;
        });
    },
    getFlashCard: function(id) {
      return $http.get('/cards/' + id).then(function(res) {
        return res.data
      })
    },
    getCategories: function() {
      return [
        'MongoDB',
        'Express',
        'Angular',
        'Node'
      ]
    },
    create: function(cardData) {
      return $http.post('/cards', cardData)
        .then(function(res) {
          return res.data;
        });
    },
    edit: function(card) {
      return $http.put('/cards/' + card._id + '/edit', card)
        .then(function(res) {
          return res.data;
        })
    },
    deleteIt: function(id) {
        return $http.delete('/cards/' + id + '/delete')
          .then(function(res) {
            return res.data;
          })
      }
      // Card: function () {
      //   this.answers = [{correct: true}, {correct: false}, {correct: false}];
      // }
  }
})