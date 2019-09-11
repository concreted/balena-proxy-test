# balena-proxy-test

Runs headless chrome and takes a screenshot. Defaults to `https://webglsamples.org/aquarium/aquarium.html`. Uses caching proxy by default.

`tests` container usable env vars:
- `TEST_URL`: Change the url used in chrome.
- `DISABLE_PROXY=true`: Turn off the proxy (defaults to `false`).

Turn on balena url to see results:
- Nginx logs:
    - access.log
    - error.log
    - cache.log (cache log for normal requests)
    - range_cache.log (cache log for range requests e.g. videos)
- result.png (screenshot of last `tests` container test run)

Running locally:
```
docker-compose up --build
```

## Test Results
All with default settings

Intel Compute Stick, balenaOS 2.41.2, intel-nuc base image
    - `result.png` is blanked out, not correct result
    - `error.log` shows several of these similar errors:
```
2019/09/11 22:45:06 [error] 18#0: *34 upstream timed out (110: Connection timed out) while reading upstream, client: 127.0.0.1, server: , request: "GET /jquery-ui-1.8.2.custom/js/jquery-1.4.2.min.js HTTP/1.0", upstream: "http://127.0.0.1:4443/jquery-ui-1.8.2.custom/js/jquery-1.4.2.min.js", host: "webglsamples.org", referrer: "https://webglsamples.org/aquarium/aquarium.html"
```

Intel Compute Stick, balenaOS 2.31.1, intel-nuc base image
    - `result.png` shows correct result
    - `error.log` shows several of these similar errors. These errors are expected result of the HTTPS proxy no longer receiving requests through the CONNECT protocol tunnel and being closed.
```
2019/09/11 23:04:43 [error] 20#0: *16 upstream timed out (110: Connection timed out) while connecting to upstream(proxy_connect), client: 172.18.0.4, server: , request: "CONNECT webglsamples.org:443 HTTP/1.1", host: "webglsamples.org:443"
```
