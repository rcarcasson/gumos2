// To parse this data:
//
//   import { Convert, ChestInfo } from "./file";
//
//   const chestInfo = Convert.toChestInfo(json);

export interface ChestInfo {
    items: Item[];
}

export interface Item {
    index: number;
    name: string;
}

// Converts JSON strings to/from your types
export class ConvertChest {
    public static toChestInfo(json: string): ChestInfo {
        return JSON.parse(json);
    }

    public static chestInfoToJson(value: ChestInfo): string {
        return JSON.stringify(value);
    }
}
