import { IButton } from '../../interfaces';
import { ATTACHMENT_TYPE } from '../../enums';
import { AttachmentButtonPayload } from '../../classes/buttons';
/**
 * Represents an entire Button payload. To be used as payload for Quick Reply attachment type to send Button with Quick Replies
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons
 */
export declare class AttachmentButtonBuilder {
    private _type;
    private _text;
    private _buttons;
    constructor();
    getType(): ATTACHMENT_TYPE;
    getText(): string;
    setText(value: string): this;
    getButtons(): IButton[];
    setButtons(value: IButton[]): this;
    build(): AttachmentButtonPayload;
}
