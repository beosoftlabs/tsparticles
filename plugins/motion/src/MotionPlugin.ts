import type { Container, Engine, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IMotionOptions, MotionOptions } from "./types.js";
import { Motion } from "./Options/Classes/Motion.js";
import type { MotionInstance } from "./MotionInstance.js";

/**
 */
export class MotionPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "motion";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<MotionInstance> {
        const { MotionInstance } = await import("./MotionInstance.js");

        return new MotionInstance(container, this._engine);
    }

    loadOptions(options: MotionOptions, source?: RecursivePartial<IMotionOptions>): void {
        if (!this.needsPlugin()) {
            return;
        }

        let motionOptions = options.motion!;

        if (!motionOptions?.load) {
            options.motion = motionOptions = new Motion();
        }

        motionOptions.load(source?.motion);
    }

    needsPlugin(): boolean {
        return true;
    }
}
