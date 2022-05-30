"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums");
const buttons_1 = require("../../classes/buttons");
/**
 * Represents an entire Button payload. To be used as payload for Quick Reply attachment type to send Button with Quick Replies
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons
 */
class AttachmentButtonBuilder {
    constructor() {
        this._type = enums_1.ATTACHMENT_TYPE.TEMPLATE;
    }
    getType() {
        return this._type;
    }
    getText() {
        return this._text;
    }
    setText(value) {
        this._text = value;
        return this;
    }
    getButtons() {
        return this._buttons;
    }
    setButtons(value) {
        this._buttons = value;
        return this;
    }
    build() {
        return new buttons_1.AttachmentButtonPayload(this);
    }
}
exports.AttachmentButtonBuilder = AttachmentButtonBuilder;
//# sourceMappingURL=AttachmentButtonBuilder.js.map