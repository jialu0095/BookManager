<template>
  <div>
    <a-modal
      title="Add Book"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="Book Name">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="Price">
          <a-input-number
            v-model:value="addForm.price"
            id="inputNumber"
            :min="0"
          />
        </a-form-item>
        <a-form-item label="Author">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <a-form-item label="Publish Date">
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
        <a-form-item label="Classify">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
        <a-form-item label="Count">
          <a-input-number
            v-model:value="addForm.count"
            id="inputNumber"
            :min="0"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<script src="./index.js"></script>
