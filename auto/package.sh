#!/bin/bash
set -euf -o pipefail

if [ "$(uname)" != "Darwin" ]; then
  echo "This script is supported only on MacOs."
  echo "Cannot package Chrome extension."
  exit
fi

APP_DIR="$(dirname "$0")/../"
cd "${APP_DIR}"
ROOT_DIR=$(pwd)

KEY_FILE="${ROOT_DIR}/key/chrome.pem"
EXTENSION_DIR="${ROOT_DIR}/dist/chrome"
CHROME="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

function package {
  shush decrypt < "${ROOT_DIR}/key/chrome.pem.encrypted" > "${KEY_FILE}"
  CMD="${CHROME} --disable-gpu --pack-extension=${EXTENSION_DIR} --pack-extension-key=${KEY_FILE}"
  if (eval "${CMD}"); then
    echo "Chrome Extension created at ${ROOT_DIR}/dist/chrome.crx"
  else
    echo "Something went wrong. Try packaging it using the Chrome UI"
  fi
}

function build {
  yarn build 
}

function cleanup {
  rm -f "${KEY_FILE}"
}

# Do stuff
build
package
trap cleanup EXIT
