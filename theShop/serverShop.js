/* Das hier wird der Server für den Online Shop */

const express = require("express");//Ähnlich wie ein Import-Befehl für den Webserver
const app = express(); //Das Modul express wird initialisiert

//den Ordner "public" dem Server freigeben
app.use(express.static(__dirname + "/public"));

//Startet Webserver
app.listen(3000, function(){
    console.log("listening on 3000");
});

/*
Die werden in dieser Datei nicht gebraucht
//Statische HTML-Datei wird dem Server übergeben
app.get("/welcome", function(req, res){
    res.sendFile(__dirname + "/staticWelcome.html");
});

app.get("/login", function(req, res){
    res.sendFile(__dirname + "/loginShop.html");
});
*/

//die Folgenden sind die anderen Websites im views Ordner

app.get("/welcome2", function(req, res){
    res.sendFile(__dirname + "/views/begrüßung.html");
});

app.get("/login2", function(req, res){
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/overview", function(req, res){
    res.sendFile(__dirname + "/views/overview.html");
});

app.get("/detail", function(req, res){
    res.sendFile(__dirname + "/views/detail.html");
});

//hier mal ein redirect bei einem Logout, da muss ich einfach einen Link mit "/logout" machen

app.get("/logout", function(req, res){
    res.redirect("/welcome2");
});

/* hier muss ich erst mit node auf die Serverdatei
wenn ich es richtig mache, ist die Adresse wichtig: http://localhost:3000/welcome */

/* Ab hier geht es um die Auswertung des Kontaktformulars 
Die JS Datei muss in dem Elternordner von views angelegt werden */

//Intitialisierung Body-Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

/*
app.get("/kontakteingabe", function(req, res){
    res.sendFile(__dirname + "/views/kontaktEin.html");
});
*/

/*
//POST-Request (eine Version ohne HTML)
app.post("/neuerKontakt", function(req, res){
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    res.send(`Willkommen ${vorname} ${nachname}!`);
});
*/

/* Die Template Engine die wir benutzen heißt EJS
npm install ejs --save */

//Initialisierung EJS
app.engine(".ejs", require("ejs").__express); //das Mudul mit der Variante für express wird geladen
app.set("view engine", "ejs");

//in unserem Fall müssen die EJS Skripte im Ordner "views" sein

//hier ein bisschen normaler Javascript Code:

let Pansy = {
    type: "Benutzer",
    vorname: "Pansy",
    nachname: "Parkinson",
    passwort: "slyther1n"
};
let Vince = {
    type: "Benutzer",
    vorname: "Vince",
    nachname: "Crabbe",
    passwort: "dead11"
};

let benutzerListe = [Pansy, Vince]

function benutzerExistiert(vorname, nachname){
for (element of benutzerListe) {
if (element.vorname == vorname && element.nachname == nachname) { 
    return true;
    }
} return false;
}

function anmeldungErfolgreich(vorname, nachname, passwort) {
if (benutzerExistiert(vorname, nachname)) {
for (element of benutzerListe){
    if (element.vorname == vorname && element.nachname == nachname && element.passwort == passwort){
        console.log(`Benutzer: ${vorname} ${nachname}; Anmeldung erfolgreich.`);
        return true;
    }
} 
} 
console.log("Ungültiger Benutzer oder ungültiges Passwort."); 
return false;
}

//Login Info
app.post("/einloggen", function(req, res){
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    const passwort = req.body.passwort;

    if (anmeldungErfolgreich(vorname, nachname, passwort) == true) {
        res.render("overview", {"vorname": vorname, "nachname": nachname}) //erzeuge eine HTML Datei unter Verwendung einer Template Engine
    } else {
        res.render("errorPage", {"vorname": vorname, "nachname": nachname})
    }
});

/*
not sure what this is supposed to be
//Tabelle für Beispiel im Overview? 
hexer = ["Harry", "Ron", "Hermione"];
res.render("hexer", {liste: hexer});
*/