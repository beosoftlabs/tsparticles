import { MoveDirection, MoveDirectionAlt } from "../../../../Enums/Directions/MoveDirection";
import { OutMode, OutModeAlt } from "../../../../Enums/Modes/OutMode";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import { IDistance } from "../../../../Core/Interfaces/IDistance";
import type { IMove } from "../../../Interfaces/Particles/Move/IMove";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { MoveAngle } from "./MoveAngle";
import { MoveAttract } from "./MoveAttract";
import { MoveGravity } from "./MoveGravity";
import { MovePath } from "./Path/MovePath";
import { MoveTrail } from "./MoveTrail";
import { OutModes } from "./OutModes";
import { RangeValue } from "../../../../Types/RangeValue";
import { RecursivePartial } from "../../../../Types/RecursivePartial";
import { Spin } from "./Spin";
import { deepExtend } from "../../../../Utils/Utils";
import { setRangeValue } from "../../../../Utils/NumberUtils";

/**
 * [[include:Options/Particles/Move.md]]
 * @category Options
 */
export class Move implements IMove, IOptionLoader<IMove> {
    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     */
    get collisions(): boolean {
        return false;
    }

    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     * @param value
     */
    set collisions(value: boolean) {
        // deprecated
    }

    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     */
    get bounce(): boolean {
        return this.collisions;
    }

    /**
     * @deprecated this property is obsolete, please use the new collisions object on particles options
     * @param value
     */
    set bounce(value: boolean) {
        this.collisions = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    get out_mode(): OutMode | keyof typeof OutMode | OutModeAlt {
        return this.outMode;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    set out_mode(value: OutMode | keyof typeof OutMode | OutModeAlt) {
        this.outMode = value;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     */
    get outMode(): OutMode | keyof typeof OutMode | OutModeAlt {
        return this.outModes.default;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new outMode
     * @param value
     */
    set outMode(value: OutMode | keyof typeof OutMode | OutModeAlt) {
        this.outModes.default = value;
    }

    /**
     * @deprecated use the new [[path]] property instead
     */
    get noise(): MovePath {
        return this.path;
    }

    /**
     * @deprecated use the new [[path]] property instead
     */
    set noise(value: MovePath) {
        this.path = value;
    }

    angle;
    attract;
    center: ICoordinates & { radius: number };
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    distance: Partial<IDistance>;
    decay;
    drift: RangeValue;
    enable;
    gravity;
    path;
    outModes: OutModes;
    random;
    size;
    speed: RangeValue;
    spin;
    straight;
    trail;
    vibrate;
    warp;

    constructor() {
        this.angle = new MoveAngle();
        this.attract = new MoveAttract();
        this.center = {
            x: 50,
            y: 50,
            radius: 0,
        };
        this.decay = 0;
        this.distance = {};
        this.direction = MoveDirection.none;
        this.drift = 0;
        this.enable = false;
        this.gravity = new MoveGravity();
        this.path = new MovePath();
        this.outModes = new OutModes();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new Spin();
        this.straight = false;
        this.trail = new MoveTrail();
        this.vibrate = false;
        this.warp = false;
    }

    load(data?: RecursivePartial<IMove>): void {
        if (!data) {
            return;
        }

        if (data.angle !== undefined) {
            if (typeof data.angle === "number") {
                this.angle.value = data.angle;
            } else {
                this.angle.load(data.angle);
            }
        }

        this.attract.load(data.attract);

        this.center = deepExtend(this.center, data.center) as ICoordinates & { radius: number };

        if (data.decay !== undefined) {
            this.decay = data.decay;
        }

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        if (data.distance !== undefined) {
            this.distance =
                typeof data.distance === "number"
                    ? {
                          horizontal: data.distance,
                          vertical: data.distance,
                      }
                    : (deepExtend({}, data.distance) as IDistance);
        }

        if (data.drift !== undefined) {
            this.drift = setRangeValue(data.drift);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.gravity.load(data.gravity);

        const outMode = data.outMode ?? data.out_mode;

        if (data.outModes !== undefined || outMode !== undefined) {
            if (typeof data.outModes === "string" || data.outModes === undefined && outMode !== undefined) {
                this.outModes.load({
                    default: data.outModes ?? outMode,
                });
            } else {
                this.outModes.load(data.outModes);
            }
        }

        this.path.load(data.path ?? data.noise);

        if (data.random !== undefined) {
            this.random = data.random;
        }

        if (data.size !== undefined) {
            this.size = data.size;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        this.spin.load(data.spin);

        if (data.straight !== undefined) {
            this.straight = data.straight;
        }

        this.trail.load(data.trail);

        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }

        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
