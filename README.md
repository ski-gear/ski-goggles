## Ski Goggles

### Installation

1. Use the `releases` [tab](https://git.realestate.com.au/rta/ski-goggles/releases) above to find the desired version of `chrome.crx` and download it.

2. Go to `chrome://extensions` on Chrome.

3. Drag the `chrome.crx` file into the UI.

### Usage

1. Open Devtools in the Chrome tab you want to inspect

2. Open the `Ski Goggles` panel within Devtools

3. Have fun inspecting the analytics calls.

### Packaging the Extension

0. (Packaging only works on MacOs)

1. Package and note the location of the extension file `chrome.crx`.

  ```
    ./auto/package.sh
  ```

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
