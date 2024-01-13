import { Document } from "mongoose";

export interface ICategory extends Document{
  readonly category: string;
}