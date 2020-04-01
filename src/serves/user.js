module.exports = {
	login: async (mysql, data, result) => {
		await mysql(`select * from user`).then(res => {
			result = res
		}).catch(error => {

		})
		return result
	}
}
