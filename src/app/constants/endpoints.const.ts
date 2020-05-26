export const ENDPOINTS = {
    CLAN: {
        SEARCH: 'https://proxy.royaleapi.dev/v1/clans',
        INFO: 'https://proxy.royaleapi.dev/v1/clans/%23{clanTag}',
        MEMBERS: 'https://proxy.royaleapi.dev/v1/clans/{clanTag}/members',
        WAR_LOG: 'https://proxy.royaleapi.dev/v1/clans/%23{clanTag}/warlog',
        CURRENT_WAR: 'https://proxy.royaleapi.dev/v1/clans/%23{clanTag}/currentwar'
    },
    PLAYER: {
        INFO: 'https://proxy.royaleapi.dev/v1/players/%23{playerTag}',
        INCOMING_CHESTS: 'https://proxy.royaleapi.dev/v1/players/%23{playerTag}/upcomingchests',
        BATTLE_LOG: 'https://proxy.royaleapi.dev/v1/players/%23{playerTag}/battlelog'
    },
    PROXY: {
        PROXY_URL: 'https://www.comunidadvallegrande.cl/g5m4s/proxy.php?url={url}'
    },
    UPDATE: {
        URL: 'https://www.comunidadvallegrande.cl/g5m4s/checkupdate.php'
    }
};
