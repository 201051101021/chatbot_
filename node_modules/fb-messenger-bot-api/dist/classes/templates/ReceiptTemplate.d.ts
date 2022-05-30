import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IReceiptAddressProperty, IReceiptAdjustmentProperty, IReceiptElements, IReceiptSummaryProperty, IReceiptTemplate } from '../../interfaces';
import { ReceiptTemplateBuilder } from '../../builders/templates';
/**
 * Represents a Receipt Template. Used to represent shape of Facebook API object. Type returned by builder and exposed
 * to users to create own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/receipt
 */
export declare class ReceiptTemplate extends AbstractMessageTemplate implements IReceiptTemplate {
    readonly address?: IReceiptAddressProperty;
    readonly adjustments?: IReceiptAdjustmentProperty;
    readonly currency: string;
    readonly elements?: IReceiptElements;
    readonly merchant_name?: string;
    readonly order_number: string;
    readonly payment_method: string;
    readonly recipient_name: string;
    readonly sharable?: boolean;
    readonly summary: IReceiptSummaryProperty;
    readonly timestamp?: string;
    constructor(builder: ReceiptTemplateBuilder);
    get Address(): IReceiptAddressProperty | undefined;
    get Adjustments(): IReceiptAdjustmentProperty | undefined;
    get Currency(): string;
    get Elements(): IReceiptElements | undefined;
    get Merchant_name(): string | undefined;
    get Order_number(): string;
    get Payment_method(): string;
    get Recipient_name(): string;
    get Sharable(): boolean | undefined;
    get Summary(): IReceiptSummaryProperty;
    get Timestamp(): string | undefined;
}
