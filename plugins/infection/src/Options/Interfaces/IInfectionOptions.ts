import type { IInfection } from "./IInfection";
import type { IOptions } from "tsparticles-engine";

export type IInfectionOptions = IOptions & {
    infection: IInfection;
};
