import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IScriptData, IScriptTreeItem } from '@/types/script.ts';

import ScriptItemsMock from '@/mocks/scripts.json';
import { getSlicedArray } from '@/utils/getSlicedArray.ts';
import { DataMethod } from '@/const';

export const useScriptsStore = defineStore('scripts', () => {
  const scripts = ref<null | IScriptData[]>(null);
  const editScript = ref<null | IScriptData>(null);

  const initScripts = () => {
    scripts.value = ScriptItemsMock as IScriptData[];
    editScript.value = scripts.value[0];
  };

  const setEditScript = (id: string) => {
    if (!scripts.value?.length) {
      return;
    }
    const script = scripts.value.find((script) => script.id === id);
    if (!script) {
      editScript.value = null;
      return;
    }
    editScript.value = script;
  };

  const _getUpdatedChildrenIds = (
    arr: IScriptTreeItem[],
    id: string,
    pid: string,
  ) => {
    return arr.map((item) => {
      if (id !== item?.pid) {
        return item;
      }
      return {
        ...item,
        pid,
      };
    });
  };

  const updateScripts = (arr: IScriptTreeItem[]) => {
    if (!scripts.value?.length || !editScript.value) {
      return;
    }
    const indexOfEditScript = scripts.value.findIndex(
      (item) => editScript.value?.id === item.id,
    );
    if (indexOfEditScript === -1) {
      return;
    }
    editScript.value = { ...editScript.value, scriptsData: arr };
    scripts.value = [
      ...scripts.value.slice(0, indexOfEditScript),
      editScript.value,
      ...scripts.value.slice(indexOfEditScript + 1),
    ];
  };

  const updateScriptActions = (data: {
    idToUpdate: string;
    indexToRemove: number;
    indexToPaste: number;
    itemToPaste: IScriptTreeItem;
  }) => {
    const { idToUpdate, itemToPaste, indexToRemove, indexToPaste } = data;

    if (!editScript.value?.scriptsData?.length) {
      return;
    }

    const updatedChildrenActions = _getUpdatedChildrenIds(
      editScript.value.scriptsData,
      idToUpdate,
      itemToPaste.id,
    );

    const clearedActions = getSlicedArray<IScriptTreeItem>(
      updatedChildrenActions,
      DataMethod.Remove,
      indexToRemove,
    );

    const updatedActions = getSlicedArray<IScriptTreeItem>(
      clearedActions,
      DataMethod.Add,
      indexToPaste,
      itemToPaste,
    );

    updateScripts(updatedActions);
  };

  const addScriptAction = (data: { item: IScriptTreeItem; index: number }) => {
    if (!editScript.value) {
      return;
    }
    const updatedActions = getSlicedArray<IScriptTreeItem>(
      editScript.value.scriptsData,
      DataMethod.Add,
      data.index,
      data.item,
    );
    updateScripts(updatedActions);
  };

  return {
    editScript,
    setEditScript,
    initScripts,
    updateScriptActions,
    addScriptAction,
  };
});
