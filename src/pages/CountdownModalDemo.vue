<template>
  <img class="background" src="../assets/mobile-bank.png" alt="">
  <CountdownModal
      :isShow="isShow"
      :title="title"
      :cancelText="cancel"
      :showCancel="showCancel"
      :confirmText="confirm"
      :countDown="countDown"
      @confirm="onConfirm"
      @canceled="onCancel"
  >
    <div class="modal-text">
      <div v-if="showCancel">
        &nbsp;&nbsp;&nbsp;&nbsp;您当前有未领取的手机银行积分，选择确认后，积分将自动添加到您的账户余额中。
        请确认您是否希望继续领取积分，若取消，则积分不会被领取。
      </div>
      <div v-else>
        &nbsp;&nbsp;&nbsp;&nbsp;您已获得手机银行积分，点击‘已知晓’后，积分将自动到账。请注意，积分有效期有限，请尽快使用。
      </div>
    </div>
  </CountdownModal>
</template>

<script>
import CountdownModal from "@/components/CountdownModal/CountdownModal.vue";

export default {
  name: "CountdownModalDemo",
  components: {CountdownModal},
  data() {
    return {
      isShow: false,
      title: "积分领取",
      confirm: "继续",
      cancel: "取消",
      showCancel: true,
      countDown: 3
    }
  },
  mounted() {
    if (this.$route.query.showCancel === "false") {
      this.showCancel = false
      this.confirm = "已知晓"
    }
    this.isShow = true
  },
  methods: {
    onConfirm() {
      this.isShow = false;
    },
    onCancel() {
      this.isShow = false;
      this.$router.back(); //回退上一级页面
    }
  }
}
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-text {
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 16px;
  text-align: left;
}

</style>