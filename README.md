# Embedded Jellyfin page

This static site embeds Jellyfin in a full-page `iframe`, so the browser stays on the `github.io` address rather than redirecting to the server.

## Required deployment setup

GitHub Pages is served over HTTPS. Browsers block an HTTPS page from embedding the currently configured HTTP endpoint (`http://99.53.73.35:8096`) as mixed content, and a static GitHub Pages site cannot act as a reverse proxy.

1. Give Jellyfin an HTTPS endpoint using a reverse proxy (Caddy, nginx, or a secure tunnel) and a hostname with a valid TLS certificate.
2. Configure the proxy/Jellyfin response headers to permit framing by this site's exact GitHub Pages origin. Do not allow arbitrary origins.
3. Change `serverUrl` in `config.js` to the new `https://` URL.

The public Jellyfin port should be protected with a firewall where possible. Do not put tunnel credentials, passwords, or API keys in this repository: every file deployed through GitHub Pages is public.
