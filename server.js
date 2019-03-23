import express from "express";
import Expo from "expo-server-sdk";
import cors from "cors";

const expo = new Expo();
const expressServer = express();

expressServer.use(cors());
expressServer.listen(process.env.port || 3000, () => {
  console.log("Serveur en écoute " + process.env.port);
});
expressServer.post("/", function(req, res) {
  const token = "ExponentPushToken[i9p_87Cua0feLh3Xy1EYcW]";

  if (!Expo.isExpoPushToken(token)) {
    console.log("Token invalide");
  } else {
    let messages = [
      {
        to: token,
        sound: "default",
        body: "Notification test",
        data: { desDonnes: "datarazlekazelkzalekazle" }
      }
    ];

    expo
      .sendPushNotificationsAsync(messages)
      .then(ticket => {
        console.log("Ticket recu : ", ticket);
        res.send({ tiket: ticket });
      })
      .catch(err => console.log(" Erreur de notification ", err));
  }
});
