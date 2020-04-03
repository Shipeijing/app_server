const jwt = require('jsonwebtoken')
const SECRET = 'jsonwebtoken2020'
const token={
	getToken:async (user)=>{
		const data = {
			id: user.id,
			name: user.name
	
		}
		let token = await jwt.sign(data, SECRET, {
			expiresIn: '1day'
		})
		return token
	},
	verification: async (data)=>{
		let payload =await jwt.verify(data, SECRET)
		console.log(payload)
	}
}


module.exports = token
