// Copied from: https://github.com/mendix/widgets-resources/blob/master/packages/tools/piw-native-utils-internal/src/styles.ts

import { ImageStyle, TextStyle, ViewStyle } from "react-native";

interface CustomStyle {
    [key: string]: string | number;
}

export interface Style {
    [key: string]: CustomStyle | ViewStyle | TextStyle | ImageStyle | object;
}

function flattenObjects<T extends object>(objects: T[]): T {
    return objects.reduce((merged, object) => ({ ...merged, ...object }), {} as T);
}

export function flattenStyles<T extends Style>(defaultStyle: T, overrideStyles: Array<T | undefined>): T {
    const styles = [defaultStyle, ...overrideStyles.filter((object): object is T => object !== undefined)];

    return Object.keys(defaultStyle).reduce((flattened, currentKey) => {
        const styleItems = styles.map(object => object[currentKey]);
        return {
            ...flattened,
            [currentKey]: flattenObjects(styleItems)
        };
    }, {} as T);
}
