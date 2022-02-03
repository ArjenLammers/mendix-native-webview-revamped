import { useEffect } from "react";
import { WebView } from "react-native-webview";

/**
 * Expose the webview to 'window' in order for it to be reachable outside. It's a dirty solution I need to check
 * in the Mendix Native builds. You can disable it if it doesn't work
 *
 * @param name Name of the webview, this should be unique
 * @param exposeWebViewToWindow Boolean to switch it on or off
 * @returns
 */
export function useExposeToWindow(name: string, exposeWebViewToWindow: boolean): [(view: WebView | null) => void] {
    const webViewSet = (view: WebView | null): void => {
        if (window && exposeWebViewToWindow && view) {
            // @ts-ignore
            window[name] = view;
        }
    };

    useEffect(() => {
        return () => {
            if (window && exposeWebViewToWindow) {
                // @ts-ignore
                window[name] = undefined;
            }
        };
    }, [name, exposeWebViewToWindow]);

    return [webViewSet];
}
