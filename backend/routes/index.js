const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
require('./db'); // Include database connection
const documentRoutes = require('./routes/index'); // Routes

app.use(cors());
app.use(express.json());
app.use('/', documentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
