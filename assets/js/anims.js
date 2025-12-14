// By JIEJOE in bilibili

// From JIEJOE in bilibili
const magnetic = {
    container: document.querySelector(".containersvg"),
    width: 10,
    height: 10,
    left: 0,
    top: 0,
    placemap: [
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
        [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1]
    ],
    balls: [],
    mouse_radius: 100,
    enable: true,
    init() {
        this.resize()
        this.create_yoyo(15);
        document.addEventListener("mousemove", (e) => {
            this.move_balls(e.x, e.y)
        })
        document.addEventListener("click",(e)=>{
            this.move_balls(e.x,e.y)
        })
        window.addEventListener("resize",()=>{
            this.resize()
        })
    },
    resize() {
        this.width = this.container.getBoundingClientRect().width
        this.height = this.container.getBoundingClientRect().height
        this.left = this.container.getBoundingClientRect().left
        this.top = this.container.getBoundingClientRect().top
    },
    create_yoyo(radius) {
        var itery = 0
        this.placemap.forEach((row) => {
            var iterx = 0
            row.forEach((item) => {
                if (item == 0) {
                    iterx += 1;
                } else {
                    let x = this.width / row.length * iterx
                    let y = this.height / this.placemap.length * itery
                    iterx += 1
                    const ball = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                    ball.setAttribute("fill", "#17f700")
                    ball.setAttribute("cx", x)
                    ball.setAttribute("cy", y)
                    ball.setAttribute("r", radius)
                    this.container.appendChild(ball)
                    const ball1 = document.createElementNS("http://www.w3.org/2000/svg", "circle")
                    ball1.setAttribute("fill", "#f7f7f7")
                    ball1.setAttribute("cx", x)
                    ball1.setAttribute("cy", y)
                    ball1.setAttribute("r", radius / 5)
                    this.container.appendChild(ball1)
                    ball.ori_x = x
                    ball.ori_y = y
                    this.balls.push(ball)
                }

            })
            itery += 1
        })
    },
    move_balls(x, y) {
        this.balls.forEach((ball) => {
            if (this.enable == true) {
                const mouse_x = x - this.left
                const mouse_y = y - this.top
                const dx = ball.ori_x - mouse_x
                const dy = ball.ori_y - mouse_y
                const distance = Math.sqrt(dx ** 2 + dy ** 2)
                if (distance <= this.mouse_radius) {
                    ball.move_x = mouse_x + dx / distance * this.mouse_radius
                    ball.move_y = mouse_y + dy / distance * this.mouse_radius
                    if (ball.anim) ball.anim.kill()
                    ball.anim = gsap.timeline()
                        .to(ball, {
                            attr: {
                                cx: ball.move_x,
                                cy: ball.move_y
                            },
                            duration: 0.5,
                            ease: "power3.out"
                        })
                        .to(ball, {
                            attr: {
                                cx: ball.ori_x,
                                cy: ball.ori_y
                            },
                            duration: 1,
                            ease: "power3.out"
                        }, "<0.1")
                }
            }
        })
    },
    hide_balls() {
        this.enable = false
        this.balls.forEach((ball) => {
            if (ball.anim) ball.anim.kill()
            ball.anim = gsap.timeline()
                .to(ball, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.out"
                })
        })
    },
    show_balls() {

        this.balls.forEach((ball) => {
            if (ball.anim) ball.anim.kill()
            ball.anim = gsap.timeline()
                .to(ball, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    onComplete: () => {
                        this.enable = true
                    }
                })

        })
    }
}
function isNeedChange(num, left, right, nowrangebegin) {
    if (num >= left && num <= right && nowrangebegin != left) return true
    return false
}


