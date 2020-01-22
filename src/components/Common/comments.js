import React from "react";
import { withFirebase } from 'components/Firebase';
import moment from "moment";
import Comment from './comment';

let refs = [];
class CommentsBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			comments: [],
			commentsRef: {},
			message: ""
		}
	}

	componentDidMount() {
		const commentsRef = this.props.firebase.getMessagesByActionId(this.props.auctionId);
		commentsRef.onSnapshot((querySnapshot) => {
			const comments = [];
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				let message = {
					message: data.message,
					userName: data.userName
				};
				if(data.postedAt)
					message.postedAt = moment.unix(data.postedAt.seconds);
				else
					message.postedAt = moment();
				comments.push(message);
			});

			this.setState({
				comments: comments
			});

			this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
		});
		this.setState({
			commentsRef: commentsRef
		});
	}

	componentWillUnmount() {
		if(this.state.commentsRef)
			this.state.commentsRef();
	}

	handleChange = (e) => {
		this.setState({
			message: e.target.value
		});
	}

	postMessage = (e) => {
		e.preventDefault();
		this.props.firebase.postMessageOnAuction(this.props.auctionId, this.state.message);
		this.setState({
			message: ""
		});
	}

	renderComments = () => {
		return this.state.comments.map((message, index) => {
			const ref = React.createRef();
			refs.push(ref);
			return (
				<Comment key={index} comment={message} ref={ref} />
			)
		})
	}

	render() {
		return (
			<React.Fragment>
				<div className="chatx mt-4 chatx-endline" ref={(el) => { this.messagesEnd = el; }}>
					<hr className="mb-3" />
					{this.renderComments()}
				</div>
				<form action="#" className="reply-form">
					<div className="row">
						<div className="col-lg-12">
							<textarea placeholder="Mensaje" className="reply-form__field" value={this.state.message} onChange={this.handleChange}></textarea>
							<button className="reply-form__btn thm-btn smllBtn" type="submit" onClick={this.postMessage}>Enviar</button>
						</div>
					</div>
				</form>
			</React.Fragment>
		)
	}
}

const Comments = withFirebase(CommentsBase);

export default Comments;
