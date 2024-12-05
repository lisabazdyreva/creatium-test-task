import {
  ActionType,
  ActionTypeIcon,
  ActionTypeTitle,
} from '@/const/scriptType.ts';
import type { IScriptTreeItem } from '@/types/script.ts';

export const getNewAction = (type: ActionType): IScriptTreeItem => {
  return {
    id: Math.random().toString(),
    title: ActionTypeTitle[type],
    action: type,
    showAction: !(type === ActionType.If || type === ActionType.Else),
    icon: {
      src: ActionTypeIcon[type],
    },
  };
};
