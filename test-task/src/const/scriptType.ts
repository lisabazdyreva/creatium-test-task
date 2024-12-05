export enum ActionType {
  Input = 'input',

  NewRecords = 'newRecord',
  SearchRecords = 'searchRecords',
  UpdateRecord = 'updateRecord',
  DeleteRecord = 'deleteRecord',

  If = 'ifCondition',
  Else = 'elseCondition',
  Timer = 'timer',
  RunCode = 'runCode',

  NewUser = 'newUser',
  UpdateUserMail = 'updateUserMail',
  RestoreUserPassword = 'restoreUserPassword',

  Response = 'http',

  Try = 'try',
  Error = 'error',
}

export const ActionTypeTitle = {
  [ActionType.Input]: 'Запуск сценария',

  [ActionType.NewRecords]: 'Создать запись',
  [ActionType.SearchRecords]: 'Найти запись',
  [ActionType.UpdateRecord]: 'Обновить запись',
  [ActionType.DeleteRecord]: 'Удалить запись',

  [ActionType.If]: 'Если',
  [ActionType.Else]: 'Иначе',
  [ActionType.Timer]: 'Таймер',
  [ActionType.RunCode]: 'Выполнить код',

  [ActionType.NewUser]: 'Создать пользователя',
  [ActionType.UpdateUserMail]: 'Изменить почту',
  [ActionType.RestoreUserPassword]: 'Восстановить пароль',

  [ActionType.Response]: 'HTTP-запрос',
  [ActionType.Try]: 'Попробовать',
  [ActionType.Error]: 'В случае ошибки',
} as const;

// todo можно будет убрать, если иконки с сервера будут прилетать
export const ActionTypeIcon = {
  [ActionType.Input]: '/public/icons/sharpPlayIcon.svg',

  [ActionType.NewRecords]: '/public/icons/newRecordIcon.svg',
  [ActionType.SearchRecords]: '/public/icons/searchRecordIcon.svg',
  [ActionType.UpdateRecord]: '/public/icons/updateRecordIcon.svg',
  [ActionType.DeleteRecord]: '/public/icons/deleteRecordIcon.svg',

  [ActionType.If]: '/public/icons/conditionIcon.svg',
  [ActionType.Else]: '/public/icons/conditionIcon.svg',
  [ActionType.Timer]: '/public/icons/timerIcon.svg',
  [ActionType.RunCode]: '/public/icons/codeIcon.svg',

  [ActionType.NewUser]: '/public/icons/createUserIcon.svg',
  [ActionType.UpdateUserMail]: '/public/icons/updateUserEmailIcon.svg',
  [ActionType.RestoreUserPassword]: '/public/icons/restoreUserPasswordIcon.svg',

  [ActionType.Response]: '/public/icons/responseIcon.svg',
  [ActionType.Try]: '/public/icons/bugIcon.svg',
  [ActionType.Error]: '/public/icons/bugIcon.svg',
} as const;
