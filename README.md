# theia-middleware
The example of how to build the Theia-based applications with the theia-middleware.

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
    "theia-middleware": "^0.0.2" // << Add this line
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
