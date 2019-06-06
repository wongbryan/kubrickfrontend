const API_URL = 'http://localhost:5000/api';

// Takes a picture File object and sends a post
const upload = async (picture) => {
	try {
		console.log(picture);
		const fd = new FormData();
		fd.append('carrier', picture, 'to_encode.blob');
		const res = await fetch(API_URL + '/image_encode', {
			method: 'POST',
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
