const { client } = require('./database');
const { getAge } = require('./getAge');

async function getAverageAge(req, res) {
  try {
    const db = client.db('data');
    const usersCollection = db.collection('Users');

    const users = await usersCollection.find({}).toArray();

    const totalAge = users.reduce((sum, user) => sum + getAge(user.dob), 0);

    const averageAge = totalAge / users.length;

    res.json({ averageAge });
  } catch (err) {
    console.error('Error getting average age:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAverageAge };
