const input = [
  {
    username: 'David',
    status: 'online',
    lastActivity: 10,
  },
  {
    username: 'Lucy',
    status: 'offline',
    lastActivity: 22,
  },
  {
    username: 'Bob',
    status: 'online',
    lastActivity: 104,
  },
];

function userStatus(user) {
  const result = {};

  user.forEach((e) => {
    if (e.status === 'offline') {
      result.offline = result.offline || [];
      result.offline.push(e.username);
    } else if (e.status === 'online' && e.lastActivity > 10) {
      result.away = result.away || [];
      result.away.push(e.username);
    } else {
      result.online = result.online || [];
      result.online.push(e.username);
    }
  });

  return result;
}

console.log(userStatus(input));
