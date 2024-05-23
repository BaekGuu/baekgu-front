<script setup></script>

<template>
  <footer class="bg-gray white">
    <div class="info">
      <div class="policy"><a>개인정보처리방침</a><a>이용약관</a><a>저작권정책</a></div>
      <div class="addr">
        <p>
          우&#41;34153 대전광역시 유성구 동서대로 98-39, (덕명동, 삼성화재유성연수원)
          <span style="margin-left: 1.5rem"> TEL: 042-820-7385 </span>
        </p>
        <p>
          홈페이지관리: (주)백구
          <span style="margin-left: 1.5rem">문의:구재승@gmail.com </span>
        </p>
      </div>
    </div>
    <div class="contact">
      <a href="https://github.com/BaekGuu/teamspace" style="margin-right: 1.5rem">GitHub</a
      ><span>&#169;SSAFY</span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
}

p {
  font-size: 1rem;
}

.info,
.contact {
  margin: 2rem;
}

.policy {
  margin-bottom: 2rem;
}

.policy a {
  padding-right: 1rem;
  cursor: pointer;
}

a {
  color: #fff;
}
</style>
