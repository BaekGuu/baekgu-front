import {
  checkDuplicateId,
  checkDuplicateNickName,
  editUserInfo,
  login,
  signup,
} from "@/api/member";
import { OK } from "@/constant/status";
import router from "@/router";
import { notify } from "@kyvg/vue3-notification";
import { defineStore } from "pinia";
import { setCookie } from "@/util/cookies";

export const useMemberStore = defineStore("member", {
  state: () => ({
    member: {
      id: "",
      nickName: "",
      password: "",
      email: "",
    },
    checkPassword: "",
  }),
  actions: {
    async handleClickCheckId() {
      if (!this.member.id) {
        notify({ type: "warn", text: "아이디를 입력해 주세요!" });
        return false;
      }

      const { data } = await checkDuplicateId(this.member.id);
      if (data === 0) return true;
      else {
        notify({ type: "warn", text: "이미 사용 중인 아이디 입니다!" });
        return false;
      }
    },
    async handleClickCheckNickName() {
      if (!this.member.nickName) {
        notify({ type: "warn", text: "닉네임을 입력해 주세요!" });
        return false;
      }

      const { data } = await checkDuplicateNickName(this.member.nickName);
      if (data === 0) return true;
      else {
        notify({ type: "warn", text: "이미 사용 중인 닉네임 입니다!" });
        return false;
      }
    },
    async handleSignup(isValid) {
      if (isValid) {
        const { status } = await signup(this.member);
        if (status === OK) {
          notify({ type: "success", text: "회원 가입 성공!!" });
          return new Promise(resolve => {
            setTimeout(() => {
              router.go(0);
              resolve();
            }, 2000);
          });
        } else notify({ type: "error", text: "회원 가입 실패 ㅠㅠ" });
      } else {
        notify({ type: "warn", text: "모든 항목을 작성해 주세요!" });
      }
    },
    async handleLogin() {
      const { status, data } = await login({
        id: this.member.id,
        password: this.member.password,
      });
      if (status === OK) {
        notify({ type: "success", text: "로그인 성공!" });
        setCookie("username", data.nickName);
        setCookie("userId", data.id);
        return new Promise(resolve => {
          setTimeout(() => {
            router.go(0);
            resolve();
          }, 2000);
        });
      } else {
        notify({ type: "error", text: "로그인 실패 ㅠㅠ" });
      }
    },
    async handleUpdateProfile(isValid) {
      if (isValid) {
        const { status } = await editUserInfo(this.member);

        if (status === OK) {
          notify({ type: "success", text: "회원 정보가 수정 되었습니다!" });
          setCookie("username", this.member.nickName);
          return new Promise(resolve => {
            setTimeout(() => {
              router.go(0);
              resolve();
            }, 2000);
          });
        }
      } else notify({ type: "warn", text: "모든 항목을 작성해 주세요!" });
    },
  },
});
