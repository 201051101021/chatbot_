"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("./Button");
/**
 * Represents a URL Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/url
 */
class URLButton extends Button_1.Button {
    constructor(builder) {
        super(builder.getType());
        this.url = builder.getUrl();
        this.title = builder.getTitle();
        this.messenger_extensions = builder.getMessengerExtensions();
        this.fallback_url = builder.getFallbackUrl();
        this.webview_share_button = builder.getWebviewShareButton();
        this.webview_height_ratio = builder.getWebviewHeightRatio();
    }
    get Url() {
        return this.url;
    }
    get Title() {
        return this.title;
    }
    get MessengerExtensions() {
        return this.messenger_extensions;
    }
    get FallbackUrl() {
        return this.fallback_url;
    }
    get WebviewHeightRatio() {
        return this.webview_height_ratio;
    }
    get WebviewShareButton() {
        return this.webview_share_button;
    }
}
exports.URLButton = URLButton;
//# sourceMappingURL=URLButton.js.map