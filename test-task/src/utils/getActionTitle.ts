import { ActionType } from '@/const/scriptType.ts';
import { databaseOptions } from '@/const';

export const getActionTitle = (action: ActionType, value: string) => {
  switch (action) {
    case ActionType.NewRecords:
    case ActionType.SearchRecords:
    case ActionType.UpdateRecord:
    case ActionType.DeleteRecord:
    case ActionType.NewUser:
    case ActionType.UpdateUserMail:
    case ActionType.RestoreUserPassword: {
      const option = databaseOptions.find((item) => item.value === value);
      return `В таблице ${option ? option.label : value}`;
    }
    case ActionType.Timer: {
      return `${value} секунд`;
    }
    default: {
      return value;
    }
  }
};
