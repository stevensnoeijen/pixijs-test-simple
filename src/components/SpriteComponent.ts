import * as PIXI from 'pixi.js';
import { Component, Types } from "ecsy";

interface ISpriteComponentProps {
    sprite: PIXI.Sprite;
}

export class SpriteComponent extends Component<ISpriteComponentProps> {
    sprite!: PIXI.Sprite;
}

SpriteComponent.schema = {
    sprite: { type:  Types.Ref }
};