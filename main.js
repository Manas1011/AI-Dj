song="";
leftwristx=0;
rightwristx=0;
scorerightwrist=0;
scoreleftwrist=0;
leftwristy=0;
rightwristy=0;

function preload()
{
   song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();    
    video=createCapture(VIDEO)
    video.size(600,500);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotPoses);
}

function modelloaded(){
    console.log("Your Model Is Loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("leftwristx ="+ leftwristx+"   leftwristy ="+ leftwristy);
        console.log("rightwristx ="+ rightwristx+"   rightwristy ="+ rightwristy);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[0].score;
        console.log("scorerightwridt = "+scorerightwrist)
        console.log("scoreleftwrist = "+scoreleftwrist);

        }

}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("black");
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        leftwristynoformat=Number(leftwristy);
        remove_decimal=floor(leftwristynoformat);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);


        
    }

    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);

        if(rightwristy>=0 && rightwristy<=100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed = 0.5x";
        }

        
        else if(rightwristy>100 && rightwristy<=200){
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed = 1x";
        }
        
        if(rightwristy>200 && rightwristy<=300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed = 1.5x";
        }
        
        if(rightwristy>300 && rightwristy<=400){
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed = 2x";
        }

        if(rightwristy>400 && rightwristy<=500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed = 2.5x";
        }
    }
}

function playSound  (){
    song.play();
    song.setVolume(1);
    song.rate(1);
}



