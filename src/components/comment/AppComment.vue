<script setup>
import { useMemberStore } from "@/stores/member-store";

defineProps({ comments: Array });

const { loginedMember } = useMemberStore();
console.log(loginedMember);
</script>

<template>
  <div v-for="comment in comments" :key="comment.commentId" class="comment">
    <div style="display: flex; gap: 1rem;">
      <div class="profile">
        <img v-if="comment.memberId === loginedMember.id" src="../../assets/img/my_profile.svg" />
        <img v-else src="../../assets/img/other_profile.svg" />
        <div class="info">
          <p>{{ comment.nickName }}</p>
          <p class="light" style="font-size: 1rem">{{ comment.memberId }}</p>
        </div>
      </div>
      <p>{{ comment.comment }}</p>
    </div>
    <div v-if="comment.memberId === loginedMember.id" class="text-buttons">
      <p>수정</p>
      <p>삭제</p>
    </div>
  </div>
</template>

<style scoped>
.comment {
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20%;
}

.info p {
  margin: 0;
}

.text-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: end;
}
</style>
