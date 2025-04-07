const express = require('express');
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); 
const agenda = require('./config/agenda.js');
const defineSendEmailJob = require('./jobs/sendEmail.js');

const app = express();
dotenv.config(); 
const port = process.env.PORT

const userRoutes = require('./routes/userRoutes.js');
const emailFlowRoutes = require('./routes/emailFlowRoutes.js');
const emailTemplateRoutes = require('./routes/emailTemplateRoutes.js');
const statsRoutes = require('./routes/statsRoutes.js'); 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true              
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/flows', emailFlowRoutes);
app.use('/api/templates', emailTemplateRoutes);
app.use('/api/stats', statsRoutes); 

agenda.on('ready', () => {
  console.log('Agenda is ready!');
  agenda.start();
});

defineSendEmailJob(agenda);

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1); 
  }
};

startServer();
