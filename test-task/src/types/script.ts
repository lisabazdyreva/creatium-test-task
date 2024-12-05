import { ActionType } from '@/const/scriptType.ts';
import { ProcessStatus } from '@/const/process.ts';

export interface IScriptData {
  id: string;
  scriptsData: IScriptTreeItem[];
}

export interface IScriptTreeItem {
  id: string;
  pid?: string;
  title: string;
  action: ActionType;
  showAction: boolean;
  value?: string;
  icon: {
    src: string;
  };
}

export interface IScriptTreeItemNested extends IScriptTreeItem {
  children: Array<IScriptTreeItemNested>;
}

export interface IAddScriptItem {
  id: string;
  title: string;
  action: ActionType;
  icon: {
    src: string;
  };
}

export interface IScriptDirectoryItem {
  id: string;
  title: string;
  type: 'script' | 'bot' | 'api'; //todo lisa add const
  status: ProcessStatus;
  children?: Array<IScriptDirectoryItem>;
}
