const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    documentType: { type: String, enum: ['resume', 'presentation', 'video'], default: 'document' },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    views: [{ timestamp: Date, duration: Number, slide: Number }]
});

module.exports = mongoose.model('Document', documentSchema);
