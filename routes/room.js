var express = require('express');
var router = express.Router();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const { route } = require('.');
const dbFile = path.join(__dirname, '/../chatroom.db');

let newRoom = '';

// for list
router.get('/', (req, res, next) => {
  var db = new sqlite3.Database(dbFile);
  db.all('SELECT r.*, u.nickname FROM room r left join user u on r.adminer = u.id;', [], (err, rows) => {
    res.render('rooms', {rooms: rows});
  });
  db.close();
});

router.get('/list', (req, res, next) => {

  var db = new sqlite3.Database(dbFile);

  db.all('SELECT r.*, u.nickname FROM room r left join user u on r.adminer = u.id;', [], (err, rows) => {
    res.json({code: 0, data: rows});
  });
  db.close();
});

// for create
router.get('/create', (req, res, next) => {
  res.render('create-room');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/../public/images/avatar'))
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '.png');
  }
});
var upload = multer({ storage: storage});

router.post('/create', upload.single('avatar'), function(req, res, next) {
  const {roomTitle, subject, brief, email, nickname} = req.body;
  const avatar = req.file;
  const userId = avatar.filename.substring(0, avatar.filename.indexOf('.png'));
  const roomId = uuidv4();

  var db = new sqlite3.Database(dbFile);
  db.serialize(() => {
    db.run("INSERT INTO room(id, name, subject, brief, adminer) VALUES (?, ?, ?, ?, ?)", 
      [roomId, roomTitle, subject, brief, userId]
    );

    db.run("INSERT INTO user(id, email, nickname) VALUES (?, ?, ?)", 
      [userId, email, nickname]
    );
  });
  db.close();

  newRoom = roomId;

  res.json({roomId: roomId, userId: userId});
});

// SSE
router.get('/event', (req, res, next) => {
  // TODO: 設定 SSE 需要的 Header
  // res.writeHead(200, {
    
  // });

  let lastNewRoom = '';
  console.log(`connect to SSE: ${newRoom} / ${lastNewRoom}`);

  let interval = setInterval(() => {
    if(lastNewRoom !== newRoom) {
      res.write(`data: 'new room created - ${newRoom}'\n\n`);
      lastNewRoom = newRoom;
    }
  }, 5000);

  req.connection.onclose = () => {
    clearInterval(interval);
  };
});

// single room
router.get('/:roomId', (req, res, next) => {
  var db = new sqlite3.Database(dbFile);
  db.get('SELECT r.*, u.nickname FROM room r left join user u on r.adminer = u.id where r.id = ?;', 
    [req.params.roomId], 
    (err, room) => {
      res.render('room', {room: room});
    });
  db.close();
});

module.exports = router;
