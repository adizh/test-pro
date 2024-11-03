<template>
  <div class="select">
    <div class="flex flex-col gap-3">
      <span class="basic-md-text">{{ values?.label }}</span>
      <div class="selected-block hover:cursor-pointer" @click="toggleOpen" >
        <p class="selected-text hover:cursor-pointer"  :class="{'after-select':isItemSelected}">{{ selectedItem }}</p>

        <img src="../../assets/images/arrow-down.svg" alt="arrow-down" />

      </div>

      <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
    </div>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="select-options flex flex-col gap-2 my-2">
        <div
          v-for="item in values.items"
          :key="item?.value"
          @click="selectItem(item)"
          class="p-1 group/item hover:bg-slate-100 hover:cursor-pointer"
        >
       {{ item?.name }}

      </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);

export type SelectItem = {
  name: string;
  value: string;
};
const props = defineProps({
  values: {
    type: Object as PropType<SelectProps | never>,
    required: true,
  },
  error: String,
});

const emit = defineEmits<{
  selectItem: [SelectItem, string];
}>();
export type SelectProps = {
  label: string;
  placeholder: string;
  items: SelectItem[];
  key: string;
  required?: boolean;
};
const isItemSelected=ref(false)

const selectedItem = ref(props?.values?.placeholder);

const selectItem = (item: SelectItem) => {
  selectedItem.value = item?.name;

  emit("selectItem", item, props.values.key);
  isOpen.value = false;
  isItemSelected.value=true
};

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped lang="scss">
.selected-text {
  background: #f9f9f9;
  border-radius: 8px;
  @extend %basic-md-text;
  padding: 14px 20px;
  color:#00000040;



}
.after-select{
  color:black
}
.select-options {
  background: #f9f9f9;
  padding: 10px 15px;
  border-radius: 8px;
  @extend %basic-md-text;
}

.selected-block {
  position: relative;

  .selected-text {
    width: 100%;
  }
  img {
    position: absolute;
    top: 22px;
    right: 24px;

  }
}
</style>
