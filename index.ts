import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import * as routes from "./src/routes/index";
import { cambio_contra_automatico, copia_segurdad, limipar_backup } from "./src/global/global";
import { asignar_modulos_operadores } from "./src/controllers/ASIGNAMODULOS";

require("dotenv").config();
mongoose.set('strictQuery', true);//Esto oculta una alerta de mongo en consola, quitar si es necesario.
const PORT = process.env.PORT || 3000;
const app = express();

//Metodos automaticos
cambio_contra_automatico();
asignar_modulos_operadores();
copia_segurdad()
limipar_backup();
//Estos lo llamamos siempre que se inicie el servidor, dado el caso que el servidor se encuentre apagado a las 12:01 AM


app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json());

//********Routes*******

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionado :)");
});

app.use("/api", routes.SERCO);
app.use("/api", routes.DEPCO);
app.use("/api", routes.TIPCO);
app.use("/api", routes.AUXTIP);
app.use("/api", routes.UNIFUN);
app.use("/api", routes.REMIDEP);
app.use("/api", routes.HOLDING);
app.use("/api", routes.CARGOPS);
app.use("/api", routes.CORRES);
app.use("/api", routes.CORRESINFOR);
app.use("/api", routes.CORRPRU);
app.use("/api", routes.MACORR);
app.use("/api", routes.USUVUE);
app.use("/api", routes.RESCORR);
app.use("/api", routes.USUAR);
app.use("/api", routes.TERCE);
// app.use("/api", routes.ACTIV);
// app.use("/api", routes.CIUDA);
// app.use("/api", routes.CORRES);
app.use("/api", routes.CORR864);
app.use("/api", routes.CORR868);
app.use("/api", routes.CORR869);
app.use("/api", routes.CORR871);
app.use("/api", routes.CORR881);
app.use("/api", routes.CORR891);
app.use("/api", routes.CON802);
app.use("/api", routes.LISTADORESCORR);
app.use("/api", routes.FAVORITOS);
app.use("/api", routes.CONFIG);
app.use("/api", routes.MODULOS);
app.use("/api", routes.MODULOS);
app.use("/api", routes.DNHABIL);
app.use("/api", routes.ASIGNAMODULOS);
app.use("/api", routes.IMAGE);

//********Routes*******

console.clear();

//******Conection MONGODB****** */
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Successful connection 🟢  :)");
  })
  .catch((error) => {
    console.log("Error conecting to the DB  🔴 :(");
    console.log(error);
  });

app.listen(PORT, () => console.log("API lisening in the PORT: ", PORT));
