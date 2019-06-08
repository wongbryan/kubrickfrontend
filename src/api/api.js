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

const encodeText = async text => {
  try {
    const body = { text };
    const res = await fetch(API_URL + "/text_encode", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
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

const decodeText = async picture => {
  try {
    const fd = new FormData();
    // fd.append("carrier", carrier, "carrier.blob");
    fd.append("encoded_img", picture, "encoded_img.png");
    const res = await fetch(API_URL + "/text_decode", {
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

export { encodePicture, encodeText, decodePicture, decodeText };
