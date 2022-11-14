<template>
  <div>
    <a-card>
      <h2>Books List</h2>
      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
            placeholder="Search by book name"
            enter-button
            v-model:value="keyword"
            @search="onSearch"
          />
          <a v-if="isSearch" href="javascript:;" @click="backAll">Return</a>
        </div>
        <a-button @click="show = true">Add a new record</a-button>
      </space-between>

      <a-divider />

      <a-table :dataSource="list" :columns="columns" :pagination="false">
        <template v-slot:bodyCell="{ column, record }">
          <!-- Show format date -->
          <template v-if="column.dataIndex === 'publishDate'">
            {{ formatTsp(record.publishDate) }}
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a href="javascript:;" @click="update(record)">Edit&nbsp;</a>
            <a href="javascript:;" @click="remove(record)">Delete</a>
          </template>
          <template v-if="column.dataIndex === 'count'">
            <div class="count">
              <div class="edit-1">
                <a
                  href="javascript:;"
                  @click="minusOneBook(record)"
                  style="font-size: x-large; font-weight: bold"
                  >-</a
                >
                {{ record.count }}
                <a
                  href="javascript:;"
                  @click="addOneBook(record)"
                  style="font-size: 18px; font-weight: bold"
                  >+</a
                >
              </div>
              <div class="batch-edit">
                <a href="javascript:;" @click="showModal()"> Batch Edit</a>
                <a-modal
                  v-model:visible="visible"
                  title="Basic Modal"
                  @ok="handleOk(record)"
                >
                  <div style="margin-bottom: 10px">
                    <a-space>
                      <a-select
                        ref="select"
                        v-model:value="editType"
                        style="width: 120px"
                        :options="options1"
                        @focus="focus"
                        @change="handleChange"
                      ></a-select>
                    </a-space>
                  </div>
                  <div>
                    <a-input-number
                      v-model:value="editCount"
                      :min="0"
                      :max="999"
                    />
                  </div>
                </a-modal>
              </div>
            </div>
          </template>
        </template>
      </a-table>
      <space-between style="margin-top: 24px">
        <div />
        <a-pagination
          v-model:current="currentPage"
          :total="total"
          :page-size="10"
          @change="setPage"
        />
      </space-between>
    </a-card>

    <add-one v-model:show="show" />
    <update v-model:show="showEdit" :book="curEditBook" />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>

<script src="./index.js"></script>
