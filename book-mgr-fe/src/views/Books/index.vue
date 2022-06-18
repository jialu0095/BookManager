<template>
  <div>
    <a-card>
      <h2>Books List</h2>
      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search placeholder="Search by book name" enter-button />
        </div>
        <a-button>Add a new record</a-button>
      </space-between>

      <a-divider />

      <a-table :dataSource="dataSource" :columns="columns" />
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<script src="./index.js"></script>
