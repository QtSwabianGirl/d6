var app = new Vue({
    el: '#app',
    data:
        {
            page: "login",
            error: "",
            username: "",
            password: "",
            mail: "",
            players: [],
            roomName: "",
            roomDescription: "",
            roomNPCs: "",
            roomExtras: "",
            rooms: [
                {name: "Küche", description: "Hier drinnen befinden sich ein Backofen und ein umgeworfener Tisch.", npcs: "Keine", extras: "Der Ofen ist ein Mimic"},
                {name: "Wohnzimmer", description: "Dies ist ein leerer Raum.", npcs: "Keine", extras: "Ist leer"}
            ],
            currentRoom: "",
            sessions: [
                {name: "Session 1", playerCount: 2, dungeonMaster:"Tobias Grötz", id: 0, sessionRooms: [
                        {name: "Küche", description: "Hier drinnen befinden sich ein Backofen und ein umgeworfener Tisch.", npcs: "Keine", extras: "Der Ofen ist ein Mimic"},
                        {name: "Wohnzimmer", description: "Dies ist ein leerer Raum.", npcs: "Keine", extras: "Ist leer"}
                    ]},
                {name: "MUD", playerCount: 3, dungeonMaster:"Prof. Dr. Antonius van Hoof", id: 1, sessionRooms: [
                        {name: "Küche", description: "Hier drinnen befinden sich ein Backofen und ein umgeworfener Tisch.", npcs: "Keine", extras: "Der Ofen ist ein Mimic"},
                        {name: "Wohnzimmer", description: "Dies ist ein leerer Raum.", npcs: "Keine", extras: "Ist leer"}
                    ]},
                {name: "Mittelalterliches Rollenspiel", playerCount: 8, dungeonMaster:"Tobias Grötz 2", id: 2, sessionRooms: [
                        {name: "Küche", description: "Hier drinnen befinden sich ein Backofen und ein umgeworfener Tisch.", npcs: "Keine", extras: "Der Ofen ist ein Mimic"},
                        {name: "Wohnzimmer", description: "Dies ist ein leerer Raum.", npcs: "Keine", extras: "Ist leer"}
                    ]}
            ],
            currentSession: "",
            sessionID: 3,
            sessionName: "",
            message: "",
            messageHistory: []
        },
    methods:
        {
            switchPage: function (page) {
                this.page = page,
                    this.error = ""
            },
            login: function () {
                if (this.username == "d6Prototyp" && this.password == "allesgrau") {
                    this.switchPage('sessionChoice')
                } else {
                    this.error = "Benutzername oder Passwort sind falsch, bitte versuche es erneut."
                }
            },
            register: function () {
                if (this.login == "asd") {
                    this.error = "Dieser Benutzername existiert bereits!"
                } else {
                    this.error = "Eine Bestätigungsmail wurde an " + this.mail + " gesendet!"
                }
            },
            forgotPassword: function () {
                this.error = "Falls ein Account mit dieser E-Mail-Adresse verbunden ist, wird eine E-Mail zum zurücksetzen des Passworts versendet."
            },
            joinGame: function (session) {
                if (this.sessions.includes(session)) {
                    this.currentSession = session,
                        this.sessionName = session.name,
                        this.players.push(this.username),    /*hier player zum server schicken*/
                        this.currentRoom = session.sessionRooms[0],
                        this.switchPage("game")
                } else {
                    /*TODO Error*/
                }
            },
            createSession: function () {
                this.sessionID = this.sessionID+1,
                    this.sessions.push({name: this.sessionName, dungeonMaster: this.username, id: this.sessionID, sessionRooms: this.rooms}),
                    this.switchPage("game")
            },
            createRoom: function () {
                this.rooms.push({name: this.roomName, description: this.roomDescription, npcs: this.roomNPCs, extras: this.roomExtras}),
                    this.roomName = "",
                    this.roomDescription = "",
                    this.roomNPCs = "",
                    this.roomExtras = ""
            },
            sendMessage: function () {
                if(this.message.startsWith("/")) {
                    this.sendCommand()
                } else {
                    this.messageHistory.push(this.message)
                }
                this.message = ""
            },
            sendCommand: function () {
                if (this.message.startsWith("/check ")){
                    this.messageHistory.push("TODO. einen anderen Charakter/NPC untersuchen.")
                } else if (this.message == "/description"){
                    this.messageHistory.push(this.currentRoom.description)
                } else if (this.message.startsWith("/roll ")){
                    this.messageHistory.push("TODO. Rollt einen Würfel.")
                } else if (this.message.startsWith("/r ")){
                    this.messageHistory.push("TODO. gleiche wie /roll")
                } else if (this.message == "/status"){
                    this.messageHistory.push("TODO. gibt status des eigenen characters aus.")
                } else if (this.message == "/rooms"){
                    this.currentSession.sessionRooms.forEach(room => {
                        if (room == this.currentRoom){
                            this.messageHistory.push("Derzeit in: "+room.name)
                        } else {
                            this.messageHistory.push(room.name)
                        }
                    })
                } else if (this.message.startsWith("/moveto ")){
                    mess = this.message.substring(8),
                        bool = true,
                        this.currentSession.sessionRooms.forEach(room => {
                            if(mess == room.name){
                                this.messageHistory.push("Von dem Raum " + this.currentRoom.name + " in den Raum "+ room.name +" gegangen."),
                                    this.currentRoom = room,
                                    bool = false
                            }
                        })
                    if(bool){
                        this.messageHistory.push('Unbekannter Raum: "'+ mess +'"')
                    }
                } else if (this.message == "/help "){
                    this.messageHistory.push("TODO. Gibt Befehlsliste aus oder so")
                } else {
                    this.messageHistory.push("Dieser Befehl existiert nicht.")
                }
            }
        }
})