import { Item } from "../types";
import {
    MugImg,
    ShirtImg,
    StickersImg,
    ToteImg,
} from "@/features/merch/assets";

export const merchanItems: Item[] = [
    { id: "tee-1", title: "Samarreta logo", price: 15, img: ShirtImg },
    { id: "sticker-1", title: "Pack d’stickers", price: 2, img: StickersImg },
    { id: "tote-1", title: "Bossa Tote", price: 12, img: ToteImg },
    { id: "mug-1", title: "Tassa", price: 10, img: MugImg },
];
