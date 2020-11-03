class Rooms{
    constructor(write,x,y){
          this.write=write;
          this.x=x;
          this.y=y;
    }
    display(){
       push();
       rectMode(CENTER);
       fill("grey");
       rect(this.x,this.y,width/2.5,height/15);
       pop();
       push();
       textAlign(CENTER);
       text(this.write,this.x,this.y+width/280);
       pop();
    }
    press(){
        if(this.x-mouseX<=width/40 &&
            mouseX-this.x<=width/40 &&
            this.y-mouseY<=height/100&&
            mouseY-this.y<=height/100){
                return true;
            }else{
                return false;
            }
    }
}
//Global Variabes
//variable for loading the first image
let firstbackimg;
//adding gameState
let gameState;
//variable for loading the background image of create and join room
let main;
//variable for join button
let joinbut;
//variable for creat room button
let createbut;
//variable for creting input of naming the room
let roomnameInp;
//variable for making the player name input while creating room
let playernameInp;
//variable for image laoded when the gameStaate is create
let createbackimg;
//variablefor creating a button in the create state
let createbutton;
let database;
let res;
let rjson;
//variable for referring to ip adress
let refip;
//variable for ip count
let ipcount = {
    ip: 0
};
//let i;
let j;
//variable for storing the room name
let roomname;
//variable for storing the player name
let playername;
// a bollean value for storing true and false if room name or player name is less than 1
let isroom;
//varible for storing the waiting image
let wait;
//variable which will increase when gamestate is join in mobile so that we get value from database once
let f=0;
//this varible will store how many rooms are available in that ip adress
let roomnum;
let f2=0;
//arrat to store romm name of various rooms
let roomsarr=[];
//a rray that will store all the rectangles with the room names in that ip adress during join state
let roomRects=[];
function setup() {
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    gameState = "select";
    joinbut = new Button("images/join.png", width - width / 4, height / 2, width / 3, height / 2);
    createbut = new Button("images/create.png", width / 4, height / 2, width / 3, height / 2);
    roomnameInp = createInput("Room Name");
    playernameInp = createInput("Your Name");
    roomnameInp.hide();
    playernameInp.hide();
    roomnameInp.position(width / 2 - width / 11, height / 3);
    playernameInp.position(width / 2 - width / 11, height - height / 2.7);
    playernameInp.style("font-size", width / 45 + "px");
    playernameInp.style("background", color(153, 255, 255));
    roomnameInp.style("font-size", width / 45 + "px");
    roomnameInp.style("background", color(153, 255, 255));
    createbutton = createButton("Sumbit");
    createbutton.position(width / 2 + width / 8, height - height / 5);
    createbutton.style("font-size", "20px");
    createbutton.style("background", color(0, 255, 255));
    createbutton.hide();
    getip();
}

function preload() {
    //loading the first welcome image
    firstbackimg = loadImage("images/first.png");

    //background where create and join room is there
    main = loadImage("images/backdrop.png");
    //loading the background image when the gameState is create
    createbackimg = loadImage("images/Pong1.jpg")
    wait=loadImage("images/wait.jpg");
}

function draw() {
    background(255);
    //ig gameState is select then
    if (gameState === "select") {
        push();
        imageMode(CENTER);
        //IMAGE FOR THE FIRST WELOCOME SCREEN
        image(firstbackimg, width / 2, height / 2, width - width / 2, height - height / 2);
        pop();
        push();
        textFont(BOLD);
        textAlign(CENTER);
        textSize(40);
        //first screen text tap for mobile ond press ok for tv
        text("Tap to Begin for Mobile", width / 2, height - height / 5);
        pop();
    }
    if (gameState === "android") {
        push();
        imageMode(CENTER);
        image(main, width / 2, height / 2, width, height);
        createbut.display();
        joinbut.display();
        pop();
    }
    if (gameState === "create") {
        playernameInp.show();
        roomnameInp.show();
        createbutton.show();
        push();
        imageMode(CENTER);
        image(createbackimg, width / 2, height / 2, width, height);
        pop();
        createbutton.mousePressed(() => {
            ip();
        })
        push();
        if (isroom === false) {
            textSize(20);
            fill("red");
            text("Room Or Player Name is not Valid", width / 2, height / 2);
        }
        pop();
    } else {
        playernameInp.hide();
        roomnameInp.hide();
        createbutton.hide();  
    }
    if (gameState === "wait") {
        push();
        imageMode(CENTER);
        image(wait,width/2,height/2,width,height);
        textAlign(CENTER);
        textSize(width/16);
        fill("red");
        text("Waiting For Other Players...",width/2,height/2);
        pop();
    }
    if(gameState==="join"){
        f++;
        if(f===1){
            database.ref(j+"/ip").on("value",(data)=>{
                roomnum=data.val();
            })
        }
       if(roomnum!==undefined){
           if(roomnum>0){ 
               f2++;
               if(f2===1){
                   for(var a=1;a<=roomnum;a++){
                    database.ref(j+"("+a+")/roomName").on("value",(data)=>{
                       roomsarr.push(data.val());
                    })
                   }
                
               }
              if(roomsarr.length===roomnum){
                  var c=height/10;
                for(var b=0;b<roomnum;b++){
                    c+=height/5;
                    if(roomsarr[b]!==null){
                        roomRects.push(new Rooms(roomsarr[b],width/2,c));
                    }
                }
                for(var d=0;d<roomRects.length;d++){
                    roomRects[d].display();
                }    
              } 
           }
       }
    }
}

function keyPressed() {
    //RELOADING THE PAGE ON ENTER FOR MY EASE
    // console.log(keyCode);
    if (keyCode === 13) {
        location.reload();
    }
}

function mousePressed() {
    if (gameState === "select") {
        setTimeout(() => {
            gameState = "android";
        }, 100);

    }
    if (buttonpressed(createbut) && gameState === "android") {
        //making gameState create for mobile
        gameState = "create";
    }
    if (buttonpressed(joinbut) && gameState === "android") {
        //making gameState join for mobile
        gameState = "join";
    }
}

function buttonpressed(obj) {
    if (mouseX - obj.x <= obj.width / 2 &&
        obj.x - mouseX <= obj.width / 2 &&
        obj.y - mouseY <= obj.height / 2 &&
        mouseY - obj.y <= obj.height / 2) {
        return true;
    } else {
        return false;
    }
}
async function getip() {
    res = await fetch("https://api.ipify.org/?format=json");
    rjson = await res.json();
    j = replace(rjson.ip, ".", "");
}
async function ip() {
    if (rjson !== undefined) {
        roomname = roomnameInp.value();
        playername = playernameInp.value();
        if (roomname.length < 1 || playername.length < 1) {
            isroom = false;
        } else {
            isroom = true;
        }
        
        if (isroom) {
            refip = await database.ref(j).once("value");
            if (refip.exists()) {
                ipcount = refip.val();
                ipcount.ip++;
            } else {
                ipcount.ip = 1;
            }

            database.ref(j).set({
                ip: ipcount.ip
            })


            database.ref(j + "(" + ipcount.ip + ")").set({
                players: {
                    player1: {
                        name: playername,
                        y: 0
                    },
                    player2: {
                        name: "",
                        y: 0
                    }
                },
                roomName: roomname
            })
            gameState = "wait";
        }
    }
}