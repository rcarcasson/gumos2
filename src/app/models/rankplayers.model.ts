// To parse this data:
//
//   import { Convert, PlayersRank } from "./file";
//
//   const playersRank = Convert.toPlayersRank(json);

export interface PlayersRank {
    items: Item[];
    paging: Paging;
}

export interface Item {
    tag: string;
    name: string;
    expLevel: number;
    trophies: number;
    rank: number;
    previousRank: number;
    clan?: Clan;
    arena: Arena;
}

export interface Arena {
    id: number;
    name: Name;
}

export enum Name {
    Champion = 'Champion',
    GrandChampion = 'Grand Champion',
    RoyalChampion = 'Royal Champion',
    UltimateChampion = 'Ultimate Champion',
}

export interface Clan {
    tag: string;
    name: string;
    badgeId: number;
}

export interface Paging {
    cursors: Cursors;
}

export interface Cursors {
}

// Converts JSON strings to/from your types
export class ConvertPlayerRank {
    public static toPlayersRank(json: string): PlayersRank {
        return JSON.parse(json);
    }

    public static playersRankToJson(value: PlayersRank): string {
        return JSON.stringify(value);
    }
}
