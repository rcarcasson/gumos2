export const ENDPOINTS = {
    CLAN: {
        GET_SEARCH_CLANS: 'https://proxy.royaleapi.dev/v1/clans',
        GET_CLAN_INFO: 'https://proxy.royaleapi.dev/v1/clans/%23{clanTag}',
        GET_CLAN_MEMBERS: 'https://proxy.royaleapi.dev/v1/clans/{clanTag}/members',
        GET_CLAN_WAR_LOG: 'https://proxy.royaleapi.dev/v1/clans/{clanTag}/warlog',
        GET_CLAN_CURRENT_WAR: 'https://proxy.royaleapi.dev/v1/clans/{clanTag}/currentwar'
    },
    PLAYER: {
        GET_PLAYER_INFO: 'https://proxy.royaleapi.dev/v1/players/%23{playerTag}',
        GET_INCOMING_CHESTS: 'https://proxy.royaleapi.dev/v1/players/%23{playerTag}/upcomingchests'
    },
    PROXY: {
        GET_PROXY_URL: 'http://localhost/proxycr/proxy.php?url={url}'
    }
};
