// Copied from: https://github.com/mendix/widgets-resources/blob/master/packages/tools/piw-utils-internal/src/functions.ts

import { ActionValue } from "mendix";

export const executeAction = (action?: ActionValue): void => {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
    }
};
