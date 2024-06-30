require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.DB_URI).then(async () => {
  const existingUser = await User.findOne({ email: 'user@example.com' });

  if (existingUser) {
    existingUser.password = '1234';
    await existingUser.save();
    console.log('User updated');
  } else {
    const user = new User({ email: 'user@example.com', password: '1234' });
    await user.save();
    console.log('User created');
  }

  mongoose.connection.close();
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
