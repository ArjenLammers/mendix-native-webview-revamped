/**
 * This file was generated from WebViewRevamped.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export interface WebViewRevampedProps<Style> {
    name: string;
    style: Style[];
    url?: DynamicValue<string>;
    content?: DynamicValue<string>;
    onMessageInput?: EditableValue<string>;
    onMessage?: ActionValue;
    onNavigationAttribute?: EditableValue<string>;
    onNavigationChange?: ActionValue;
    onErrorAttribute?: EditableValue<string>;
    onError?: ActionValue;
    onHTTPErrorAttribute?: EditableValue<string>;
    onHTTPError?: ActionValue;
    userAgent: string;
    openLinksExternally: boolean;
    exposeWebViewToWindow: boolean;
}

export interface WebViewRevampedPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    url: string;
    content: string;
    onMessageInput: string;
    onMessage: {} | null;
    onNavigationAttribute: string;
    onNavigationChange: {} | null;
    onErrorAttribute: string;
    onError: {} | null;
    onHTTPErrorAttribute: string;
    onHTTPError: {} | null;
    userAgent: string;
    openLinksExternally: boolean;
    exposeWebViewToWindow: boolean;
}
