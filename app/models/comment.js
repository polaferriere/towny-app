import Backbone from 'backbone';
import _ from 'underscore';

const Comment = Backbone.Model.extend({
	idAttribute: 'objectId',
	defaults: {
		comment_on: {},
	},
	urlRoot: 'https://api.parse.com/1/classes/Comment',

	toJSON(options) {
    if(options) {

      return _.extend({}, this.attributes, {
        comment_on: {
          "__type": "Pointer",
          "className": "Trivia",
          "objectId": this.get('comment_on').objectId
        },
      });
    } else {
      return _.clone(this.attributes);
    }
  },
});

export default Comment;