


//https://api.github.com/users/szagi3891

import { AutoWeakMap } from "../../utils/AutoWeakMap";
import { Resource } from "../../utils/Resource";
import { Api } from "../Api";
import { z } from 'zod';

const GithubUserZod = z.object({
    id: z.number(),
    name: z.string(),
});

type GithubUserType = z.TypeOf<typeof GithubUserZod>;

// interface GithubUserType {
//     id: number,
//     name: string,
// }

const getDetails = async (_api: Api, username: string): Promise<GithubUserType> => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const json = await response.json();

    const data = GithubUserZod.parse(json);
    return data;
};

export class GithubUser {

    public data: Resource<GithubUserType> = new Resource(() => getDetails(this.api, this.username));

    public static get = AutoWeakMap.create((api: Api, username: string) => new GithubUser(api, username));

    constructor(
        private readonly api: Api,
        public readonly username: string
    ) {}

}