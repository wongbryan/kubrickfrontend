import React from "react";
import ImageUploader from "react-images-upload";
import Loading from "./Loading";
import {
  encodePicture,
  encodeText,
  decodePicture,
  decodeText
} from "../api/api";
import download from "downloadjs";
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
    this.handleEncode = this.handleEncode.bind(this);
    this.handleDecode = this.handleDecode.bind(this);
  }

  onChange(pictures) {
    this.setState({
      pictures
    });
  }

  async handleDecode() {
    if (this.state.pictures.length === 1) {
      this.setState({
        err: null,
        res: null,
        loading: true
      });
      let res;
      const decodingText = this.state.textValue !== "";
      if (decodingText) {
        res = await decodePicture(this.state.pictures[0]);
      } else {
        res = await decodeText(this.state.pictures[0]);
      }
      console.log(res);
      if (res.err) {
        this.setState({ err: res.err, loading: false });
      } else {
        if (decodingText) {
          download(res.data, "original.txt");
        } else {
          download(res.data, "original.png");
        }
        this.setState({ res: res.data, loading: false });
      }
    } else {
      this.setState({ err: "Please upload exactly one image to decode" });
    }
  }

  async handleEncode() {
    if (this.state.pictures.length === 1 && this.state.textValue === "") {
      // if encoding picture
      console.log("encoding picture");
      this.setState({
        err: null,
        res: null,
        loading: true
      });
      const res = await encodePicture(this.state.pictures[0]);
      console.log(res);
      if (res.err) {
        this.setState({ err: res.err, loading: false });
      } else {
        download(res.data, "result.png");
        this.setState({ res: res.data, loading: false });
      }
    } else if (
      this.state.pictures.length !== 1 &&
      this.state.textValue !== ""
    ) {
      // if encoding text
      this.setState({
        err: null,
        loading: true
      });
      const res = await encodeText(this.state.textValue);
      console.log(res);
      if (res.err) {
        this.setState({ err: res.err, loading: false });
      } else {
        console.log(res);
        download(res.data, "result.png");
        this.setState({ res: res.data, loading: false });
      }
    } else {
      this.setState({ err: "Invalid submission state" });
    }
  }

  render() {
    return (
      <div>
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
              <button onClick={this.handleEncode}>Encode</button>
              <button onClick={this.handleDecode}>Decode</button>
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
        <div className="instructions">
          <p>
            To decode an image: upload one image, do not enter text and hit
            decode.
          </p>
          <p>To encode an image: upload one image and hit encode.</p>
          <p>To encode text: enter text and hit encode.</p>
        </div>
      </div>
    );
  }
}

export default KubrickUploader;
