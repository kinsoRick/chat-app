import axios from 'axios';

async function isNameAvailable(name, token) {
  const response = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { channels } = response.data;
  const names = channels.map((channel) => channel.name);
  return !names.includes(name);
}

export default isNameAvailable;
