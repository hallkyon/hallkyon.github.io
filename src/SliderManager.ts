export default class SliderManager {
    static getSliderValue(sliderId: string): number {
        const slider = document.getElementById(sliderId) as HTMLInputElement;
        if (!slider) {
            throw new Error(`Slider with id "${sliderId}" not found.`);
        }
        const value = parseFloat(slider.value);
        if (isNaN(value)) {
            throw new Error(`Invalid value for slider "${sliderId}".`);
        }
        return value;
    }
}
