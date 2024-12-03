export enum ProcessStatus {
  Started = "started",
  Paused = "paused",
}

export const ProcessStatusLabel = {
  [ProcessStatus.Started]: "Запущен",
  [ProcessStatus.Paused]: "Остановлен"
} as const;
