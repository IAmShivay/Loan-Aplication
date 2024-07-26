const sendToken = (user, res, status) => {
  const token = user.getJWTToken({ expiresIn: '3d' }); // Token expires in 3 days
  res.status(status).json({ success: true, token, user});
};

module.exports = sendToken;
