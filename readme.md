# Directus Spotify

> This extension is to be considered conceputal and alpha for the time being.
> — Developed by @shealavington.

Do you have a dashboard displayed on a monitor? Elevate its ambiance by integrating music. You can now view, play, and manage your Spotify tunes right from your Directus dashboard.

## Screenshot / Video

TODO

## Details

- **Built With**: Directus, Typescript, VueJS, SpotifySDK
- **Extension Type**: Panel

**What problem does this project solve?**

TODO

## Future Improvements & Enhancements
- Add link to actual Spotify song
- Upon changing props that affect the player, reload the component
- move all error functions to one functions they all use to reject.
- Add tailwind
- Add a debounce for setting volume and seek to avoid spam (cursor release only?)
- Add stronger typescript support
- Flexible UI so that it works regardless of screen-size
- Add solution for iOS limitations autoplay? - use activate element to fix ios?
- Assess ability to stop it disconnecting when reloading page.
- Visual: Up Next (Album Art/Artist/Song Name)
- Assess if we could persist the panel somehow across the whole application?
- Can I limit panel so only one panel type can be created?

- **Other**
- Allow login using a [Spotify development app.](https://developer.spotify.com/dashboard/create)
- Can I reuse a swiper component from one of my other sites to allow UI friendly forward and backward Navigation?
- make an example display for screenshot
  - (Avg Per Hour, Business Rating, Busy Indicator, WiFi Password, Spotify Tunes, Social Media, Latest Social Feed?)

**Current Features:**

- Interactive Panel or Display-Only Options
- Visual: Now Playing (Album Art/Artist/Song Name)
- Controls: Play/Pause, Next, and Previous
- Controls: Volume
- Controls: Audio Seek
- Special Abilities: Cross-Device Interaction (Control casted media using a Phone).

## Set Up Instructions

> The current configuration saves an API Key against the panel. This is only for the experimental version of this extension. With more time, I hope to implement oAuth properly. — This does unfortunately mean the API key is only valid for 1 hour at a time, (when a new key will need generating and updating).

**Prerequisites**

- Login to a Spotify premium account
- Get a Spotify API Key from [here](https://developer.spotify.com/documentation/web-playback-sdk/tutorials/getting-started)
- Click the green "Get your access token" button
- Copy the value provided (This token will last for one hour)

**Directus Installation**

- Add the extension to Directus
- Add some Cross-Origin security content policy changes to Directus (images, scripts, and iFrames).
  - `sdk.scdn.co` Allows the player to function correctly
  - `i.scdn.co` Allows the images to be displayed correctly.

```yml
CONTENT_SECURITY_POLICY_DIRECTIVES__SCRIPT_SRC: "'self' data: 'unsafe-eval' https://sdk.scdn.co"
CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC: "'self' data: 'unsafe-eval' https://sdk.scdn.co"
CONTENT_SECURITY_POLICY_DIRECTIVES__IMG_SRC: "'self' data: blob: 'unsafe-eval' https://i.scdn.co"
```

**Directus Panel Configuration**

- Create a Dashboard
- Add the panel labelled as "Spotify"
- Configure Panel Settings
  - Insert the API Key configured above.
  - Set a default volume from 0-100
  - Decide if you want to see the media controls or not
  - You may change the name from Directus if you wish (this displays in Spotify)

**Using The Panel**

- Open Spotify somewhere else (Phone/Tablet)
- Select the *Cast to Device* button.
- Select the "Directus" option (Or whatever your label is).
- You should now be able to view and control your Spotify media as it plays through Directus.
