// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fetch_reqwest::{FetchOptions, FetchResponseResult};

#[tauri::command]
async fn fetch_reqwest(resource: String, init: Option<FetchOptions>) -> FetchResponseResult {
    fetch_reqwest::fetch(resource, init).await
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        fetch_reqwest,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
