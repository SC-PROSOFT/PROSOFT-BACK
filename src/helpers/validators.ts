import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(404).send({ erros: error });
    //res.statusMessage =  "Validacion"
    //res.send({erros: error})
  }
};

export const JwtValidator_ = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x_token");
  if (!token) {
    return res.status(401).json({
      msg: "ERROR access denied",
    });
  }

  try {
    jwt.verify(token, `${process.env.SECRETKEY}`);
    return next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }
};
