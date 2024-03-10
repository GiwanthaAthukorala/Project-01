import { verify } from "jsonwebtoken";
import { UNAUTHORIZED } from "../constants/httpStatus";

export default (req, res, next) => {
  const token = req.headers.access_token;
};
