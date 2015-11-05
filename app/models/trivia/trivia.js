import Backbone from 'backbone';
import _ from 'underscore';

var Trivia = Backbone.Model.extend({
	defaults: {
		body: '',
		location: {},
	},
	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/classes/Trivia',

	toJSON(options) {
    if(options) {

      return _.extend({}, this.attributes, {
        town: {
          "__type": "Pointer",
          "className": "Town",
          "objectId": this.get('town').objectId
        },
      });
    } else {
      return _.clone(this.attributes);
    }
  }
});



export default Trivia;