// To parse this data:
//
//   import { Convert } from "./file";
//
//   const battleLog = Convert.toBattleLog(json);

export interface BattleLog {
    type: Type;
    battleTime: string;
    isLadderTournament: boolean;
    arena: Arena;
    gameMode: Arena;
    deckSelection: DeckSelection;
    team: Opponent[];
    opponent: Opponent[];
}

export interface Arena {
    id: number;
    name: Name;
}

export enum Name {
    Ladder = 'Ladder',
    LegendaryArena = 'Legendary Arena',
    ShowdownLadder = 'Showdown_Ladder',
}

export enum DeckSelection {
    Collection = 'collection',
}

export interface Opponent {
    tag: string;
    name: string;
    startingTrophies: number;
    trophyChange?: number;
    crowns: number;
    kingTowerHitPoints?: number;
    princessTowersHitPoints?: number[];
    clan: Clan;
    cards: Card[];
}

export interface Card {
    name: string;
    id: number;
    level: number;
    maxLevel: number;
    iconUrls: IconUrls;
    starLevel?: number;
}

export interface IconUrls {
    medium: string;
}

export interface Clan {
    tag: string;
    name: string;
    badgeId: number;
}

export enum Type {
    ClanWarWarDay = 'clanWarWarDay',
    PVP = 'PvP',
}

// Converts JSON strings to/from your types
export class ConvertBattle {
    public static toBattleLog(json: string): BattleLog[] {
        return JSON.parse(json);
    }

    public static battleLogToJson(value: BattleLog[]): string {
        return JSON.stringify(value);
    }
}
