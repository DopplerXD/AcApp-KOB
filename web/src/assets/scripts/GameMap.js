import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;

        this.rows = 13;
        this.cols = 14;

        this.inner_walls_count = 20;
        this.walls = [];

        this.snakes = [
            new Snake({ id: 0, color: "#4876ec", r: this.rows - 2, c: 1 }, this),
            new Snake({ id: 1, color: "#f94848", r: 1, c: this.cols - 2 }, this)
        ];
    }

    // dfs检查连通性
    check_connectivity(g, ax, ay, bx, by) {
        if (ax == bx && ay == by) return true;
        g[ax][ay] = true;
        let dx = [0, 0, 1, -1], dy = [1, -1, 0, 0];
        for (let i = 0; i < 4; i++) {
            let xx = ax + dx[i], yy = ay + dy[i];
            if (!g[xx][yy] && this.check_connectivity(g, xx, yy, bx, by))
                return true;
        }
        return false;
    }

    create_walls() {
        const g = [];
        for (let r = 0; r < this.rows; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }

        // 给四周加上墙
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
        for (let c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true;   
        }

        // 创建随机障碍物
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
                if ((r == this.rows - 2 && c == 1) || (r == 1 && c == this.cols - 2)) continue;
                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
                break;
            }
        }

        // 判断图的连通性
        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2))
            return false;

        // 绘制墙壁
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }

    start() {
        for (let i = 0; i < 1000; i++) {
            if (this.create_walls())
                break;
        }
    } 

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.update_size();
        this.render();
    }

    render() { // 渲染，每一帧执行一次
        const color_even = "#aad751", color_odd = "#a2d048";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                }
                else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}