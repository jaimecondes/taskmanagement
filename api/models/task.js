const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: Date,
  done: Boolean,
});

module.exports = mongoose.model('Task', taskSchema);
