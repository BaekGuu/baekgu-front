<script setup>
import router from "@/router";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const isOpen = ref(true);
</script>

<template>
  <main class="page">
    <div class="bg-assistant">
      <div class="inner baekgu-info">
        <div>
          <p class="extrabold" style="font-size: 2rem">“백구”는요,</p>
          <p>장애인, 고령자, 임산부, 영유아 가족 등을 포함한 ‘모든 관광객’이</p>
          <p>
            이동의 불편 및 관광 활동의 제약 없이 이용할 수 있는 여행을 떠날 수 있도록 도와주는
            사이트입니다.
          </p>
          <p>우리네 토종 강아지 진돗개 백구와 함께 아무런 걱정 없이 여행을 떠나보세요!</p>
        </div>
        <img src="../assets/img/baekgu_bark.svg" alt="백구이미지" class="baekgu-bark" />
      </div>
    </div>

    <div class="inner">
      <div style="display: flex; justify-content: space-between">
        <h1>백구와 함께 무장애 여행 떠나는 법🧳</h1>
        <ChevronDoubleUpIcon
          v-if="isOpen"
          style="width: 35px"
          :class="'pointer ' + isOpen && 'point'"
          @click="() => (isOpen = false)"
        />
        <ChevronDoubleDownIcon
          v-else
          style="width: 35px"
          class="pointer"
          @click="() => (isOpen = true)"
        />
      </div>

      <div v-show="isOpen" class="intro">
        <h3>첫 번째, <span class="primary">"여행지 검색"</span> 메뉴로 들어갑니다.</h3>
        <span>상단 메뉴바의 두 번째에 위치해 있어요!</span>

        <h3>두 번째, 가고 싶은 여행지 키워드와 지역을 선택합니다.</h3>
        <span>키워드 예시: 카페, 식당, 호텔, 등..</span>
        <div>
          <img src="../assets/img/intro/2.png" alt="백구소개이미지" />
        </div>

        <h2>우리 백구에서는 아래와 같은 무장애 정보를 제공하고 있어요 :)</h2>
        <div>
          <img src="../assets/img/intro/3.png" alt="백구소개이미지" />
        </div>

        <h3>세 번째, 입력한 키워드와 지역에 따른 검색 결과를 확인 합니다.</h3>
        <span
          >여행지 검색 결과의 하단에 있는 아이콘들을 확인해 주세요. 그 장소에서 지원하고 있는 무장애
          정보 입니다!</span
        >
        <div>
          <img src="../assets/img/intro/4.png" alt="백구소개이미지" />
        </div>

        <h3>네 번째, 각 장소의 상세 정보를 확인해 보세요.</h3>
        <span
          >메뉴를 클릭하면 각 메뉴에 따른 위치로 이동합니다 :) <br />그리고 화면을 스크롤 하면
          자동으로 메뉴도 바뀌어요! 신기하죠?!😆
        </span>
        <div>
          <img src="../assets/img/intro/5.png" alt="백구소개이미지" />
        </div>

        <h3>다섯 번째, 해당 장소를 내 여행 계획에 추가해 보세요.</h3>
        <span>
          <span class="point">"내 계획에 추가하기"</span>를 누르면 내가 생성한 여행 계획 폴더들을 볼
          수 있어요.
        </span>
        <div>
          <img src="../assets/img/intro/7.png" alt="백구소개이미지" />
        </div>

        <h3>
          여섯 번째,상단 메뉴바의 <span class="primary">"나의 여행"</span>에 들어가면 내가 생성한
          여행 계획 폴더들을 볼 수 있어요!
        </h3>
        <span>"+" 카드를 눌러서 여행 계획을 추가 할 수도 있다구요~!</span>
        <div>
          <img src="../assets/img/intro/8.png" alt="백구소개이미지" />
        </div>

        <h3>일곱 번째, 내가 추가한 여행지들을 확인해 보세요.</h3>
        <span>💡드래그 앤 드롭으로 여행 순서를 변경할 수 있어요!</span>
        <div>
          <img src="../assets/img/intro/10.png" alt="백구소개이미지" />
        </div>

        <h3>마지막, 여행 날짜별로 경로를 확인해 보세요!</h3>
        <div>
          <img src="../assets/img/intro/11.png" alt="백구소개이미지" />
        </div>
        <h1 class="point">자,</h1>
      </div>
    </div>

    <div class="inner">
      <div class="start">
        <img src="../assets/img/korea.png" />
        <div>
          <p class="point">백구와 함께 여행을 떠날 준비 됐나요?!</p>
          <h2 class="pointer" @click="router.push('/search')">
            전국 팔도의 무장애 여행지 검색하러 가기
          </h2>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.baekgu-info {
  padding: 3rem 0;
  display: flex;
  justify-content: space-between;
}

.baekgu-bark {
  position: relative;
  bottom: -3rem;
}

.intro h3 {
  margin-bottom: 0px;
}

.intro div {
  width: 100%;
  display: flex;
  justify-content: start;
}

.intro img {
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}

.start {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 3rem;
  margin-bottom: 10rem;
}

.start img {
  width: 45%;
}

.start h2 {
  margin: 0;
}

.start h2:hover {
  text-decoration: underline;
}
</style>
