import { Component, Types } from "ecsy";

interface ILevelComponentProps {
    number: number;
}

export class LevelComponent extends Component<ILevelComponentProps> {
    number!: number;
}

LevelComponent.schema = {
    number: { type:  Types.Number, default: 0 }
};