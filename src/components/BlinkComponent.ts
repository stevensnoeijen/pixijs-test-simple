import { Component, Types } from "ecsy";

interface IBlinkComponentProps {
    blinkTime: number;
    removeAfter: number;
    elapsedTime: number;
}

export class BlinkComponent extends Component<IBlinkComponentProps> {
    blinkTime!: number;
    removeAfter!: number;
    elapsedTime!: number;
}

BlinkComponent.schema = {
    blinkTime: { type: Types.Number },
    removeAfter: { type: Types.Number },
    elapsedTime: { type: Types.Number },
};