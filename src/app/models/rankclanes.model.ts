// To parse this data:
//
//   import { Convert, ClanRank } from "./file";
//
//   const clanRank = Convert.toClanRank(json);

export interface ClanRank {
    items: ItemClan[];
    paging: Paging;
}

export interface ItemClan {
    tag: string;
    name: string;
    rank: number;
    previousRank: number;
    location: Location;
    clanScore: number;
    members: number;
    badgeId: number;
}

export interface Location {
    id: number;
    name: Name;
    isCountry: boolean;
    countryCode: CountryCode;
}

export enum CountryCode {
    Cl = 'CL',
}

export enum Name {
    Chile = 'Chile',
}

export interface Paging {
    cursors: Cursors;
}

export interface Cursors {
}

// Converts JSON strings to/from your types
export class ConvertClanRank {
    public static toClanRank(json: string): ClanRank {
        return JSON.parse(json);
    }

    public static clanRankToJson(value: ClanRank): string {
        return JSON.stringify(value);
    }
}
