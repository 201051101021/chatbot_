import { IButton } from '../../interfaces';
import { BUTTON_TYPE } from '../../enums';
export declare abstract class Button implements IButton {
    readonly type: BUTTON_TYPE;
    constructor(type: BUTTON_TYPE);
    get Type(): BUTTON_TYPE;
}
