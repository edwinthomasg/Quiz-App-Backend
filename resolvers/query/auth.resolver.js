const { verify, sign } = require("jsonwebtoken");
const { default: jwtDecode } = require("jwt-decode");
const { getQuestionByCategoryAndQuestionNumber } = require("../../repository/quiz.repository");
const { getRefreshTokenById } = require("../../repository/user.repository");

const tokenResolver = async (_, args, context) => {
  getQuestionByCategoryAndQuestionNumber({category: "communication", questionNumber: 1})
  const { id } = jwtDecode(context.rawHeaders[1], "secret");
  const { refreshToken } = await getRefreshTokenById(id);
  if (refreshToken.length === 0) throw "UnAuthorized";
  if (!refreshToken.includes(args.refreshToken)) throw "Token Invalid";
  let token = {}
  verify(args.refreshToken, "refreshtoken", (err, data) => {
    const {id, role} = data
    if (err) throw err;
    token.accessToken = sign({id, role}, "secret", { expiresIn: 60000 })
  });
  console.log("response : ", token)
  verify(token.accessToken,"secret")
  return token
};

module.exports = {
  tokenResolver,
};
