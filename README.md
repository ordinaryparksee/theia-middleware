# theia-middleware
Authentication for theia browser app

## Getting started

Add theia-middleware package in your `package.json`

``` javascript
{
  "private": true,
  "dependencies": {
    "typescript": "next",
    "@theia/typescript": "next",
    "@theia/navigator": "next",
    "@theia/terminal": "next",
    "@theia/outline-view": "next",
    "@theia/preferences": "next",
    "@theia/messages": "next",
    "@theia/git": "next",
    "@theia/file-search": "next",
    "@theia/markers": "next",
    "@theia/preview": "next",
    "@theia/callhierarchy": "next",
    "@theia/merge-conflicts": "next",
    "@theia/search-in-workspace": "next",
    "@theia/json": "next",
    "@theia/textmate-grammars": "next",
    "@theia/mini-browser": "next",
    "theia-middleware": "^0.1.3" // << Add this line
  },
  "devDependencies": {
    "@theia/cli": "next"
  }
}
```

And now apply added package and rebuild the theia

    yarn && yarn theia build

Create `.env` file in your theia root directory (Same location with package.json)

Finally, edit the `.env` file for settings. if without `.env` file, default user and password is `admin` and `admin`

    echo 'AUTH_USER=yourname' >> .env
    echo 'AUTH_PASS=yourpassword' >> .env
    
Restart theia

## Supported `.env` variables

 - AUTH_USER (default: admin)
 - AUTH_PASS (default: admin)
 - AUTH_REALM (default: authenticate)
 - AUTH_FALLBACK_MSG (default: Authentication required.)
 - AUTH_LOGOUT_USER (default: LOGOUT)

 `AUTH_LOGOUT_USER` is using at logout.
it just redirect to `http[s]://[AUTH_LOGOUT_USER]@[domain]` for logout.
BTW if you use user name  same with `AUTH_LOGOUT_USER` logout doesn't work
So in this case you have to change `AUTH_LOGOUT_USER` from `.env` file
