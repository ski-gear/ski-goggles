## Ski Goggles

A browser (Chrome for now) that helps inspect web analytics requests for Snowplow, Adobe Analytics, and more.

### Installation

1. Install it from [here](https://chrome.google.com/webstore/detail/ski-goggles/epjlgeofddfejkenffcddgcdnjkcanle)

### Usage

1. Open Devtools in the Chrome tab you want to inspect

2. Open the `Ski Goggles` panel within Devtools

3. Have fun inspecting the analytics calls.

### Dev Workflow

0. Install `yarn`

1. Run `yarn`

2. Build the extension (creates/updates the `dist` directory)

  ```
    yarn build
  ```

3. Go to `chrome://extensions` on Chrome.

4. Click on `Load unpacked Extensions`

5. Point it to the `dist` directory.
