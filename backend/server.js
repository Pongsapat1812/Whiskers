const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

mongoose.connect('mongodb://localhost:27017/whiskers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const LoginLogSchema = new mongoose.Schema({
    email: String,
    status: { type: String, enum: ['success', 'fail'], required: true }, // New Field
    loginTime: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
const LoginLog = mongoose.model('LoginLog', LoginLogSchema);

app.post('/register', async (req, res) => {
    console.log('Register route hit'); // Log to check if the route is being triggered

    try {
        const { email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already exists:', email);
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        console.log('New user registered:', newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'User registration failed', details: error.message });  // More detailed error message
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && user.password === password) {  // Compare plain text passwords
            // Log successful login
            const log = new LoginLog({ email, status: 'success' });
            await log.save();

            req.session.user = { email }; // Store session
            res.status(200).json({ token: 'mock-token', message: 'Login successful' });
        } else {
            // Log failed login
            const log = new LoginLog({ email, status: 'fail' });
            await log.save();

            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

const ChatSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', ChatSchema);

app.get('/chats/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await Chat.find({ roomId }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

app.post('/chats', async (req, res) => {
    try {
        const { roomId, sender, message } = req.body;

        // Ensure message uniqueness (optional)
        const existingMessage = await Chat.findOne({ roomId, sender, message });
        if (existingMessage) {
            return res.status(400).json({ error: 'Duplicate message' });
        }

        const chatMessage = new Chat({ roomId, sender, message });
        await chatMessage.save();
        res.status(201).json(chatMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post message' });
    }
});

const FeedbackSchema = new mongoose.Schema({
    feedback: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});


const Feedback = mongoose.model('Feedback', FeedbackSchema);

app.post('/feedback', async (req, res) => {
    try {
        const { feedback } = req.body;

        if (!feedback) {
            return res.status(400).json({ error: 'Feedback is required' });
        }

        const newFeedback = new Feedback({ feedback }); // Only save feedback
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', data: newFeedback });
    } catch (error) {
        console.error('Failed to submit feedback:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
});

app.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ timestamp: -1 });  // Fetch feedbacks sorted by timestamp
        res.status(200).json(feedbacks);  // Respond with feedbacks as JSON
    } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
        res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
