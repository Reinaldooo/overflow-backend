export default {
  jwt: {
    phrase: process.env.JWT_SECRET,
    options: {
      expiresIn: "1d",
    },
  },
};
