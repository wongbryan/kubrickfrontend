const API_URL = "http://localhost:3001";

// Takes a picture File object and sends a post
const upload = async picture => {
  try {
    const res = await fetch(API_URL + "/upload", {
      method: "POST",
      body: JSON.stringify(picture)
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
