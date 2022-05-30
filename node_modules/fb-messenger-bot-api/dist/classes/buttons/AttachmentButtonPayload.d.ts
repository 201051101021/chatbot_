import { ATTACHMENT_TYPE } from '../../enums';
import { AttachmentPayload } from '../../client/Client';
import { AttachmentButtonBuilder } from '../../builders/buttons';
export declare class AttachmentButtonPayload implements AttachmentPayload {
    readonly type: ATTACHMENT_TYPE;
    readonly payload: any;
    constructor(builder: AttachmentButtonBuilder);
    get Type(): ATTACHMENT_TYPE;
    get Payload(): object;
}
