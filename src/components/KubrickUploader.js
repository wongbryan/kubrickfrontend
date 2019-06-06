import React from "react";
import ImageUploader from "react-images-upload";
import Loading from "./Loading";
import { encodePicture, encodeText } from "../api/api";
import { Form, TextArea } from "react-form";

class KubrickUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      textValue: "",
      loading: false,
      err: null,
      res: null
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(pictures) {
    this.setState({
      pictures: this.state.pictures.concat(pictures[0])
    });
  }

  async handleSubmit() {
    if (this.state.pictures.length === 1) {
      this.setState({ err: "Please upload at least one image." });
    }
    this.setState({
      err: null,
      loading: true
    });
    console.log(this.state);
    if (this.state.pictures.length === 2) {
      // if encoding picture
      console.log("encoding picture");
      const res = await encodePicture(
        this.state.pictures[0],
        this.state.pictures[1]
      );
      console.log(res);
      if (res.err) {
        this.setState({ err: res.err, loading: false });
      } else {
        console.log(res);
        this.setState({ res: res.data, loading: false });
      }
      return;
    } else if (this.state.pictures.length === 1) {
      // if encoding text or binary
    }
  }

  render() {
    return (
      <div className="main">
        <h1>Kubrick</h1>
        <p>A least significant bit image encoder.</p>
        {!this.state.loading && (
          <div>
            <ImageUploader
              className="uploader"
              onChange={this.onChange}
              imgExtension={[".png"]}
              label="Max file size: 5mb, accepted: png"
              singleImage={true}
              withPreview={true}
            />
            <textarea
              value={this.state.textValue}
              onChange={e => this.setState({ textValue: e.target.value })}
            >
              Hello
            </textarea>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        )}
        {this.state.loading && <Loading />}
        {this.state.err && (
          <div className="error">
            <p>
              {"There was an error: " + this.state.err + ". Please try again"}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default KubrickUploader;
