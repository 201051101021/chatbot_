import { IMessageTemplate } from '../../interfaces';
import { MESSAGE_TEMPLATE_TYPE } from '../../enums';
export declare abstract class AbstractMessageTemplate implements IMessageTemplate {
    readonly template_type: MESSAGE_TEMPLATE_TYPE;
    constructor(template_type: MESSAGE_TEMPLATE_TYPE);
    get Template_type(): MESSAGE_TEMPLATE_TYPE;
}
