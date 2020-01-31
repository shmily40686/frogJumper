const Background = require('./background.js');
const Player = require('./player');
const Mushroom = require('./mushroom');
const Bean = require('./bean')
class Game {
    constructor(ctx, gameCanvas, backgroundCtx,action) {
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;
        this.backgroundCtx = backgroundCtx;
        this.start = action
        
        this.jump = this.jump.bind(this);
        this.draw = this.draw.bind(this);
        this.called = false

        this.createBackground(backgroundCtx);
        this.createPlayer(ctx)
        this.createMushroom(ctx)
        this.createBeans(gameCanvas,ctx)
        this.collisionWithBean = this.collisionWithBean.bind(this)
    }

    jump(event) {
        if (event.code === "Space" ) {
            event.preventDefault();
            if (!this.called) { 
                const m = document.getElementById("menu")
                if (m.dataset.check === "off") {
                    if (this.start !== "die") {
                        this.player.performJump()
                        this.start = "start"
                        this.called = true
                        let that = this
                        setTimeout(() => {
                            that.called = false
                         },350)
                    }
                } 
            } 
        }
    }


    createBackground(backgroundCtx, foregroundCtx) {
        const backgroundImage = new Image();
        backgroundImage.src = './assets/images/background.png';
        this.background = new Background(backgroundCtx, backgroundImage, 0, 750, 0.8);
        this.preBackground = new Background(backgroundCtx, backgroundImage, 0, 750, 0)

    }

    createPlayer(ctx) {
        const frogImage = new Image()
        frogImage.src = './assets/images/frog.png'
        this.player = new Player(ctx,frogImage,440,5)
    }

    createMushroom(ctx) {
       const mushroomImage = new Image()
       mushroomImage.src = './assets/images/mushroom.png';
       this.mushroom1 = new Mushroom(ctx,mushroomImage,800,440, 4)
       this.mushroom2 = new Mushroom(ctx, mushroomImage, 1200, 440, 4)
    }

    createBeans(gameCanvas,ctx) {
        this.bean = new Bean(gameCanvas,ctx, 5)
    }

    draw() {
        requestAnimationFrame(this.draw);
        const score = document.getElementById("score")
        const info = document.getElementById("menu-info")
        if(this.start === "stop") {
            this.preBackground.draw() 
            this.player.draw();
            info.style.display = "flex"
        } else if (this.start === "start") {
            info.style.display = "none"
            this.background.draw();
            this.player.draw();
            this.mushroom1.draw();
            this.mushroom2.draw();
            this.bean.draw()
            // score.innerText = parseInt(score.innerText) + 0.1
            // calculate was there collision
            //
            // player position
            const player = this.player.getPosition();
            // mushroom positions
            const mushrooms = [
                this.mushroom1.getPosition(),
                this.mushroom2.getPosition(),
            ];

            if(this.collisionWithBean(player)) {
                score.innerText = parseInt(score.innerText) + 100
                this.bean.clean()
                this.bean = new Bean(this.gameCanvas, this.ctx, 5)
            }
           


            // .some on [mushrooms] was there collision?
            if (mushrooms.some(mushroom => {
                let spacing = 90;
                let tolerance = 50;

               if (mushroom[0] > player[0] + spacing || player[0] - mushroom[0] >= spacing) {
                   // collision not possible
                   return false;
               } else {
                   // player can collide with mushroom
                   if (mushroom[0] > player[0]) {
                       // Mushroom is to the right, player can run into mushroom or land on it.
                       return mushroom[0] + mushroom[1] < player[0] + player[1] + spacing;
                   } else {
                       // Frog is to the right of the mushroom.
                       return Math.abs(player[0] - mushroom[0]) + Math.abs(player[1] - mushroom[1]) + (tolerance / 8) < spacing;
                   }
               }
            })) {
                // stop
                this.stopPlaying();
            } 
        } else if (this.start === "die") {
            return 
        }

    }

    collisionWithBean(player) {
        let spacingBean = 90;
        let toleranceBean = 50;
        let beanPosition = this.bean.getPosition()
        if (beanPosition[0] > player[0] + spacingBean || player[0] - beanPosition[0] >= spacingBean) {
            return false;
        } else {
            if (beanPosition[0] > player[0]) {
                return beanPosition[0] + beanPosition[1] < player[0] + player[1] + spacingBean;
            } else {
                return Math.abs(player[0] - beanPosition[0]) + Math.abs(player[1] - beanPosition[1]) + (toleranceBean / 8) < spacingBean;
            }
        }
    }


    eatBean(){
        console.log("eat!!!")
    } 

    stopPlaying() {
        this.start = "die";
        const cover = document.getElementById("cover-die")
        cover.style.display = "flex";
    }
}

module.exports = Game;
