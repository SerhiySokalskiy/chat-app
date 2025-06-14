const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const chatRoutes = require('./routes/chatRouter');
const messageRoutes = require('./routes/messageRouter');
const { seedPredefinedChats } = require('./utils/seedPredefinedChats');

dotenv.config();

const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://chat-app-zeta-six-39.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.set('io', io);

app.use(cors({
  origin: 'https://chat-app-zeta-six-39.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // HTTPS only
    httpOnly: true,
    sameSite: 'none'
  }
}));
app.use(passport.authenticate('session'));

app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('https://chat-app-zeta-six-39.vercel.app');
  }
);

app.get('/test-user', (req, res) => {
  console.log('req.user:', req.user);
  res.send(req.user ? 'User is authenticated' : 'User is not authenticated');
});

app.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.get('/auth/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('https://chat-app-zeta-six-39.vercel.app');
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('MongoDB connected');
    await seedPredefinedChats();

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
