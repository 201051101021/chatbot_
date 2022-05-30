"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("./Button");
/**
 * Represents a Buy Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/buy
 */
class BuyButton extends Button_1.Button {
    constructor(builder) {
        super(builder.getType());
        this.payload = builder.getPayload();
        this.payment_summary = builder.getPaymentSummary();
        this.title = builder.getTitle();
    }
    get Payload() {
        return this.payload;
    }
    get PaymentSummary() {
        return this.payment_summary;
    }
    get Title() {
        return this.title;
    }
}
exports.BuyButton = BuyButton;
//# sourceMappingURL=BuyButton.js.map