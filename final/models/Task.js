const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({    // It'll setup the structure for all the documents that we'll have in our collection
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)


//Also note, that only the properties that you specify in your schema will be passed on to your database and everything else will be ignored