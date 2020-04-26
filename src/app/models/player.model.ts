// To parse this data:
//
//   import { Convert, PlayerInfo } from "./file";
//
//   const playerInfo = Convert.toPlayerInfo(json);

export interface PlayerInfo {
    tag: string;
    name: string;
    expLevel: number;
    trophies: number;
    bestTrophies: number;
    wins: number;
    losses: number;
    battleCount: number;
    threeCrownWins: number;
    challengeCardsWon: number;
    challengeMaxWins: number;
    tournamentCardsWon: number;
    tournamentBattleCount: number;
    role: string;
    donations: number;
    donationsReceived: number;
    totalDonations: number;
    warDayWins: number;
    clanCardsCollected: number;
    clan: Clan;
    arena: Arena;
    leagueStatistics: LeagueStatistics;
    badges: Badge[];
    achievements: Achievement[];
    cards: Card[];
    currentDeck: Card[];
    currentFavouriteCard: CurrentFavouriteCard;
    starPoints: number;
}

export interface Achievement {
    name: string;
    stars: number;
    value: number;
    target: number;
    info: string;
    completionInfo: null;
}

export interface Arena {
    id: number;
    name: string;
}

export interface Badge {
    name: string;
    level?: number;
    maxLevel?: number;
    progress: number;
    target?: number;
}

export interface Card {
    name: string;
    id: number;
    level: number;
    maxLevel: number;
    count: number;
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

export interface CurrentFavouriteCard {
    name: string;
    id: number;
    maxLevel: number;
    iconUrls: IconUrls;
}

export interface LeagueStatistics {
    currentSeason: CurrentSeason;
    previousSeason: PreviousSeason;
    bestSeason: BestSeason;
}

export interface BestSeason {
    id: string;
    trophies: number;
}

export interface CurrentSeason {
    trophies: number;
    bestTrophies: number;
}

export interface PreviousSeason {
    id: string;
    trophies: number;
    bestTrophies: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPlayerInfo(json: string): PlayerInfo {
        return JSON.parse(json);
    }

    public static playerInfoToJson(value: PlayerInfo): string {
        return JSON.stringify(value);
    }
}
