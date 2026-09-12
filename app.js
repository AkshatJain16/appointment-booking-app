const express = require('express');
const cors = require('cors');

const sequelize = require('./utils/db-connection');

require('./models/users');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Booking Appointment API is running"
    });
});

sequelize.sync()
    .then(() => {
        console.log("Database is synced");
    })
    .catch((error) => {
        console.log(error.message);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});