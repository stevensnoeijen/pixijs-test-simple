import * as PIXI from 'pixi.js';

export const isCollided = (a: PIXI.Sprite, b: PIXI.Sprite, margin: number): boolean => {
    const aBox = a.getBounds();
    const bBox = b.getBounds();

    return aBox.x + aBox.width - margin > bBox.x
        && aBox.x < bBox.x + bBox.width - margin
        && aBox.y + aBox.height - margin > bBox.y
        && aBox.y < bBox.y + bBox.height - margin;
};