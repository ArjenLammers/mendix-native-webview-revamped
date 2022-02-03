import { TextStyle, ViewStyle } from "react-native";
import { Style } from "src/util/style";

export interface WebViewStyle extends Style {
    container: ViewStyle;
    errorContainer: ViewStyle;
    errorText: TextStyle;
}

export const defaultWebViewStyle: WebViewStyle = {
    container: {
        flex: 1,
        height: "100%",
        minHeight: 300
    },
    errorContainer: {},
    errorText: {
        color: "red",
        fontWeight: "bold"
    }
};
