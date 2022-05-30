import { AbstractMessageTemplate } from './AbstractMessageTemplate';
import { IAirlineItineraryFlightInfo, IAirlineItineraryPassengerInfo, IAirlineItineraryPassengerSegment, IAirlineItineraryPriceInfo, IAirlineItineraryTemplate } from '../../interfaces';
import { AirlineItineraryTemplateBuilder } from '../../builders/templates';
/**
 * Represents an Airline Itinerary Template. Used to represent shape of Facebook API object. Type returned by builder
 * and exposed to users to create own object of proper shape if desired taking into account content restrictions for the
 * object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/template/airline-itinerary
 */
export declare class AirlineItineraryTemplate extends AbstractMessageTemplate implements IAirlineItineraryTemplate {
    readonly base_price?: number;
    readonly currency: string;
    readonly flight_info: IAirlineItineraryFlightInfo[];
    readonly intro_message: string;
    readonly locale: string;
    readonly passenger_info: IAirlineItineraryPassengerInfo[];
    readonly passenger_segment_info: IAirlineItineraryPassengerSegment[];
    readonly pnr_number: string;
    readonly price_info?: IAirlineItineraryPriceInfo[];
    readonly tax?: number;
    readonly theme_color?: string;
    readonly total_price: number;
    constructor(builder: AirlineItineraryTemplateBuilder);
    get Base_price(): number | undefined;
    get Currency(): string;
    get Flight_info(): IAirlineItineraryFlightInfo[];
    get Intro_message(): string;
    get Locale(): string;
    get Passenger_info(): IAirlineItineraryPassengerInfo[];
    get Passenger_segment_info(): IAirlineItineraryPassengerSegment[];
    get Pnr_number(): string;
    get Price_info(): IAirlineItineraryPriceInfo[] | undefined;
    get Tax(): number | undefined;
    get Theme_color(): string | undefined;
    get Total_price(): number;
}
