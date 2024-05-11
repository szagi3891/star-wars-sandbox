import { AutoWeakMap } from '../../utils/AutoWeakMap';
import { Resource } from '../../utils/Resource';
import { Api } from '../Api';
import { z } from 'zod';

const GithubUserReposZod = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
    })
);

type GithubUserReposType = z.TypeOf<typeof GithubUserReposZod>;

const getDetails = async (_api: Api, username: string): Promise<GithubUserReposType> => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const json = await response.json();

    const data = GithubUserReposZod.parse(json);
    return data;
};

export class GithubUserRepos {
    public data: Resource<GithubUserReposType> = new Resource(() => getDetails(this.api, this.username));

    public static get = AutoWeakMap.create((api: Api, username: string) => new GithubUserRepos(api, username));

    constructor(private readonly api: Api, public readonly username: string) {}
}
