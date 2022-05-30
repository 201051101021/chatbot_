import { IURLButton } from '../../interfaces';
import { Button } from './Button';
import { URLButtonBuilder } from '../../builders/buttons';
/**
 * Represents a URL Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/url
 */
export declare class URLButton extends Button implements IURLButton {
    readonly url: string;
    readonly title: string;
    readonly messenger_extensions?: boolean;
    readonly fallback_url?: string;
    readonly webview_height_ratio?: string;
    readonly webview_share_button?: string;
    constructor(builder: URLButtonBuilder);
    get Url(): string;
    get Title(): string;
    get MessengerExtensions(): boolean | undefined;
    get FallbackUrl(): string | undefined;
    get WebviewHeightRatio(): string | undefined;
    get WebviewShareButton(): string | undefined;
}
