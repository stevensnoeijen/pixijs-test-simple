import * as PIXI from 'pixi.js'

const application = new PIXI.Application()

document.getElementById("app")?.appendChild(application.view)

application.ticker.add((delta: number) => {

})

application.start()