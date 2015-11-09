import React from 'react';
import { History } from 'react-router';
import _ from 'underscore';
import functions from 'functions';
import moment from 'moment';
import CommentForm from './comment-form';
import store from '../store';
import TriviaComments from './trivia-comments';
import {Glyphicon} from 'react-bootstrap';
import AddTrivia from './add-trivia';

const TriviaQuote = React.createClass({
	propTypes: {
		model: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func,
	},

	getInitialState() {
		return {
			isEditing: false,
			seeComments: false,
			commenting: false,
			comments: store.getTriviaComments(this.props.model.get('objectId')),
		}
	},

	componentWillMount() {
		this.state.comments.fetch().then(() => {
			this.setState({
				comments: this.state.comments
			})
		});
	},

	mixins: [History],

	handleDelete(e) {
		e.preventDefault();
		this.props.model.destroy({wait: true}).then(() => {
			this.props.onChange();
		});
	},

	handleEdit(e) {
		e.preventDefault();
		this.setState({
			isEditing: true,
		})
	},

	handleComment(e) {
		e.preventDefault();
		this.setState({
			commenting: true,
		});
	},

	seeComments() {
		this.state.seeComments ?
		this.setState({seeComments: false}) : this.setState({seeComments: true});
	},

	like() {
		let trivia = this.props.model;
		trivia.set('likes', trivia.get('likes')+1);
		trivia.save().then(() => {this.forceUpdate()})
	},

	onChange() {
		this.forceUpdate();
	},

	onSubmit() {
		this.setState({
			isEditing: false,
		});
		this.props.onChange();
	},

	render() {
		let body = this.props.model.get('body');
		let location = this.state.location;
		let created = this.props.model.get('createdAt');
		let triviaId = this.props.model.get('objectId');
		let commentLength = this.state.comments.length;
		let comments = this.state.comments
		let likes = this.props.model.get('likes');
		let creator = this.props.model.get('creator') || {};
		
		//TODO add code for when there are no comments
		return(
			<li className='trivia-quote'>
				{!this.state.isEditing && <h5 className='trivia-quote-text'>{body}</h5>}
				{this.state.isEditing && <AddTrivia triviaId={triviaId} onSubmit={this.onSubmit}/>}
				<div className="trivia-quote-sub-header">
					<Glyphicon 
						glyph='comment' 
						className='trivia-quote-sub-header-comments' 
						onClick={this.seeComments}>
						<span className='comment-length'>{commentLength}</span>
						Comments
					</Glyphicon>
					<Glyphicon 
						glyph='thumbs-up' 
						className='trivia-quote-sub-header-likes' 
						onClick={this.like}>
						<span className='likes'>{likes}</span>
					</Glyphicon>
					
					<p className='trivia-quote-date'>{moment(created, moment.ISO_8601).fromNow()}</p>
				</div>

				{this.state.seeComments && <TriviaComments comments={comments} triviaId={triviaId} onChange={this.onChange}/>}

				{creator.objectId == session.getUserId() && <div className="triva-quote-edit-buttons">
					<Glyphicon glyph='remove' className='trivia-quote-remove' onClick={this.handleDelete} />
					<Glyphicon glyph='pencil' className='trivia-quote-edit' onClick={this.handleEdit} />
				</div>}

			</li>
		)
	}
})

export default TriviaQuote;