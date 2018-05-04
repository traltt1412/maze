import RandomMaze from "./RandomMaze"
import Config from "./config";
import Dummy from "./Dummy";

export default class MazeGame {
    constructor(el){
        let config = new Config({boardWidth: el.offsetWboardWidth, boardHeight: el.offsetHeight, canvas: el.querySelector('canvas')})
        let maze = new RandomMaze(config)
        let dummy = new Dummy(config)
    }
}