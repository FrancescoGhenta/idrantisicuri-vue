<template>  
  <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      class="base-input__input"
    />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: String
  }
}
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: red;
}
.base-input__input {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px 12px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.base-input__input:focus {
  border: 1.5px solid #ff0000;
}
</style> 