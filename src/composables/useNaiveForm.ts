import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import type { MaybeRefOrGetter } from 'vue'
import { deepClone, deepMerge, onceRun } from 'mixte'

interface Options<T extends object> {
  value?: MaybeRefOrGetter<T>
  rules?: MaybeRefOrGetter<Partial<Record<keyof T, FormRules | FormItemRule | FormItemRule[]>>>
}
export function useNaiveForm<T extends Record<string, any>>(options?: Options<T>) {
  const { value = {}, rules } = options ?? {}

  const userFormValue = toValue<T>(value as T)
  const userFormRules = toValue(rules)

  const formRef = ref<FormInst>()
  const formValue = isReactive(userFormValue) ? userFormValue : reactive(userFormValue)
  const formProps = {
    model: formValue,
    rules: userFormRules,
  }
  const formInitialValues = deepClone(userFormValue) as T

  const validate = onceRun(() => formRef.value?.validate())
  function resetValidation() {
    formRef.value?.restoreValidation()
  }
  function clear() {
    Object.keys(formValue).forEach((key) => {
      formValue[key] = null
    })
  }
  function resetForm() {
    clear()
    nextTick(() => {
      Object.keys(formValue).forEach((key) => {
        delete formValue[key]
      })
      // 重置表单初始值
      deepMerge(formValue, formInitialValues)
    })
  }
  function reset() {
    resetValidation()
    resetForm()
  }

  return {
    formRef,
    formProps,
    formValue: toRef(formValue),
    rules: userFormRules,
    validate,
    resetValidation,
    resetForm,
    reset,
    clear,
  }
}
