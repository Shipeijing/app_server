const UserServer = require('../serves/user.js')
module.exports = {
	 login:async (ctx, next) => {
		 let data ={}
		await UserServer.login(ctx.util.mysql,data).then(res=>{
			 ctx.body = res;
		})
	}
}
