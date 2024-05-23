<script setup>
import BaseButton from "@/components/BaseButton.vue";
import { useMemberStore } from "@/stores/member-store";
import { useBoardStore } from "@/stores/board-store";

const { loginedMember } = useMemberStore();
const { board, handleSubmitRegist } = useBoardStore();
//TODO: 상태의 board를 가져오지 말고 새로운 board 객체 생성 해야 함
</script>

<template>
  <main class="page">
    <div class="banner bg-assistant">
      <p class="inner">나의 여행 경험을 사용자들과 공유해 보세요.</p>
    </div>
    <form class="inner" @submit.prevent="async () => await handleSubmitRegist()" id="form">
      <div style="align-items: center">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="board.title" placeholder="최대 16자" />
      </div>
      <span style="text-align: end; width: 100%" class="bold"
        >✍작성자: {{ loginedMember.id }}</span
      >
      <div style="align-items: start">
        <label for="content">내용</label>
        <textarea
          id="content"
          rows="20"
          v-model="board.content"
          placeholder="최대 100자"
        ></textarea>
      </div>
      <BaseButton :style="'primary'" :width="20" text="저장" :type="'submit'" />
    </form>
  </main>
</template>

<style scoped>
.banner {
  width: 100%;
}

.banner p {
  padding: 3rem 0;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 2rem auto;
  margin-bottom: 0.5rem;
}

form div {
  display: flex;
  justify-content: space-between;
}

form label {
  font-size: 1.5rem;
}

input[type="text"],
textarea {
  width: 80%;
}

button {
  margin-top: 1rem;
  align-self: end;
}

.edit-and-delete {
  justify-content: end;
  gap: 0.5rem;
}

.edit-and-delete svg {
  height: 2rem;
}
</style>
