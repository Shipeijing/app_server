module.exports = (ctx) => {
	    /**接收消息*/
	    ctx.websocket.on('message', function (message) {
	        console.log(message);
	        let data = JSON.stringify({
	            id: Math.ceil(Math.random()*1000),
	            time: parseInt(new Date()/1000)
	        })
	        ctx.websocket.send(data);
	    })
}