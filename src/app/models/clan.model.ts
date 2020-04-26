// To parse this data:
//
//   import { Convert, ClanInfo } from "./file";
//
//   const clanInfo = Convert.toClanInfo(json);

export interface ClanInfo {
    tag: string;
    name: string;
    type: string;
    description: string;
    badgeId: number;
    clanScore: number;
    clanWarTrophies: number;
    location: Location;
    requiredTrophies: number;
    donationsPerWeek: number;
    clanChestStatus: string;
    clanChestLevel: number;
    clanChestMaxLevel: number;
    members: number;
    memberList: MemberList[];
}

export interface Location {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode: string;
}

export interface MemberList {
    tag: string;
    name: string;
    role: Role;
    lastSeen: string;
    expLevel: number;
    trophies: number;
    arena: Arena;
    clanRank: number;
    previousClanRank: number;
    donations: number;
    donationsReceived: number;
    clanChestPoints: number;
}

export interface Arena {
    id: number;
    name: Name;
}

export enum Name {
    Arena3 = 'Arena 3',
    ChallengerII = 'Challenger II',
    ChallengerIII = 'Challenger III',
    MasterI = 'Maestros I',
    MasterII = 'Maestros II',
    MasterIII = 'Maestros III',
}

export enum Role {
    CoLeader = 'Co-Lider',
    Elder = 'Sabio',
    Leader = 'Lider',
    Member = 'Miembro',
}

// Converts JSON strings to/from your types
export class Convert {
    public static toClanInfo(json: string): ClanInfo {
        return JSON.parse(json);
    }

    public static clanInfoToJson(value: ClanInfo): string {
        return JSON.stringify(value);
    }
}
