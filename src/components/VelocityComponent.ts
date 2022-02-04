import { Component, Types } from "ecsy";

interface IVelocityComponentProps {
    x: number;
    y: number;
}

export class VelocityComponent extends Component<IVelocityComponentProps> {
    x!: number;
    y!: number;
}

VelocityComponent.schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 }
};