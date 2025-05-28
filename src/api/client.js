import axios from "axios";

export const client = axios.create({});

client.defaults.headers.common['Content-Type'] = "application/json";
client.defaults.headers.common['ngrok-skip-browser-warning'] = "true";
client.defaults.headers.common['Accept'] = "*/*";