const API_URL = "http://localhost:3001";

// Takes a picture File object and sends a post
const upload = async picture => {
  try {
    console.log(picture);
    const fd = new FormData();
    fd.append("upl", picture, "image.blob");
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

export { upload };
