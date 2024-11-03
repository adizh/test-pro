<template>
  <section>
    <img src="../assets/images/gradient-main.svg" alt="gradient" />
    <div class="header">
      <div class="header-info">
        <img src="../assets/images/user.svg" alt="user" />

        <div class="header-info-text">
          <p>{{ form.fullName?.value || "Alexa Rawles" }}</p>
          <p>{{ form.email.value || "alexarawles@gmail.com" }}</p>
        </div>
      </div>

      <div class="header-btn">
        <button class="blue-btn transition hover:opacity-80 hover:ease-in duration-300" @click="saveForm">Save</button>
      </div>
    </div>

    <form class="my-8 grid-container">
      <div
        v-for="field in formFieldsArray"
        :key="field?.placeholder"
        class="my-6"
      >
        <div
          class="form-field flex flex-col gap-3"
          v-if="field?.type !== 'select'"
        >
          <label :for="field.key">{{ field.label }}</label>
          <input
            :id="field.key"
            v-model="form[field.key as keyof typeof form].value"
            :type="field.type"
            :placeholder="field.placeholder"
            :required="field.required"
             class="form-input transition border-gray-300 focus:border-sky-500 hover:border-sky-500 ease-in duration-300"
            @input="validateField(field.key)"
          />
          <span v-if="field.error" class="text-red-500 text-sm">{{
            field.error
          }}</span>
        </div>

        <UISelect
          :error="form[field.key as keyof typeof form].error"
          v-else-if="field?.type === 'select'"
          :values="form[field.key as keyof typeof form].values as any"
          @selectItem="selectItem"
        />
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
interface SelectItem {
  name: string;
  value: string;
}

interface SelectProps {
  label: string;
  placeholder: string;
  items: SelectItem[];
  key: string;
  required?: boolean;
}

interface FormField {
  value: string;
  type: "text" | "email" | "select";
  required?: boolean;
  error: string;
  placeholder?: string;
  label?: string;
  values?: SelectProps;
}

type Form = Record<string, FormField>;

const form = ref<Form>({
  fullName: {
    value: "",
    type: "text",
    required: true,
    error: "",
    placeholder: "Your First Name",
    label: "Full Name",
  },

  gender: {
    value: "",
    type: "select",
    required: false,
    error: "",

    values: {
      key: "gender",
      label: "Gender",
      placeholder: "Your Gender",
      items: [
        { name: "Female", value: "female" },
        { name: "Male", value: "male" },
      ],
    },
  },

  language: {
    value: "",
    type: "select",
    label: "Language",
    error: "",
    required: true,
    values: {
      key: "language",
      label: "Language",
      placeholder: "Your Language",

      items: [
        { name: "KG", value: "kg" },
        { name: "RUS", value: "rus" },
        { name: "EN", value: "en" },
      ],
    },
  },
  email: {
    value: "",
    type: "email",
    required: true,
    error: "",
    label: "Email",
    placeholder: "Your Email",
  },
  country: {
    value: "",
    type: "select",

    error: "",
    required: false,
    values: {
      key: "country",
      label: "Country",
      placeholder: "Your Country",
      items: [
        { name: "Kyrgyzstan", value: "kg" },
        { name: "Russia", value: "rus" },
        { name: "Uzbekistan", value: "uz" },
      ],
    },
  },
  timeZone: {
    value: "",
    type: "select",
    required: false,
    error: "",

    values: {
      key: "timeZone",
      label: "Time Zone",
      placeholder: "Your Time Zone",
      items: [
        { name: "UTC-6", value: "utc-6" },
        { name: "UTC-8", value: "utc-8" },
      ],
    },
  },
});

const validateField = (fieldKey: string) => {
  const field = form.value[fieldKey];
  field.error = "";

  if (field.required && !field.value) {
    field.error = `${field.label} is required.`;
  } else {
    switch (field.type) {
      case "text":
        if (!field.value.trim()) {
          field.error = `${field.label} cannot be empty.`;
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
          field.error = `${field.label} must be a valid email address.`;
        }
        break;
      default:
        break;
    }
  }
};

const formFieldsArray = computed(() => {
  return Object.entries(form.value).map(([key, field]) => ({
    key,
    ...field,
  }));
});

const saveForm = () => {
  for (const key in form.value) {
    validateField(key);
  }

  const isValid = Object.values(form.value).every((field) => !field.error);
  if (isValid) {
    alert("Success");
  } else {
    return;
  }
};

const selectItem = (item: SelectItem, key: keyof typeof form.value) => {
  console.log(item, key);
  form.value[key].value = item.value;

  form.value[key].error = "";
};
</script>

<style scoped lang="scss">
.form-input {
  background: #f9f9f9;
  border-radius: 8px;
  @extend %basic-md-text;
  padding: 14px 20px;

  &::placeholder{
    color:#00000040
  }
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

section {
  width: 100%;
  padding: 40px;
}

.blue-btn {
  background: #4182f9;
  color: white;
  padding: 10px 21px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;

 
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  &-info {
    display: flex;
    gap: 32px;
    align-items: center;
  }
}

.header-info-text p:first-child {
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
}

.header-info-text p:last-child {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #00000040;
}

@media (max-width: 600px) {
  .header {
    flex-direction: column;
    align-items: start;
    gap: 20px;
  }

  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, auto);
  }
}
</style>
