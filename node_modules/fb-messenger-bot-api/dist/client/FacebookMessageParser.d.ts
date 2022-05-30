import { FacebookMessagePayload, FacebookMessagePayloadMessagingEntry } from '../interfaces';
export declare class FacebookMessageParser {
    private constructor();
    static parsePayload(payload: FacebookMessagePayload): FacebookMessagePayloadMessagingEntry[];
    private static flattenPayload;
}
