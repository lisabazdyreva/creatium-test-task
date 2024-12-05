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
  [ActionType.Input]: '/icons/sharpPlayIcon.svg',

  [ActionType.NewRecords]: '/icons/newRecordIcon.svg',
  [ActionType.SearchRecords]: '/icons/searchRecordIcon.svg',
  [ActionType.UpdateRecord]: '/icons/updateRecordIcon.svg',
  [ActionType.DeleteRecord]: '/icons/deleteRecordIcon.svg',

  [ActionType.If]: '/icons/conditionIcon.svg',
  [ActionType.Else]: '/icons/conditionIcon.svg',
  [ActionType.Timer]: '/icons/timerIcon.svg',
  [ActionType.RunCode]: '/icons/codeIcon.svg',

  [ActionType.NewUser]: '/icons/createUserIcon.svg',
  [ActionType.UpdateUserMail]: '/icons/updateUserEmailIcon.svg',
  [ActionType.RestoreUserPassword]: '/icons/restoreUserPasswordIcon.svg',

  [ActionType.Response]: '/icons/responseIcon.svg',
  [ActionType.Try]: '/icons/bugIcon.svg',
  [ActionType.Error]: '/icons/bugIcon.svg',
} as const;
