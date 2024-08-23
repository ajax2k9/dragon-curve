class Transform{
    constructor(x,y,parent){
        this.localx = x;
        this.localy = y;
        this.localScale = 1;
        this.scale = 1;
        this.children = [];
        this.parent = parent;
        this.ang = 0;
        this.localAng = 0;
        if(parent != null){
            parent.AddChild(this);
        }
    }

    FindChild(t){
        for(let i =0; i < this.children.length; i++){
            if(this.children(i) == t) return i;
        }
        return null
    }

    RemoveChild(t){
        for(let i =0; i < this.children.length; i++){
            if(this.children(i) == t) {
                this.children.splice(i,1)
                return
            }
        }
    }

    RemoveChildAt(i){
        this.children.splice(i,1)
    }

    SetParent(t){
        if(this.parent != undefined){
            this.parent.RemoveChild(this);
        }
        t.parent=t;
    }

    AddChild(t){
        t.parent = this;
        this.children.push(t);
    }

    RemoveChild(t){
        let idx = this.children.indexOf(t);
        if(t != -1){
            t.LocalToGlobal();
            this.children.splice(idx,1);
            t.parent = null;
        }
    }

    LocalToGlobal(){
        this.localx = this.x;
        this.localy = this.y;
        this.parentAng = 0;
    }

    Translate(){
        if(this.parent != null){
            this.x += this.parent.x;
            this.y += this.parent.y;
        } 
    }
    Rotation(){
        angleMode(DEGREES)
        if(this.parent != null){ 
            this.ang = this.localAng + this.parent.ang;
            let c = cos(this.parent.ang);
            let s = sin(this.parent.ang);
            let x = this.localx;
            let y = this.localy;
            this.x = x * c - y * s;
            this.y = y * c + x * s;
        } else {
            this.ang = this.localAng;
            this.x =this.localx;
            this.y =this.localy;
        }
        
    }
    LocalScale(){
        if(this.parent != null){ 
            this.scale = this.localScale * this.parent.scale;
        } else {
            this.scale = this.localScale;
        }

            this.x*=this.scale;
            this.y*=this.scale;
    }

    Rotate(ang){
        this.localAng = ang;
    }

    Scale(s){
        this.localScale = s 
    }
    
    CalcPos(){
        this.Rotation();
        this.LocalScale();
        this.Translate();
    }
}
