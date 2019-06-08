const API_URL = "http://localhost:5000/api";

// Takes a picture File object and sends a post
const encodePicture = async picture => {
  try {
    const fd = new FormData();
    // fd.append("carrier", carrier, "carrier.blob");
    fd.append("picture", picture, "picture.png");
    const res = await fetch(API_URL + "/image_encode", {
      method: "POST",
      body: fd
    });
    console.log(res);
    const res_parsed = await res.blob();
    if (res_parsed.err) {
      throw new Error(res_parsed.err);
    }
    return {
      err: null,
      data: res_parsed
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
    const res = await fetch(API_URL + "/text_encode", {
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

const decodePicture = async picture => {
  try {
    const fd = new FormData();
    // fd.append("carrier", carrier, "carrier.blob");
    fd.append("encoded_img", picture, "encoded_img.png");
    const res = await fetch(API_URL + "/image_decode", {
      method: "POST",
      body: fd
    });
    console.log(res);
    const res_parsed = await res.blob();
    if (res_parsed.err) {
      throw new Error(res_parsed.err);
    }
    return {
      err: null,
      data: res_parsed
    };
  } catch (err) {
    return {
      err
    };
  }
};

export { encodePicture, encodeText, decodePicture };
