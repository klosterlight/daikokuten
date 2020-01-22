import React from "react";
import Moment from "moment";

export default class CommentBase extends React.Component {
	render() {
		return (
			<div className="comment-one">
				<div className="comment-one__single">
					<div className="comment-one__image">
						<div className="inner-block">

						</div>
					</div>
					<div className="comment-one__content">
						<div className="comment-one__content-top">
							<div className="comment-one__top-left">
								<h3 className="comment-one__author">{this.props.comment.userName}</h3>
								<p className="comment-one__date">{this.props.comment.postedAt.format("d MMM, YYYY", "es-MX")}
									<span className="comment-one__date-sep">.</span>
									{this.props.comment.postedAt.format("hh:mm a", "es-MX")}</p>
								<p className="comment-one__text">{this.props.comment.message}</p>
							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}
