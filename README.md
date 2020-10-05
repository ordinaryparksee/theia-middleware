# theia-middleware
Authentication for theia browser app

## Getting started

Add theia-middleware package in your `package.json`

``` javascript
{
  "private": true,
  "dependencies": {
    "@theia/core": "next",
    "@theia/filesystem": "next",
    "@theia/workspace": "next",
    "@theia/preferences": "next",
    "@theia/navigator": "next",
    "@theia/process": "next",
    "@theia/terminal": "next",
    "@theia/editor": "next",
    "@theia/languages": "next",
    "@theia/markers": "next",
    "@theia/monaco": "next",
    "@theia/textmate-grammars": "next",
    "@theia/typescript": "next",
    "@theia/messages": "next",
    "theia-middleware": "^0.1.4" // << Add this line
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
 - AUTH_TYPE (default: BASIC) : can be one of `BASIC` or `OTP`
 - AUTH_USER (default: admin, scope: `BASIC`)
 - AUTH_PASS (default: admin, scope: `BASIC`)
 - AUTH_REALM (default: authenticate, scope: `BASIC`)
 - AUTH_FALLBACK_MSG (default: Authentication required., scope: `BASIC`)
 - AUTH_LOGOUT_USER (default: LOGOUT, scope: `BASIC`)
 - AUTH_OTP_NAME (default: Theia, scope: `OTP`)
 - AUTH_OTP_SECRET (scope: `OTP`)

 `AUTH_LOGOUT_USER` is using at HTTP Basic auth logout.
it just redirect to `http[s]://[AUTH_LOGOUT_USER]@[host]` for logout.
BTW if the `AUTH_LOGOUT_USER` is same with `AUTH_USER` logout doesn't work
So in this case you have to change `AUTH_LOGOUT_USER` from `.env` file

## Using OTP Authentication
 1. Set `AUTH_TYPE` to `OTP` in your `.env` file
 2. Visit to theia IDE, then OTP setup page will show
 3. Save secret key in your `.env` file
 4. Capture QRCode on your device
 5. Visit to theia IDE rootpath(ex: http://your-ip-address-or-host/), now enabled input the OTP token
