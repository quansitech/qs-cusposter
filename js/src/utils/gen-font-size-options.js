export const genFontSizeOptions = () => {
    const options = [];
    for (let i = 12; i <= 48; i = i + 2) {
        options.push({label: `${i}px`, value: i});
    }
    return options;
}