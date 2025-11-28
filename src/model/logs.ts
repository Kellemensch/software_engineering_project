const logs: string[] = fetchLogsFromLocalStorage();

function fetchLogsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("logs") || "[]");
}

export function deleteAllLogs() {
    while (logs.length > 0) logs.pop();
    localStorage.removeItem("logs");
}

export function log(text: string) {
    console.log(text);
    logs.push(`${new Date().toISOString()}: ${text}`);
    localStorage.setItem("logs", JSON.stringify(logs));
}

export function getLogs() {
    return logs;
}
