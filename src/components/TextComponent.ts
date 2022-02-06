import * as PIXI from 'pixi.js';
import { Component, Types } from "ecsy";

interface ITextComponentProps {
    text: PIXI.Text;
}

export class TextComponent extends Component<ITextComponentProps> {
    text!: PIXI.Text;
}

TextComponent.schema = {
    text: { type:  Types.Ref }
};