import * as PIXI from 'pixi.js';
import { Attributes, System, World } from "ecsy";

export type PixiSystemAttributes = Attributes & {
	application: PIXI.Application;
}

export abstract class PixiSystem extends System {
	protected readonly application: PIXI.Application;

	constructor(world: World, attributes: PixiSystemAttributes) {
		super(world, arguments);
		this.application = attributes.application;
	}

}