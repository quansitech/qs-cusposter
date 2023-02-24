export const clonePropertySchema = (propertySchema) => {
    const newPropertySchema = propertySchema.map(item => {
        const newItem = {};
        for (const [k, v] of Object.entries(item)) {
            if (typeof v === 'object') {
                newItem[k] = { ...v };
            }
            else {
                newItem[k] = v;
            }
        }
        return newItem;
    });

    return [...newPropertySchema];
}