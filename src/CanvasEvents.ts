export default class CanvasEvents {
    private static _pointerLocation: DOMPointReadOnly;
    private static _pointerDown: boolean;

    private static getPointerLocation(
        event: PointerEvent | WheelEvent
    ): DOMPointReadOnly {
        try {
            const canvas = document.getElementById('svg');
            const pointerLocation = new DOMPointReadOnly(
                event.clientX,
                event.clientY
            );
            if (!(canvas instanceof SVGSVGElement)) {
                throw new Error('Canvas is not a SVGSVGElement');
            }
            return pointerLocation.matrixTransform(
                canvas.getScreenCTM()?.inverse()
            );
        } catch {}
    }

    public static onPointerDown(event: PointerEvent): void {
        event.preventDefault();
    }

    public static onPointerUp(): void {}

    public static onPointerMove(event: PointerEvent): void {}

    public static onScroll(event: WheelEvent): void {}
}
