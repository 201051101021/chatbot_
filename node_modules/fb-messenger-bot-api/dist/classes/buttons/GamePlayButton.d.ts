import { Button } from './Button';
import { IGamePlayButton } from '../../interfaces';
import { GamePlayButtonBuilder } from '../../builders/buttons';
/**
 * Represents a GamePlay Button. Used to represent shape of Facebook API object. Type returned by builder and exposed to users to create
 * own object of proper shape if desired taking into account content restrictions for the object.
 *
 * Check link for content restrictions: https://developers.facebook.com/docs/messenger-platform/reference/buttons/game-play
 */
export declare class GamePlayButton extends Button implements IGamePlayButton {
    readonly game_metadata: {
        player_id?: string;
        context_id?: string;
    };
    readonly payload: string;
    readonly title: string;
    constructor(builder: GamePlayButtonBuilder);
    get GameMetadata(): {
        player_id?: string;
        context_id?: string;
    };
    get Payload(): string;
    get Title(): string;
}
