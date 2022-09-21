require("dotenv").config();
const express         = require("express");
const cors            = require("cors");
const logger          = require('morgan');
const app             = express();
const PORT            = process.env.PORT || 5000;
const patientRoutes   = require("./routes/patientRoutes");
const apiIndex        = require("./routes/apiIndex");

//mongoose connection
const usermongo = process.env.USERMONGO;
const passmongo = process.env.PASSMONGO;
const mongoose  = require('mongoose');
const dbUrl     = `mongodb+srv://${usermongo}:${passmongo}@cluster0.rriocxj.mongodb.net/project-test?retryWrites=true&w=majority`

mongoose.connect(dbUrl, {
	useNewUrlParser   : true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
	console.log('success connected to database');
});


// middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// routes
app.use("/", apiIndex)
app.use("/api/patients", patientRoutes);

// listening on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
