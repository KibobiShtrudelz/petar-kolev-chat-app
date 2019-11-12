const generateMessage = text => ({ text, createdAt: new Date().getTime() });

const generateLocationMessage = (latitude, longitude) => ({
  url: `https://google.com/maps?q=${latitude},${longitude}`,
  createdAt: new Date().getTime()
});

module.exports = { generateMessage, generateLocationMessage };
