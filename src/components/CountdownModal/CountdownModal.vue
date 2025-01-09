<!--倒计时弹框组件-->
<template>
  <div v-if="isShow" class="modal-mask">
    <div class="modal">
      <div class="modal-header">{{ title }}</div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <!--left-->
        <button
            v-if="showCancel"
            class="cancel-btn"
            @click="onCancel"
        >
          {{ cancelText }}
        </button>

        <!--right-->
        <button
            :class="['confirm-btn', { 'centered-btn': !showCancel }]"
            @click="onConfirm"
            :disabled="isDisabled"
        >
          {{ isDisabled ? `${confirmText} (${localCountDown}s)` : confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountdownModal",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "",
    },

    confirmText: {
      type: String,
      default: "",
    },
    cancelText: {
      type: String,
      default: "",
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
    //倒计时秒数
    countDown: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isDisabled: false, //禁止点击
      localCountDown: this.countDown,
      interval: null,
    };
  },
  watch: {
    isShow(newVal) {
      if (newVal) {
        this.startCountDown();
      }
    },
  },
  methods: {
    onConfirm() {
      if (!this.isDisabled) {
        this.$emit("confirm");
      }
    },
    onCancel() {
      this.$emit("canceled");
    },

    startCountDown() {
      if (this.localCountDown > 0) {
        this.isDisabled = true;
      }

      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.localCountDown--;
        if (this.localCountDown === 0) {
          clearInterval(this.interval);
          this.isDisabled = false;
          this.localCountDown = this.countDown;//重置时间
        }
      }, 1000);
    },
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  width: 80%;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
}

.modal-header {
  text-align: center;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
  margin-top: 30px;
  height: 25px;
  line-height: 25px;
}

.modal-content {
  padding: 15px;
  font-size: 14px;
  color: #333333;
  line-height: 28px;
}


.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
}


.cancel-btn {
  border-radius: 6px;
  border: none;
  margin-left: 20px;
  padding: 0;
  height: 48px;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  flex: 1;
  color: #EF3E4A;
  background-color: rgba(227, 59, 59, 0.1);
}


.confirm-btn {
  border-radius: 6px;
  border: none;
  flex: 1;
  margin-left: 15px;
  margin-right: 20px;
  height: 48px;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  color: #FFF !important;
  background-image: linear-gradient(138deg, #ED3F4C 0%, #FE7071 100%);
  transition: all 0.3s ease; /* 平滑过渡 */
}


.confirm-btn[disabled] {
  background-color: #b0b0b0;
  background-image: none;
  color: #000 !important;
  opacity: 0.6; /* 透明度降低 */
  cursor: not-allowed;
}

.centered-btn {
  flex: 0.4;
  margin-left: auto;
  margin-right: auto;
}
</style>