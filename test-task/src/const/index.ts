export enum ItemPlace {
  Inside = 'inside',
  Bottom = 'bottom',
  Top = 'top',
}

export enum DataMethod {
  Remove = 'remove',
  Add = 'add',
}

export const databaseOptions = [
  {
    value: 'admins',
    label: 'Администраторы',
  },
  {
    value: 'users',
    label: 'Пользователи',
  },
  {
    value: 'statuses',
    label: 'Статусы',
  },
];
