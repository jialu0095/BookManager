<template>
  <div class="basic-layout">
    <div class="app-header">
      <div class="left">
        <img src="../../assets/titleIcon.svg" alt="titleIcon" />
        <div class="title">Book Manager System</div>
      </div>
      <div class="right">
        <div class="hello-msg">Hello</div>
        <div class="logout">Log out</div>
      </div>
    </div>
    <div class="app-header-placeholder"></div>
    <div class="app-content">
      <div class="left">
        <app-nav />
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
