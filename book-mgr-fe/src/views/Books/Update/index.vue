<template>
  <div>
    <a-modal
      title="Edit Book"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="Book Name">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="Price">
          <a-input-number
            v-model:value="editForm.price"
            id="inputNumber"
            :min="0"
          />
        </a-form-item>
        <a-form-item label="Author">
          <a-input v-model:value="editForm.author" />
        </a-form-item>
        <a-form-item label="Publish Date">
          <a-date-picker v-model:value="editForm.publishDate" />
        </a-form-item>
        <a-form-item label="Classify">
          <a-input v-model:value="editForm.classify" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<script src="./index.js"></script>
