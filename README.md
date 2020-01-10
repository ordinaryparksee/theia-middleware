# theia-middleware
The example of how to build the Theia-based applications with the theia-middleware.

## Getting started

Add theia-middleware package in your `package.json`

``` javascript
{
  "private": true,
  "dependencies": {
    "typescript": "latest",
    "@theia/typescript": "latest",
    "@theia/navigator": "latest",
    "@theia/terminal": "latest",
    "@theia/outline-view": "latest",
    "@theia/preferences": "latest",
    "@theia/messages": "latest",
    "@theia/git": "latest",
    "@theia/file-search": "latest",
    "@theia/markers": "latest",
    "@theia/preview": "latest",
    "@theia/callhierarchy": "latest",
    "@theia/merge-conflicts": "latest",
    "@theia/search-in-workspace": "latest",
    "@theia/json": "latest",
    "@theia/textmate-grammars": "latest",
    "@theia/mini-browser": "latest",
    "theia-middleware": "^0.0.2" // << Add this line
  },
  "devDependencies": {
    "@theia/cli": "latest"
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