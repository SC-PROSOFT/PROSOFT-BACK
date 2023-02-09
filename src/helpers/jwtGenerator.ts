import jwt from "jsonwebtoken";

export const generarJwt = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      `${process.env.SECRETKEY}`,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se genero el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
