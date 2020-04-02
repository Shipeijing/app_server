const Redis = require('ioredis')
const newRedis = new Redis({
	port: 6379, // Redis port
	host: '127.0.0.1', // Redis host
	prefix: 'shi:', //存诸前缀
	ttl: 60 * 60 * 23, //过期时间   
	family: 4,
	db: 0
})

function getRedis(key) {
	return new Promise(function(resolve, reject) {
		newRedis.get(key, function(err, result) {
			if (err) reject(err)
			console.log(result)
			resolve(result);
		});
	})
};
newRedis.getRedis = getRedis
module.exports.newRedis = newRedis
