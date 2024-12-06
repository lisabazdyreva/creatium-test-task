<script setup lang="ts">
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
} from 'element-plus';
import { computed, ref } from 'vue';
import { ActionType } from '@/const/scriptType.ts';
import { databaseOptions } from '@/const';

const props = defineProps<{
  type: ActionType | null;
}>();

const emit = defineEmits<{
  (e: 'update-data', value: string): void;
  (e: 'close'): void;
}>();

enum FormType {
  Database = 'database',
  Timer = 'timer',
  Condition = 'condition',
  RunCode = 'runcode',
}

const tableValue = ref(databaseOptions[0].value);
const timerValue = ref<number>(1);
const conditionValue = ref<string>('');
const codeValue = ref<string>('');

const formType = computed(() => {
  switch (props.type) {
    case ActionType.NewRecords:
    case ActionType.SearchRecords:
    case ActionType.UpdateRecord:
    case ActionType.DeleteRecord:
    case ActionType.NewUser:
    case ActionType.UpdateUserMail:
    case ActionType.RestoreUserPassword: {
      return FormType.Database;
    }
    case ActionType.Timer: {
      return FormType.Timer;
    }
    case ActionType.If:
    case ActionType.Else: {
      return FormType.Condition;
    }
    case ActionType.RunCode: {
      return FormType.RunCode;
    }
    default: {
      return null;
    }
  }
});

const handleFormSubmit = () => {
  switch (props.type) {
    case ActionType.NewRecords:
    case ActionType.SearchRecords:
    case ActionType.UpdateRecord:
    case ActionType.DeleteRecord:
    case ActionType.NewUser:
    case ActionType.UpdateUserMail:
    case ActionType.RestoreUserPassword: {
      emit('update-data', tableValue.value);
      return;
    }
    case ActionType.Timer: {
      emit('update-data', String(timerValue.value));
      return;
    }
    case ActionType.If:
    case ActionType.Else: {
      emit('update-data', conditionValue.value);
      return;
    }
    case ActionType.RunCode: {
      emit('update-data', codeValue.value);
      return;
    }
    default: {
      emit('close');
      return;
    }
  }
};
</script>

<template>
  <div class="add-action-form">
    <ElForm>
      <ElFormItem
        v-if="formType === FormType.Database"
        label="Выберите таблицу"
        class="add-action-form__item-wrapper"
      >
        <ElSelect v-model="tableValue" placeholder="Select" size="large">
          <ElOption
            v-for="item in databaseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        v-if="formType === FormType.Timer"
        label="Установите длительность таймера"
      >
        <ElInputNumber
          v-model="timerValue"
          :min="1"
          :max="1000"
          label="Установите длительность таймера"
        />
      </ElFormItem>
      <ElFormItem
        v-if="formType === FormType.Condition"
        label="Напишите условие"
        class="add-action-form__item-wrapper"
      >
        <ElInput v-model="conditionValue" label="Напишите условие" />
      </ElFormItem>

      <ElFormItem
        v-if="formType === FormType.RunCode"
        label="Напишите код"
        class="add-action-form__item-wrapper"
      >
        <ElInput
          type="textarea"
          v-model="codeValue"
          label="Напишите код"
          :autosize="{ minRows: 4 }"
        />
      </ElFormItem>

      <div class="add-action-form__buttons">
        <ElButton
          @click="$emit('close')"
          plain
          style="
            --el-button-bg-color: #ffffff;
            --el-button-border-color: #dcdfe6;
            --el-button-text-color: #606266;

            --el-button-hover-border-color: #8b63ef;
            --el-button-hover-text-color: #8b63ef;
            --el-button-hover-bg-color: #ffffff;
          "
        >
          Отмена
        </ElButton>
        <ElButton
          style="
            --el-button-border-color: #8b63ef;
            --el-button-bg-color: #8b63ef;
            --el-button-text-color: #ffffff;

            --el-button-hover-border-color: #6545b2;
            --el-button-hover-bg-color: #6545b2;
            --el-button-hover-text-color: #ffffff;
          "
          @click="handleFormSubmit"
        >
          Добавить
        </ElButton>
      </div>
    </ElForm>
  </div>
</template>

<style>
.add-action-form .el-textarea__inner {
  resize: none;
}
.add-action-form__item-wrapper {
  flex-direction: column;
}
.add-action-form .el-form-item__label {
  justify-content: flex-start;
}

.add-action-form__buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
