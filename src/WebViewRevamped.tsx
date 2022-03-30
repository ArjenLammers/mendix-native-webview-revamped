import { createElement, ReactElement, useMemo } from "react";
import { Text, View, Linking } from "react-native";
import { WebView as RNWebView } from "react-native-webview";
import { ValueStatus } from "mendix";

import { WebViewRevampedProps } from "../typings/WebViewRevampedProps";
import { defaultWebViewStyle, WebViewStyle } from "./ui/Styles";

import { flattenStyles } from "./util/style";
import { executeAction } from "./util/action";
import { useExposeToWindow } from "./util/expose";
import {
    WebViewErrorEvent,
    WebViewHttpErrorEvent,
    WebViewMessageEvent,
    WebViewNavigation
} from "react-native-webview/lib/WebViewTypes";

export type Props = WebViewRevampedProps<WebViewStyle>;

export function WebViewRevamped({
    style,
    url,
    content,
    name,
    userAgent,
    openLinksExternally,
    onError,
    onErrorAttribute,
    onHTTPError,
    onHTTPErrorAttribute,
    onMessage,
    onMessageInput,
    onNavigationChange,
    onNavigationAttribute,
    exposeWebViewToWindow,
    headers,
    headerKey,
    headerValue
}: Props): ReactElement {
    const styles = useMemo(() => flattenStyles(defaultWebViewStyle, style), [style]);
    const [webViewSet] = useExposeToWindow(name, exposeWebViewToWindow);

    const onErrorHandler = (error: WebViewErrorEvent): void => {
        onErrorAttribute?.setTextValue(JSON.stringify(error.nativeEvent));
        executeAction(onError);
    };

    const onHTTPErrorHandler = (error: WebViewHttpErrorEvent): void => {
        onHTTPErrorAttribute?.setTextValue(JSON.stringify(error.nativeEvent));
        executeAction(onHTTPError);
    };

    const onMessageHandler = (event: WebViewMessageEvent): void => {
        onMessageInput?.setTextValue(JSON.stringify(event.nativeEvent));
        executeAction(onMessage);
    };

    const onNavigationChangeHandler = (event: WebViewNavigation): void => {
        onNavigationAttribute?.setTextValue(JSON.stringify(event));
        executeAction(onNavigationChange);
    };

    // Show an empty view while url or content are still loading;
    if ((url && url.status === ValueStatus.Loading) || (content && content.status === ValueStatus.Loading) || 
        headers && headers.status === ValueStatus.Loading
        ) {
        return <View />;
    }

    const uri = url && url.value;
    const html = content && content.value;

    if (!uri && !html) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No URL or content was provided</Text>
            </View>
        );
    }

    const headerObj:any = {};
    headers?.items?.forEach((h) => {
        headerObj["" + headerKey?.get(h).value] = headerValue?.get(h).value;
    });

    return (
        <View style={styles.container}>
            <RNWebView
                testID={name}
                ref={ref => webViewSet(ref)}
                source={html ? { html } : { 
                    uri: uri!,
                    headers: headerObj
                }}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                userAgent={userAgent}
                onShouldStartLoadWithRequest={({ url }) => {
                    const openExternal = openLinksExternally && (html ? url.slice(0, 4) === "http" : url !== uri);
                    if (openExternal) {
                        Linking.openURL(url);
                        return false;
                    }
                    return true;
                }}
                onError={onErrorHandler}
                onHttpError={onHTTPErrorHandler}
                onMessage={onMessageHandler}
                onNavigationStateChange={onNavigationChangeHandler}
            />
        </View>
    );
}
