var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require("request");
var app = express();
var session = require('express-session')({
	key: 'user_sid',
	secret: 't067t68PxfWbvY8JoGiYZCWJk0FFrOZB',
	resave: true,	// <-- This was false, before adding io session middleware
	saveUninitialized: true,	// <-- This was false, before adding io session middleware
	cookie: {
	  // maxAge: 600000
	  maxAge: 86400000
	}
});
var sharedsession = require("express-socket.io-session");

// Environment Variables
require('dotenv').config();
console.log('\n\nRESTARTING gregorywhitman.dev!!!');

const
  admin = new (require('./bin/admin'))
  port = 8040;
  ;

// Socket.io server
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);
// Socket handlers
io.on('connection',function(socket){
	initUserConnection(socket);
	userConnected(socket);
});
// httpServer.listen(8080);
httpServer.listen(port, () => {
	console.log(`Listening at http://0.0.0.0:${port}`);
});

// Routes
const
  indexRouter = require('./routes/index'),
  mainRouter = require('./routes/mainpage'),
  pathfindingGaRouter = require('./routes/pathfinding-ga'),
  wordmatchingGaRouter = require('./routes/wordmatching-ga'),
  userRouter = require('./routes/user'),
  notFoundRouter = require('./routes/notFound')
  ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Session
app.use(session);
io.use(sharedsession(
	session,
	{ autoSave:true } 
));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Hooking it up
app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/pathfinding-ga', pathfindingGaRouter);
app.use('/wordmatching-ga', wordmatchingGaRouter);
app.use('/user', userRouter);
app.use('*', notFoundRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function userConnected(socket){
	// Get a token and assign it to the user, before we do anything else
	admin.getToken(function(token){
		// console.log(socket);
		setSocketData(socket,'uid',token);
		// console.log(socket);
	});
}

let userDataLoc = ['_uniqueData'];
function setSocketData(socket,key,val){
	if(!socket) return 'err: No socket defined';
	if(!socket[userDataLoc]) socket[userDataLoc] = [];
	socket[userDataLoc].key = val;
	return socket[userDataLoc].key;
}

// Handle requests from Socket.io
function initUserConnection(socket){
	socket
		.on('error',function(data){
			// let userdata = socket ? admin.getUserDataFromSocket(socket) : {};
			// let userid = userdata && userdata.id ? userdata.id : 0;
			// admin.log({
			// 	userid: userid,
			// 	type: 'socket error',
			// 	log: JSON.stringify({
			// 		data: data,
			// 		userdata: userdata
			// 	}),
			// 	isLive: isLive,
			// 	socket: socket,
			// });
		})
		.on('test socketio',function(data){
			admin.lets_test_socketIO(data,response =>{
				socket.emit('tested socketio',response);
			});
        })
		.on('send contact email',function(data){
			admin.send_contact_email(data,response =>{
				socket.emit('contact email sent',response);
			});
		})
	  ;
}