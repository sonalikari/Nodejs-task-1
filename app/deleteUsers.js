const { client } = require('./database');
const { getAge } = require('./getAge');

async function deleteUsersAbove25(req, res) {
  try {
    const db = client.db('data');
    const usersCollection = db.collection('Users');

    const users = await usersCollection.find({}).toArray();

    const usersAbove25 = users.filter(user => getAge(user.dob) > 25);

    const deleteResult = await usersCollection.deleteMany({ _id: { $in: usersAbove25.map(user => user._id) } });

    res.json({ deletedCount: deleteResult.deletedCount });
  } catch (err) {
    console.error('Error deleting users above 25:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { deleteUsersAbove25 };
