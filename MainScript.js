let width = 800;
let height = 800;
let objects = [];
let iterations=13;
let counter = 0;
let rotating = false;
let desiredAng =-90;
let currAng =0;
let mid = null;
let currScale = 1;
let desiredScale = 1;

function setup(){
    let p5canvas = createCanvas(width,height);
    objects.push(new Transform(0,0))

    let t2 = new Transform(50,0,objects[0])
    objects.push(t2)    
}

function draw(){

    background(200,200,200);
    translate(width/2,height/2);
    currScale = lerp(currScale,desiredScale,0.02);

    if(rotating){
        if(currAng < desiredAng){
            currAng +=1
        } else {
            currAng = desiredAng;
            rotating = false;
        }
    } else {
        
        if(counter < iterations){
            let len1 = objects.length
            for(let i = len1-1; i > 0;i--){
                let t = new Transform(50,0,objects.at(-1));
                t.Rotate(-objects[i-1].localAng)
                objects.push(t)
            }
            counter++
            mid = objects[len1-1]
            rotating = true;
            currAng = -180
            desiredScale = desiredScale/1.2;
        }
        
    }
    
    mid.Rotate(currAng)
    objects[0].Scale(currScale)
        objects.forEach(o=>{
            o.CalcPos();
            if(o.parent != undefined){
                let p = o.parent
                line(o.x,o.y,p.x,p.y)
            }
        });  
}
