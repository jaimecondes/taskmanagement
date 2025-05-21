const Task = require('../models/task');

module.exports = {
  Query: {
    tasks: async (_, { page = 1, done, overdue }) => {
      const filter = {};
      if (done !== undefined) filter.done = done;
      if (overdue) filter.dueDate = { $lt: new Date() };

      return Task.find(filter).skip((page - 1) * 10).limit(10);
    },
    task: async (_, { id }) => Task.findById(id),
  },
  Mutation: {
    addTask: async (_, args) => {
      return Task.create({ ...args, done: false });
    },
    updateTask: async (_, { id, ...updates }) => {
      return Task.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteTask: async (_, { id }) => {
      await Task.findByIdAndDelete(id);
      return 'Task deleted';
    },
   markTaskDone: async (_, { id }) => {
    try {
      console.log('Received ID:', id);
      const result = await Task.findOneAndUpdate(
        { _id:  id },
        { $set: { done: true } },
        { returnDocument: 'after' }
      );
      
      return 'Task done';
    } catch (err) {
      console.error('markTaskDone error:', err);
      throw new Error('Failed to mark task as done');
    }
  },
  markTasknotDone: async (_, { id }) => {
    try {
      console.log('Received ID:', id);
      const result = await Task.findOneAndUpdate(
        { _id:  id },
        { $set: { done: false } },
        { returnDocument: 'after' }
      );
      
      return 'Task set to done';
    } catch (err) {
      console.error('markTasknotDone error:', err);
      throw new Error('Failed to mark task as done');
    }
  },
  },
};
