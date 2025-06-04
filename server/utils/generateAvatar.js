const generateAvatar = (firstName, lastName) => {
  const fullName = `${firstName} ${lastName}`;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&rounded=true&bold=true`;
};

module.exports = generateAvatar;