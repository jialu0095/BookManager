<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src="../../assets/titleIcon.svg" alt="img" />
      <h2 class="title">Book Manager System</h2>
    </div>

    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="Log in">
          <div class="item">
            <a-input
              v-model:value="loginForm.account"
              size="large"
              placeholder="Account"
            >
              <template #prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input
              v-model:value="loginForm.password"
              size="large"
              placeholder="Password"
            >
              <template #prefix>
                <key-outlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a href="">Forget Password</a>
          </div>

          <div class="item">
            <a-button @click="login" type="primary" size="large"
              >Log in</a-button
            >
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Register">
          <div class="item">
            <a-input
              v-model:value="regForm.account"
              size="large"
              placeholder="Account"
            >
              <template #prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input
              v-model:value="regForm.password"
              size="large"
              placeholder="Password"
            >
              <template #prefix>
                <key-outlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input size="large" placeholder="Invite Code">
              <template #prefix>
                <profile-outlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-button @click="register" type="primary" size="large"
              >Register</a-button
            >
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