const Scroll = {
    wrapper: document.querySelector(".wrapper"),
    content: document.querySelector(".intro"),
    nowrange: 0,
    enable: true,
    init() {
        this.create_scroll_trigger()
    },
    create_scroll_trigger() {
        ScrollTrigger.create({
            trigger: this.wrapper,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                if (this.enable && self.progress >= 0.99) {
                    magnetic.hide_balls()
                    this.enable = false
                } else if (this.enable == false && self.progress < 0.99) {
                    magnetic.show_balls()
                    this.enable = true
                }


                if (isNeedChange(self.progress, 0, 0.25, this.nowrange)) {
                    setDescribeText('PRODUCT')
                    this.nowrange = 0
                    console.log("Change to [0,0.25]")
                } else if (isNeedChange(self.progress, 0.25, 0.5, this.nowrange)) {
                    setDescribeText('IDEA')
                    this.nowrange = 0.25
                    console.log("Change to [0.25,0.5]")
                } else if (isNeedChange(self.progress, 0.5, 0.75, this.nowrange)) {
                    setDescribeText('EVERYTHING')
                    this.nowrange = 0.5
                    console.log("Change to [0.5,0.75]")
                } else if (isNeedChange(self.progress, 0.75, 1, this.nowrange)) {
                    setDescribeText('FUTURE')
                    this.nowrange = 0.75
                    console.log("Change to [0.75,1]")
                }
            }
        })
    }
}
function setDescribeText(text) {
    const element = document.querySelector(".flux")
    gsap.to(element, {
        duration: 0.5,
        text: {
            value: text,
            speed: 7,
            type: "diff",
        },
        ease: "none",
        onComplete: () => {
            magnetic.resize()
        }
    });
}
function setDescribeTextEco(text) {
    const element = document.querySelector(".ecotext")
    gsap.to(element, {
        duration: 0.5,
        text: {
            value: text,
            speed: 7,
            type: "diff",
        },
        ease: "none",
        onComplete: () => {
            magnetic.resize()
        }
    });
}
function toggleOpac(ele, statue) {
    const element = document.querySelector(ele)
    gsap.to(element,
        {
            duration: 0.5,
            opacity: statue == true ? 1 : 0.5,
            ease: "power1.in"
        }
    )
}
// const words = ["设计与采购<br>我们使用回收和可再生的理念及材料来设计产品", "生产制造<br>使用最先进的技术来降低生产过程中的对环境的污染", "包装及物流<br>我们优先采用碳排放较低的物流方式，例如海运、铁路和公路来运输产品<br>并且努力从 Mighty™ 产品的包装中去除塑料成分。", "使用及回收<br>我们积极推进回收技术的研发"]
// const EcoScroll = {
//     wrapper: document.querySelector(".ecowrapper"),
//     content: document.querySelector(".ecointro"),
//     nowrange: 0,
//     recycle: lottie.loadAnimation({
//         container: document.querySelector(".recycle"),
//         renderer: 'svg',
//         loop: true,
//         autoplay: true,
//         path: '/assets/json/env_recycle.json'
//     }),
//     solar: lottie.loadAnimation({
//         container: document.querySelector(".solar"),
//         renderer: 'svg',
//         loop: true,
//         autoplay: false,
//         path: '/assets/json/env_solar.json'
//     }),
//     box: lottie.loadAnimation({
//         container: document.querySelector(".box"),
//         renderer: 'svg',
//         loop: true,
//         autoplay: false,
//         path: '/assets/json/env_box.json'
//     }),
//     flower: lottie.loadAnimation({
//         container: document.querySelector(".flower"),
//         renderer: 'svg',
//         loop: true,
//         autoplay: false,
//         path: '/assets/json/env_flower.json'
//     }),
//     nowplay: [],
//     setcolor: false,
//     init() {
//         toggleOpac(".recycle", true)
//         setDescribeTextEco(words[0])
//         this.nowplay = [this.recycle, ".recycle"]
//         this.create_scroll_trigger()
//     },
//     create_scroll_trigger() {
//         ScrollTrigger.create({
//             trigger: this.wrapper,
//             start: "top top",
//             end: "bottom bottom",
//             onUpdate: (self) => {
//                 if (this.setcolor == false && self.progress >= 0.02) {
                    
//                     this.setcolor = true
//                 } else if (this.setcolor && self.progress < 0.02) {
                    
