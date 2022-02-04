export type KeyStatus = 'keydown' | 'keyup';
type KeysStatus = { [key: string]: { type: KeyStatus, repeat: boolean } | undefined };

export class Input {
    private static keyEvent: KeysStatus = {};

    public static addKeyEvent(event: KeyboardEvent): void {
        this.keyEvent[event.key.toLowerCase()] = { type: event.type as KeyStatus, repeat: event.repeat };
    }

    /**
     * Cleans up key statussen that should be cleaned after a frame.
     */
    public static clearKeysStatus(): void {
        for (const key of Object.keys(this.keyEvent)) {
            if (this.keyEvent[key]?.type === 'keyup') {
                this.keyEvent[key] = undefined;
            }
        }
    }

    private static isKey(key: string, type: KeyStatus, repeat?: boolean): boolean {
        return this.keyEvent[key]?.type === type && (typeof repeat === 'boolean' ? this.keyEvent[key]?.repeat === repeat : true);
    }

    public static isKeyDown(key: string, repeat?: boolean): boolean {
        return this.isKey(key, 'keydown', repeat);
    }

    public static isKeyUp(key: string, repeat?: boolean): boolean {
        return this.isKey(key, 'keyup', repeat);
    }
}