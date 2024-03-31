'use strict'
/**
 * @param value {number}
 * @param [min=-Infinity] {number}
 * @param [max=Infinity] {number}
 * @returns {number}
 */
const clamp = (value, min = -Infinity, max = Infinity) => {
    max = typeof max !== 'number' || Number.isNaN(max)
        ? Infinity
        : max
    min = typeof min !== 'number' || Number.isNaN(min)
        ? -Infinity
        : min > max
            ? max
            : min
    return typeof value !== 'number' || Number.isNaN(value) || value < min
        ? min
        : value > max
            ? max
            : value
}

/**
 * @param [hue=0] {number}
 * @param [saturation=0] {number}
 * @param [luminance=0] {number}
 * @returns {number[]}
 */
export const hsl2rgb = (hue = 0, saturation = 0, luminance = 0) => {
    const h = clamp(hue, 0, 360),
        s = clamp(saturation, 0, 100) / 100,
        l = clamp(luminance, 0, 100) / 100,
        q = h / 60,
        min = l < 0.5
            ? l - l * s
            : l - (1 - l) * s,
        max = l < 0.5
            ? l + l * s
            : l + (1 - l) * s
    return (
        q <= 1
            ? [max, q * (max - min) + min, min]
            : q <= 2
                ? [((60 * 2 - h) / 60) * (max - min) + min, max, min]
                : q <= 3
                    ? [min, max, ((h - 60 * 2) / 60) * (max - min) + min]
                    : q <= 4
                        ? [min, ((60 * 4 - h) / 60) * (max - min) + min, max]
                        : q <= 5
                            ? [((h - 60 * 4) / 60) * (max - min) + min, min, max]
                            : [max, min, ((360 - h) / 60) * (max - min) + min]
    ).map(n => n * 255)
}
