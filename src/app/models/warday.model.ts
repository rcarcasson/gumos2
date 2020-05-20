// To parse this data:
//
//   import { Convert, WarDay } from "./file";
//
//   const warDay = Convert.toWarDay(json);

export interface WarDay {
    state: string;
    warEndTime: string;
    clan: Clan;
    participants: Participant[];
    clans: Clan[];
}

export interface Clan {
    tag: string;
    name: string;
    badgeId: number;
    clanScore: number;
    participants: number;
    battlesPlayed: number;
    wins: number;
    crowns: number;
}

export interface Participant {
    tag: string;
    name: string;
    cardsEarned: number;
    battlesPlayed: number;
    wins: number;
    collectionDayBattlesPlayed: number;
    numberOfBattles: number;
}

// Converts JSON strings to/from your types
export class ConvertWarDay {
    public static toWarDay(json: string): WarDay {
        return JSON.parse(json);
    }

    public static warDayToJson(value: WarDay): string {
        return JSON.stringify(value);
    }
}
