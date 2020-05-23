export const ENDPOINTS = {
    CLAN: {
        GET_SEARCH: 'https://proxy.royaleapi.dev/v1/clans',
        GET_INFO: 'https://proxy.royaleapi.dev/v1/clans/%23{clanTag}',
        GET_MEMBERS: 'https://proxy.royaleapi.dev/v1/clans/{clanTag}/members',
        GET_WAR_LOG: 'https://proxy.royaleapi.dev/v1/clans/%23{clanTag}/warlog',
        GET_CURRENT_WAR: 'https://proxy.royaleapi.dev/v1/clans/%23{clanTag}/currentwar'
    },
    PLAYER: {
        GET_INFO: 'https://proxy.royaleapi.dev/v1/players/%23{playerTag}',
        GET_INCOMING_CHESTS: 'https://proxy.royaleapi.dev/v1/players/%23{playerTag}/upcomingchests'
    },
    PROXY: {
        GET_PROXY_URL: 'https://www.comunidadvallegrande.cl/g5m4s/proxy.php?url={url}'
    },
    UPDATE: {
        URL: 'https://www.comunidadvallegrande.cl/g5m4s/checkupdate.php'
    }
};
