import { Collection, Document } from "mongodb";
import { Coll } from ".";

declare function getColl(coll:Coll):Promise<Collection<Document>>