import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import Jitsi from "react-jitsi";
import { fetchStream } from "../../actions";

const roomName = "my-super-1231241-fwefwe-123e4567-e89b-12d3-a456-426655440000";
const userFullName = "Nikunj Dalsaniya";

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    if (this.props.stream) {
      this.player = flv.createPlayer({
        type: "flv",
        url:
          process.env.NODE_ENV === "test" ||
          process.env.NODE_ENV === "development"
            ? `http://localhost:8000/live/${id}.flv`
            : "",
      });
      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
        {/* <Jitsi roomName={roomName} displayName={userFullName} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
