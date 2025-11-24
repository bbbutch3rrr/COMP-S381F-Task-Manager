const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const app = express();

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerDB')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Models import
const User = require('./models/user');
const Task = require('./models/task');

// Middleware
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Session configuration for Authentication
app.use(cookieSession({
    name: 'session',
    keys: ['secretkey1', 'secretkey2'],
    maxAge: 24 * 60 * 60 * 1000
}));

// Logged in check
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// 1. AUTHENTICATION ROUTES (Login/Register/Logout)

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Find user by username
    const user = await User.findOne({ username, password });
    
    if (user) {
        req.session.userId = user._id; // Set session
        res.redirect('/'); // Go to dashboard
    } else {
        res.render('login', { error: 'Invalid Credentials' });
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        await User.create({ username: req.body.username, password: req.body.password });
        res.redirect('/login');
    } catch (err) {
        res.send("Error registering user: " + err.message);
    }
});

app.get('/logout', (req, res) => {
    req.session = null; // Clear session
    res.redirect('/login');
});

// 2. WEB UI ROUTES (Protected by requireAuth)

// READ - Dashboard with Search/Filter
app.get('/', requireAuth, async (req, res) => {
    // Get query parameters for search
    const searchStatus = req.query.status; 
    const searchText = req.query.search;

    // Build query object
    let query = {};
    if (searchStatus) query.status = searchStatus;
    if (searchText) query.title = { $regex: searchText, $options: 'i' };

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.render('dashboard', { tasks: tasks, user: req.session.userId });
});

// CREATE - Show Form
app.get('/create', requireAuth, (req, res) => {
    res.render('create');
});

// CREATE - Handle Form Submission
app.post('/create', requireAuth, async (req, res) => {
    await Task.create(req.body);
    res.redirect('/');
});

// UPDATE - Show Form
app.get('/edit/:id', requireAuth, async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task: task });
});

// UPDATE - Handle Form Submission
app.post('/edit/:id', requireAuth, async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// DELETE - Handle Deletion
app.post('/delete/:id', requireAuth, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// 3. RESTful API SERVICES

// API: Read tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API: Create a task
app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API: Update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API: Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
