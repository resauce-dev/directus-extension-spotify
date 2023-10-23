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

I can foresee two positions where this extension solves a problem.

When someone spends the majority of their day on a dashboard, in multiple panels, potentially responding to messages or graphing data, habing media controls to hand can be really helpful!

Additionally, if you have a dashboard on a full-screen display. You can now spruce up it's functionality and play media through it. The UI can even be simplified by hiding controls and choosing to control the media from another authenticated device with ease, essentially casting the media to the dashboard.

Effortlessly manage audio from an external device by casting the media onto the dashboard.
Either manage the media within the dashboard if it's interactive, or you can seamlessly declutter the dashboard by concealing the interactive controls becoming a live display only.

## Improvements & Enhancements

**Release Critical**
- Login support using a [Spotify development app.](https://developer.spotify.com/dashboard/create)


**Enhancements**
- Technical Debt: Allow more than one panel to load / Add custom listener event to resolve components when spotify is ready.
- Bug: Reactive state is causing glitch upon changing things do up then updating refs.
- UI: Add tailwind for easier styling
- UI: Indetification of authentication failures after rendered has happened
- UI: Indetification of autoplay limitations (use activateElement function to fix)
- UI: Improve styling of Volume & Seek sliders
- UI: Make it flexible to work with any panel-size.
- UI/Functionality: Make audio seek move along with the music
- Functionality: Changing insights props that affect the player should reload the component.

- **Long Term**
- Improvement: Stronger typescript support
- Improvement: Links to Spotify song & authors
- Enhancement: Assess ability to stop the player from disconnecting when reloading page.
- UI Enhancement: Tinder-like swiper for next/prev songs

**Current Features:**

- Interactive Panel or Display-Only Options
- Visual: Now Playing (Album Art/Artist/Song Name)
- Visual: Last Played, and Up Next (Album Art/Artist/Song Name)
- Visual: Status of 'Shuffle' and 'Repeat'
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
