"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttachmentButtonPayload {
    constructor(builder) {
        this.payload = {
            template_type: 'button',
        };
        this.type = builder.getType();
        this.payload.buttons = builder.getButtons();
        this.payload.text = builder.getText();
    }
    get Type() {
        return this.type;
    }
    get Payload() {
        return this.payload;
    }
}
exports.AttachmentButtonPayload = AttachmentButtonPayload;
//# sourceMappingURL=AttachmentButtonPayload.js.map