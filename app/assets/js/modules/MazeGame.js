import RandomMaze from "./RandomMaze"
import Config from "./Config";
import Dummy from "./Dummy";

export default class MazeGame {
    constructor(el){
        const config = new Config({boardWidth: el.offsetWboardWidth, boardHeight: el.offsetHeight, canvas: el.querySelector('canvas')})
        const maze = new RandomMaze(config)
        const dummy = new Dummy(config, maze.map)
    }
}