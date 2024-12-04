export interface IScriptTreeItem {
  id: string;
  pid?: string;
  title: string;
  action?: string;
  value?: string;
  icon: {
    component: string;
    type?: string; // todo lisa add enum
  };
}

export interface IScriptTreeItemNested extends IScriptTreeItem {
  children: Array<IScriptTreeItem>;
}

export interface IAddScriptItem {
  id: string;
  title: string;
  icon: {
    component: string;
    type?: string; // todo lisa add enum
  };
}

export interface IScriptDirectoryItem {
  id: string;
  title: string;
  status: string;
  children?: Array<IScriptDirectoryItem>;
}
