class Grid{
    constructor(w,h, spacing){
        this.w = w;
        this.h = h;
        this.spacing = spacing;
        this.pad = 4;
        this.CreateWaypoints();
        this.CreateSpinners();
    }
    
    CreateWaypoints(){ 
        this.points = []   
        
        let offsX = this.w * (this.spacing + this.pad)/2.5; 
        let offsY = this.h * (this.spacing + this.pad)/2.5; 

        for (let jj = 0; jj < this.h; jj++) {
            for (let ii = 0; ii < this.w; ii++) {
                let x = ii*(this.spacing+this.pad)-offsX;
                let y = jj*(this.spacing+this.pad)-offsY; 
                this.points.push(new Waypoint(x,y,ii + jj*this.w));
            }
        }        
    }

    CreateSpinners(){
        this.spinners = [];
        for (let jj = 0; jj < this.h-1; jj+=2) {
            for (let ii = 0; ii < this.w-1; ii+=2) {
                let wps = [];
                for(let kk = 0; kk <= 1; kk++){
                    for(let ll = 0; ll <= 1; ll++){
                        let x1 = ii+kk;
                        let y1 = jj+ll;
                        let idx = x1 + y1 * this.w;
                        wps.push(this.points[idx]);
                    }
                }
                this.spinners.push(new Spinner(wps[0],wps[3],wps[1],wps[2]));
            }
        }  
    }

    draw(){
        noStroke()
        fill(100);
        rectMode(CENTER)
       
        this.points.forEach(w=>{
            rect(w.x,w.y,this.spacing,this.spacing,5);
        })
        
        this.spinners.forEach(s=>{s.draw()})
    }


}