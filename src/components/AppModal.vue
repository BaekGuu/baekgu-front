<script setup>
import ModalLogin from "./modal/ModalLogin.vue";
import ModalProfileEdit from "./modal/ModalProfileEdit.vue";
import ModalProfileView from "./modal/ModalProfileView.vue";
import ModalSignup from "./modal/ModalSignup.vue";
defineProps({
  modalType: String,
});
</script>

<template>
  <div class="background bg-black">
    <div id="modal" class="modal bg-white">
      <div class="modal-title bg-point white">
        <span>{{ modalType }}</span>
        <span class="close-icon material-symbols-outlined" @click="$emit('closeModal')">
          close
        </span>
      </div>
      <div class="bg-white" style="border-radius: 15px">
        <ModalLogin v-if="modalType === '로그인'" />
        <ModalSignup v-if="modalType === '회원가입'" />
        <ModalProfileView v-if="modalType === '내 정보 보기'" />
        <ModalProfileEdit v-if="modalType === '회원 정보 수정'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
}

.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 25;
  border-radius: 15px;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 15px 15px 0 0;
}

.modal-title span {
  margin: 1rem;
  font-size: 1.2rem;
}

.close-icon {
  cursor: pointer;
}
</style>
