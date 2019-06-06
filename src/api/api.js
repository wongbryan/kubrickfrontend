const API_URL = "http://localhost:3001";

// Takes a picture File object and sends a post
const encodePicture = async (carrier, picture) => {
  try {
    const fd = new FormData();
    fd.append("carrier", carrier, "carrier.blob");
    fd.append("picture", picture, "picture.blob");
    const res = await fetch(API_URL + "/upload", {
      method: "POST",
      body: fd
    });
    return {
      err: null,
      data: res
    };
  } catch (err) {
    return {
      err
    };
  }
};

const encodeText = async (picture, text) => {
  try {
    const fd = new FormData();
    fd.append("upl", picture, "encodingImage.blob");
    const res = await fetch(API_URL + "/upload", {
      method: "POST",
      textValue: text,
      body: fd
    });
    return {
      err: null,
      data: res
    };
  } catch (err) {
    return {
      err
    };
  }
};

export { encodePicture, encodeText };