//                     this.setcolor = false
//                 }
//                 if (isNeedChange(self.progress, 0, 0.25, this.nowrange)) {
//                     toggleOpac(this.nowplay[1], false)
//                     this.nowplay[0].stop()
//                     this.nowplay = [this.recycle, ".recycle"]
//                     this.nowplay[0].goToAndPlay(0)
//                     toggleOpac(this.nowplay[1], true)
//                     setDescribeTextEco(words[0])
//                     this.nowrange = 0
//                     console.log("Change to [0,0.25]")
//                 } else if (isNeedChange(self.progress, 0.25, 0.5, this.nowrange)) {
//                     toggleOpac(this.nowplay[1], false)
//                     this.nowplay[0].stop()
//                     this.nowplay = [this.solar, ".solar"]
//                     this.nowplay[0].goToAndPlay(0)
//                     toggleOpac(this.nowplay[1], true)
//                     setDescribeTextEco(words[1])
//                     this.nowrange = 0.25
//                     console.log("Change to [0.25,0.5]")
//                 } else if (isNeedChange(self.progress, 0.5, 0.75, this.nowrange)) {
//                     toggleOpac(this.nowplay[1], false)
//                     this.nowplay[0].stop()
//                     this.nowplay = [this.box, ".box"]
//                     this.nowplay[0].goToAndPlay(0)
//                     toggleOpac(this.nowplay[1], true)
//                     setDescribeTextEco(words[2])
//                     this.nowrange = 0.5
//                     console.log("Change to [0.5,0.75]")
//                 } else if (isNeedChange(self.progress, 0.75, 1, this.nowrange)) {
//                     toggleOpac(this.nowplay[1], false)
//                     this.nowplay[0].stop()
//                     this.nowplay = [this.flower, ".flower"]
//                     this.nowplay[0].goToAndPlay(0)
//                     toggleOpac(this.nowplay[1], true)
//                     setDescribeTextEco(words[3])
//                     this.nowrange = 0.75
//                     console.log("Change to [0.75,1]")
//                 }
//             },
//             onLeaveBack: ()=>{
//                 gsap.to(".titlebar", {
//                         duration: 1,
//                         background: 'inherit',
//                         delay: 0.5
//                     })
//             },
//             onEnter: ()=>{
//                 gsap.to(".titlebar", {
//                         duration: 1,
//                         background: 'linear-gradient(90deg, #003315 0%, #00993f 100%)'
//                     })
//             }
//         })
//     }
// }





// JIEJOE produce
// b站主页：https://space.bilibili.com/3546390319860710
const loading = {
    row: 15,
    line: 15,
    container: null,
    blocks: [],
    init() {
        this.container = document.querySelector('.loading');
        this.creat_blocks();
        setTimeout(() => {
            this.hidden();
        }, 1000)
    },
    creat_blocks() {
        for (let l = 0; l < this.line; l++) {
            let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            for (let r = 0; r < this.row; r++) {
                let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
                use.setAttribute("class", "loading_block");
                use.setAttribute("href", "#loading_hexagon");
                use.setAttribute("x", `${l % 2 ? 86.5 * r : 86.5 * r + 43.3}`);
                use.setAttribute("y", `${74.5 * l}`);
                use.setAttribute("transform-origin", "50 50")
                g.appendChild(use);
                this.blocks.push(use);
            }
            this.container.appendChild(g);
        }
    },
    hidden() {
        gsap.timeline()
            .set(this.blocks, {
                "stroke-dashoffset": () => { return Math.random() > 0.5 ? -100 : 100 },
            })
            .to(this.blocks, {
                "stroke-dashoffset": 0,
                "stroke-opacity": 0.4,
                duration: 0.5,
                ease: "power4.out",
                stagger: {
                    from: "random",
                    each: 0.002
                }
            })

    }
}


const advintroscroll = {
    wrapper: document.querySelector(".advwrapper"),
    adv : document.querySelector(".advcards"),
    distance: 0,
    if_leave: false,
    init(){
        this.resize()
        window.addEventListener("resize",this.resize.bind(this))
        this.create_scroll_trigger()
    },
    create_scroll_trigger(){
        ScrollTrigger.create({
            trigger: this.wrapper,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self)=>{
                this.adv.style.transform = `translateX(-${self.progress * this.distance}px)`
            },
            onLeave: ()=>{
                this.if_leave = true
            },
            onEnterBack: ()=>{
                this.if_leave = false
            }
        })
    },
    resize(){
        this.distance = this.adv.offsetWidth - innerWidth
        this.wrapper.style.height = `max(${this.distance}px, 100vh)`
        if(this.if_leave) this.adv.style.transform = `translateX(-${this.distance}px)`
    }
}