<script setup>
import BaseButton from "@/components/BaseButton.vue";
import { ref } from "vue";
const username = ref("람라미");

const board = ref({
  id: 10,
  title: "대전 빵집 투어",
  writer: "하람",
  content:
    "일단 성심당은 유명한만큼 맛있었어요 저는 기대 이상으로 만족합니다!\n의외로 맛있었던 곳은 유성구 쪽에 “파이룸”!!!\n꼭 가보세요!!!🤤",
  regist_date: "2024-05-07",
});

const pageType = ref(window.location.pathname.split("/board/")[1]);
</script>

<template>
  <main class="page">
    <div class="banner bg-assistant">
      <p class="inner" v-if="pageType !== 'regist'">
        재밌게 보셨다면, 더 많은 사람들이 여행 경험을 공유할 수 있도록 새로운 글을 작성해 주세요.
      </p>
      <p class="inner" v-else>나의 여행 경험을 사용자들과 공유해 보세요.</p>
    </div>
    <form class="inner">
      <div style="align-items: center">
        <label for="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          v-if="pageType !== 'regist'"
          :value="board.title"
          disabled
        />
        <input v-else type="text" name="title" id="title" />
      </div>
      <span style="text-align: end; width: 100%" class="bold">✍작성자: {{ username }}</span>
      <div style="align-items: start">
        <label for="content">내용</label>
        <textarea
          name="content"
          id="content"
          rows="20"
          v-if="pageType !== 'regist'"
          :value="board.content"
          disabled
        ></textarea>
        <textarea name="content" id="content" rows="20" v-else></textarea>
      </div>
      <RouterLink to="/board" style="width: 20%; height: 100%;">
        <BaseButton :is-active="true" :width="100" v-if="pageType !== 'regist'" text="목록 보기" />
        <BaseButton :is-active="true" :width="100" v-else text="저장" />
      </RouterLink>
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
}

form div {
  display: flex;
  justify-content: space-between;
}

input:disabled,
textarea:disabled {
  color: #212121;
  background-color: #fff;
  border: none;
}

form label {
  font-size: 1.5rem;
}

input[type="text"],
textarea {
  width: 80%;
}

a {
  margin-top: 1rem;
  align-self: end;
}
</style>
