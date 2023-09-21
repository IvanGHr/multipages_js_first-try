export default class PostData {
	constructor(url, data) {
		this.url = url
		this.data = data
	}

	async postData(url, data) {
		let result = await fetch(url, {
			method: 'POST',
			body: data,
		})

		return await result.text();
	}
}