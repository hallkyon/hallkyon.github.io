export default class SliderManager {
    static getSliderValue(sliderId) {
        const slider = document.getElementById(sliderId);
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
