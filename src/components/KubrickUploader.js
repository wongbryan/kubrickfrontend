import React from "react";
import ImageUploader from "react-images-upload";
import Loading from "./Loading";
import { upload } from "../api/api";

class KubrickUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      loading: false,
      err: null,
      res: null
    };
    this.onChange = this.onChange.bind(this);
  }

  async onChange(pictures) {
    if (pictures.length === 0) {
      return;
    }
    this.setState({
      err: null,
      pictures: this.state.pictures.concat(pictures[0]),
      loading: true
    });
    const res = await upload(pictures[0]);
    if (res.err) {
      console.log(res.err);
      this.setState({ err: res.err, loading: false });
    } else {
      this.setState({ res: res.data, loading: false });
    }
  }

  render() {
    return (
      <div className="main">
        <h1>Kubrick</h1>
        <p>A least significant bit image encoder.</p>
        {!this.state.loading && (
          <ImageUploader
            className="uploader"
            onChange={this.onChange}
            imgExtension={[".png"]}
            label="Max file size: 5mb, accepted: png"
            singleImage={true}
            withPreview={true}
          />
        )}
        {this.state.loading && <Loading />}
        {this.state.err && (
          <div className="error">
            <p>
              {"There was an error uploading your file: " +
                this.state.err +
                ". Please try again"}
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default KubrickUploader;
