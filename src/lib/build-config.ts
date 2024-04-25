export enum BuildMode {
  web = 'web', // default, "normal" build
  tauri = 'tauri'
}

const buildMode = import.meta.env.VITE_APP_BUILD_MODE || BuildMode.web
export const buildConfig = {
  tauri: buildMode === BuildMode.tauri,
}
